import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { AuthContext } from '../context/AuthContext'

const Navbar = ({ showTasks }: { showTasks: boolean }) => {
    const { loggedInUser } = useContext(AuthContext)

    return (
        <>
            <div className='flex w-full justify-center items-center h-14 bg-orange-600/90 font-semibold fixed z-20 text-white'>
                <div className='w-4/5 h-full'>
                    <nav className='w-full h-full flex justify-between items-center'>
                        <p className='h-full font-bold text-2xl   text-center justify-center items-center flex'><Link className='w-full h-full flex justify-center items-center' to='/'>TASKY</Link></p>

                        <div className='flex justify-center items-center gap-1 h-full'>
                            {loggedInUser === '' ? <div className=' px-9 hover:bg-orange-700 h-full flex justify-center items-center'><Link className='w-full h-full flex justify-center items-center' to='/login'>Login</Link></div>
                            : <>
                                {showTasks && <div className=' px-9 hover:bg-orange-700 h-full flex justify-center items-center'><Link className='w-full h-full flex justify-center items-center' to='/tasks'>Tasks</Link></div>}
                                <div className=' px-9 hover:bg-orange-700 h-full flex justify-center items-center'><Logout /></div>
                                <div className=' bg-gray-900 h-12 w-12 rounded-full text-xl flex justify-center items-center text-orange-500 m-2'>{loggedInUser.charAt(0).toUpperCase()}</div>
                            </>}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar
