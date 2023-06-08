import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Home = () => {
    const { loggedInUser } = useContext(AuthContext)

    return (
        <>
            <div>Home</div>
            {loggedInUser}
            <Link to='/tasks'>Tasks</Link>
            <Link to='/login'>Login</Link>
        </>
    )
}

export default Home
