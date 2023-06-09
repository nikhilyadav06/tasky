import { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'

const Logout = () => {
    const { logoutUser } = useContext(AuthContext)

    const handleLogout = () => {
        logoutUser()
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout
