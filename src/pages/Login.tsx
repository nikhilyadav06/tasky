import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { loggedInUser, setLoggedInUser } = useContext(AuthContext)

    const handleLogin = () => {
        if (username === 'user' && password === 'pass') {
            setLoggedInUser('user')
        }
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

export default Login
