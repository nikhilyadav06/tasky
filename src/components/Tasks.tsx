import {} from 'react'

import Task from './Task'

interface ITask {
    id: number
    description: string
    subTasks: ITask[]
    completed: boolean
}

const Tasks = ({ tasks, openModal, toggleTaskStatus, editTaskModal, deleteTask }: { tasks: ITask[], openModal: (parentId: number | null) => void, toggleTaskStatus: (id: number) => void, editTaskModal: (id: number) => void, deleteTask: (id:number) => void }) => {
    return (
        <div className='w-full'>
            {tasks.map(task => (
                <Task task={task} openModal={openModal} toggleTaskStatus={toggleTaskStatus} editTaskModal={editTaskModal} deleteTask={deleteTask} key={`${task.id} ${task.description} ${task.completed}`} />
            ))}
        </div>
    )
}

export default Tasks
