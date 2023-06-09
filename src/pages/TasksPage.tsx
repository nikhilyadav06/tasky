import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import Tasks from '../components/Tasks'

interface ITask {
    id: number
    description: string
    subTasks: ITask[]
}

const TasksPage = () => {
    const { loggedInUser } = useContext(AuthContext)

    const [tasks, setTasks] = useState<ITask[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [taskDescription, setTaskDescription] = useState<string>('')
    const [parentTaskId, setParentTaskId] = useState<number | null>(null)

    const openModal = (parentId: number | null) => {
        setTaskDescription('')
        setParentTaskId(parentId)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setTaskDescription('')
        setParentTaskId(null)
        setIsModalOpen(false)
    }

    const createTask = () => {
        if (taskDescription === '') return

        const newTask: ITask = {
            id: Math.floor(100000 + Math.random() * 900000),
            description: taskDescription,
            subTasks: []
        }

        if (parentTaskId === null) {
            const newTasksArray = JSON.parse(JSON.stringify([...tasks, newTask]))
            setTasks(newTasksArray)
        } else {
            const tasksCopy = JSON.parse(JSON.stringify(tasks))
            const taskFound: ITask | null = findTask(tasksCopy, parentTaskId)

            if (taskFound !== null) {
                taskFound.subTasks.push(newTask)
                
                const newTasksArray = JSON.parse(JSON.stringify([...tasksCopy]))
                setTasks(newTasksArray)
            }
        }

        setIsModalOpen(false)
        setTaskDescription('')
        setParentTaskId(null)
    }

    const findTask = (tasksArray: ITask[], id: number): ITask | null  => {
        if (tasksArray.length === 0) return null

        for (const task of tasksArray) {
            if (task.id === id) return task

            const subTask: ITask | null = findTask(task.subTasks, id)

            if (subTask !== null) return subTask
        }

        return null
    }

    return (
        <>
            <div>Tasks</div>
            {loggedInUser}
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <div>
                <button onClick={() => openModal(null)}>Create Task</button>
            </div>
            <div>
                {isModalOpen ? 
                    <div>
                        <input type="text" placeholder='task description' onChange={e => setTaskDescription(e.target.value)} />
                        <button onClick={createTask}>Add</button>
                        <button onClick={closeModal}>Close</button>
                    </div>
                    : <></>
                }
            </div>

            <div>
                <h2>Tasks</h2>
                <Tasks tasks={tasks} openModal={openModal} />
            </div>
        </>
    )
}

export default TasksPage
