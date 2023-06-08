import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

interface Task {
    id: number
    description: string
    subTasks: Task[]
}

const Tasks = () => {
    const { loggedInUser } = useContext(AuthContext)

    const [tasks, setTasks] = useState<Task[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [taskDescription, setTaskDescription] = useState<string>('')
    const [parentTaskId, setParentTaskId] = useState<number | null>(null)

    const openModal = (parentId: number | null) => {
        setTaskDescription('')
        setParentTaskId(parentId)
        setIsModalOpen(true)
    }

    const createTask = () => {
        if (taskDescription === '') return

        const newTask: Task = {
            id: Math.floor(100000 + Math.random() * 900000),
            description: taskDescription,
            subTasks: []
        }

        const newTasksArray = JSON.parse(JSON.stringify([...tasks, newTask]))

        setTasks(newTasksArray)

        setIsModalOpen(false)
        setTaskDescription('')
        setParentTaskId(null)
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
                    </div>
                    : <></>
                }
            </div>

            <div>
                {tasks.map(task => (
                    <div>{task.description}</div>
                ))}
            </div>
        </>
    )
}

export default Tasks
