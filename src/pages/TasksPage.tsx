import { useState } from 'react'

import Tasks from '../components/Tasks'
import Navbar from '../components/Navbar'

interface ITask {
    id: number
    description: string
    subTasks: ITask[]
    completed: boolean
}

const TasksPage = () => {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [taskDescription, setTaskDescription] = useState<string>('')
    const [parentTaskId, setParentTaskId] = useState<number | null>(null)
    const [editTaskId, setEditTaskId] = useState<number | null>(null)
    const [isModalUpdate, setIsModalUpdate] = useState<boolean>(false)

    const openModal = (parentId: number | null) => {
        setTaskDescription('')
        setParentTaskId(parentId)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setTaskDescription('')
        setParentTaskId(null)
        setIsModalOpen(false)
        setIsModalUpdate(false)
    }

    const createTask = () => {
        if (taskDescription === '') return

        const newTask: ITask = {
            id: Math.floor(100000 + Math.random() * 900000),
            description: taskDescription,
            subTasks: [],
            completed: false
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

    const toggleTaskStatus = (id: number) => {
        const tasksCopy = JSON.parse(JSON.stringify(tasks))

        const taskFound = findTask(tasksCopy, id)

        if (taskFound) {
            taskFound.completed = !taskFound.completed
        }

        const newTasksArray = JSON.parse(JSON.stringify([...tasksCopy]))
        setTasks(newTasksArray)
    }

    const editTaskModal = (id: number) => {
        const taskFound = findTask(tasks, id)

        if (!taskFound) return

        setTaskDescription(taskFound.description)
        setEditTaskId(id)
        setIsModalOpen(true)
        setIsModalUpdate(true)
    }

    const updateTask = () => {
        if (taskDescription === '') return

        const tasksCopy = JSON.parse(JSON.stringify(tasks))

        const taskFound = findTask(tasksCopy, editTaskId)

        if (!taskFound) return

        taskFound.description = taskDescription

        const newTasksArray = JSON.parse(JSON.stringify([...tasksCopy]))
        setTasks(newTasksArray)
        setEditTaskId(null)
        setIsModalOpen(false)
        setIsModalUpdate(false)
        setTaskDescription('')
    }

    const deleteTask = (id: number) => {
        const tasksCopy = JSON.parse(JSON.stringify(tasks))

        const { task, parent } = findParentTask(tasksCopy, id)

        if (task) {
            if (parent) {
                const newSubtasks = parent.subTasks.filter(t => t.id !== task.id)
                parent.subTasks = newSubtasks
                const newTasksArray = JSON.parse(JSON.stringify([...tasksCopy]))
                setTasks(newTasksArray)
            } else {
                const newTasks = tasks.filter(t => t.id !== task.id)
                const newTasksArray = JSON.parse(JSON.stringify([...newTasks]))
                setTasks(newTasksArray)
            }
        }
    }

    const findTask = (tasksArray: ITask[], id: number | null): ITask | null  => {
        if (!id) return null

        if (tasksArray.length === 0) return null

        for (const task of tasksArray) {
            if (task.id === id) return task

            const subTask: ITask | null = findTask(task.subTasks, id)

            if (subTask !== null) return subTask
        }

        return null
    }

    function findParentTask(tasks: ITask[], id: number): { task: ITask | undefined, parent: ITask | undefined } {
        for (const task of tasks) {
            if (task.id === id) {
                return { task: task, parent: undefined }
            }
        
            const { task: foundTask, parent } = findParentTask(task.subTasks, id)
            if (foundTask) {
                return { task: foundTask, parent: parent || task }
            }
        }
      
        return { task: undefined, parent: undefined }
    }

    return (
        <>
            <Navbar showTasks={false} />

            <div className='min-h-screen flex justify-center relative'>
                <div className=' w-4/5 mt-14'>
                    <div className=' flex h-14 justify-between items-center py-10'>
                        <div className=' flex justify-center items-center text-xl text-orange-500'>All Tasks</div>
                        <div>
                            <button className='bg-orange-700 px-8 py-3 rounded-lg' onClick={() => openModal(null)}>Create Task</button>
                        </div>
                    </div>

                    <div className=' '>
                        <Tasks tasks={tasks} openModal={openModal} editTaskModal={editTaskModal} deleteTask={deleteTask} toggleTaskStatus={toggleTaskStatus} />
                    </div>
                </div>

                {isModalOpen ?
                    <div className='absolute w-screen h-screen flex justify-center items-center bg-gray-800/80 z-10'>
                        <div className=' w-[40rem] h-[15rem] p-10 flex justify-between items-center gap-3 bg-slate-800 border-orange-800 border-2 rounded-xl relative'>
                            <input className='bg-gray-900 text-white h-12 grow border-2 border-gray-500 px-3 focus:outline-orange-600 rounded-md'
                                type="text" placeholder='task description' id='task' value={taskDescription} onChange={e => setTaskDescription(e.target.value)}
                            />
                            {isModalUpdate ?
                                <button className=' w-[5rem] bg-orange-500 h-12 rounded-md font-bold' onClick={updateTask}>Update</button>
                                : <button className=' w-[5rem] bg-orange-500 h-12 rounded-md font-bold' onClick={createTask}>Add</button>
                            }
                            <button className=' absolute right-4 top-4 text-lg font-bold text-orange-500 h-9 w-9 flex justify-center items-center rounded-full bg-orange-300/30' onClick={closeModal}>×</button>
                        </div>
                    </div>
                    : <></>
                }
            </div>
        </>
    )
}

export default TasksPage
