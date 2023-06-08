import {} from 'react'
import Task from './Task'

interface ITask {
    id: number
    description: string
    subTasks: ITask[]
}

const Tasks = ({ tasks, openModal }: { tasks: ITask[], openModal: (parentId: number | null) => void }) => {
    return (
        <div>
            {tasks.map(task => (
                <Task task={task} openModal={openModal} />
            ))}
        </div>
    )
}

export default Tasks
