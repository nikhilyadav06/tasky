import {} from 'react'
import { DeleteForever, Edit, Add } from '@mui/icons-material'
import Tasks from './Tasks'

interface ITask {
    id: number
    description: string
    subTasks: ITask[]
    completed: boolean
}

const Task = ({ task, openModal, toggleTaskStatus, editTaskModal, deleteTask }: { task: ITask, openModal: (parentId: number | null) => void, toggleTaskStatus: (id: number) => void, editTaskModal: (id: number) => void, deleteTask: (id:number) => void }) => {
    return (
        <div className='w-full border-l-4 border-orange-700 mt-3 bg-orange-200 bg-opacity-10 pb-2'>
            <div className='flex justify-between px-3 pt-2 gap-2'>
                <input className='w-4 h-4 mt-2 accent-orange-500'
                    type="checkbox" checked={task.completed}
                    onChange={() => toggleTaskStatus(task.id)}
                />
                <p className={`grow font-semibold flex flex-wrap items-center pl-2 ${task.completed && 'line-through text-gray-500'}`}>{task.description}</p>
                
                <button className=' bg-orange-700 text-lg font-semibold w-8 h-8 min-h-[2rem] min-w-[2rem] flex justify-center items-center' onClick={() => openModal(task.id)}><Add sx={{fontSize: 20}} /></button>
                <button className=' bg-orange-700 text-lg font-semibold w-8 h-8 min-h-[2rem] min-w-[2rem] flex justify-center items-center' onClick={() => editTaskModal(task.id)}><Edit sx={{fontSize: 20}} /></button>
                <button className=' bg-orange-700 text-lg font-semibold w-8 h-8 min-h-[2rem] min-w-[2rem] flex justify-center items-center' onClick={() => deleteTask(task.id)}><DeleteForever sx={{fontSize: 20}} /></button>
            </div>
            <div style={{ paddingLeft: '1rem' }}>
                <Tasks tasks={task.subTasks} openModal={openModal} toggleTaskStatus={toggleTaskStatus} editTaskModal={editTaskModal} deleteTask={deleteTask} />
            </div>
        </div>
    )
}

export default Task
