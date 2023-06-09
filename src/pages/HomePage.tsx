import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import Logout from '../components/Logout'

const HomePage = () => {
    const { loggedInUser } = useContext(AuthContext)

    return (
        <>
            <div>Home</div>
            {loggedInUser}
            <Link to='/tasks'>Tasks</Link>
            <Link to='/login'>Login</Link>
            <Logout />
        </>
    )
}

export default HomePage
