import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import { allUsers } from '../data/users'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string>('')

    const { loggedInUser, loginUser } = useContext(AuthContext)

    const handleLogin = () => {
        const matchedUser = allUsers.find((user) => user.username === username && user.password === password)

        if (matchedUser) {
            loginUser(matchedUser.username)
            setUsername('')
            setPassword('')
            setError('')
        } else {
            setError('Invalid Credentials')
        }
    }

    if (loggedInUser !== '') {
        return <Navigate to='/' />
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='flex justify-center flex-col gap-1 relative pb-20'>
                <h1 className=' text-2xl font-bold flex w-full justify-center items-center'>Welcome to&nbsp;<span className=' text-orange-500'>TASKY!</span></h1>
                <h2 className=' text-xl font-bold flex w-full justify-center items-center pb-6'>Login</h2>
                <input className='bg-gray-900 text-white h-12 w-80 grow border-2 border-gray-500 px-3 focus:outline-orange-600 rounded-md mb-4'
                    type="text" placeholder="username" value={username} onChange={e => {
                        setUsername(e.target.value)
                        setError('')
                    }}
                />
                <input className='bg-gray-900 text-white h-12 w-80 grow border-2 border-gray-500 px-3 focus:outline-orange-600 rounded-md mb-4'
                    type="password" placeholder="password" value={password} onChange={e => {
                        setPassword(e.target.value)
                        setError('')
                    }}
                />
                <button className='bg-orange-500 font-bold text-white h-12 w-80 grow rounded-md' onClick={handleLogin}>Login</button>

                <div><Link className='text-xs underline text-gray-300' to='/'>Home</Link></div>
                
                {error !== '' && <div className='w-80 absolute bottom-2 h-12 bg-red-400/10 border border-red-600 rounded-md flex justify-center items-center'>
                    {error}
                </div>}
            </div>
        </div>
    )
}

export default LoginPage
