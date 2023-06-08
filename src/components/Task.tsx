import {} from 'react'
import Tasks from './Tasks'

interface ITask {
    id: number
    description: string
    subTasks: ITask[]
}

const Task = ({ task, openModal }: { task: ITask, openModal: (parentId: number | null) => void }) => {
    return (
        <div>
            {`-> ${task.id} | ${task.description}`} <button onClick={() => openModal(task.id)}>Add sub task</button>
            <div style={{ paddingLeft: '1rem' }}>
                <Tasks tasks={task.subTasks} openModal={openModal} />
            </div>
        </div>
    )
}

export default Task
