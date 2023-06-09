import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { loggedInUser, loginUser } = useContext(AuthContext)

    const handleLogin = () => {
        if (username === 'user' && password === 'pass') {
            loginUser(username)
        }
    }

    if (loggedInUser === 'user') {
        return <Navigate to='/' />
    }

    return (
        <div>
            <div>
                <h1>Login</h1>
                <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
                {loggedInUser}

                <Link to='/tasks'>Tasks</Link>
                <Link to='/'>Home</Link>
            </div>
        </div>
    )
}

export default LoginPage
