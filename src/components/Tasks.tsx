import {} from 'react'

import Task from './Task'

interface ITask {
    id: number
    description: string
    subTasks: ITask[]
    completed: boolean
}

const Tasks = ({ tasks, openModal, toggleTaskStatus }: { tasks: ITask[], openModal: (parentId: number | null) => void, toggleTaskStatus: (id: number) => void }) => {
    return (
        <div className='w-full'>
            {tasks.map(task => (
                <Task task={task} openModal={openModal} toggleTaskStatus={toggleTaskStatus} />
            ))}
        </div>
    )
}

export default Tasks
