import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import AuthContextProvider from './context/AuthContextProvider'
import PrivateRoute from './components/PrivateRoute'

function App() {
    return (
        <>
            <Router>
                <AuthContextProvider>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route element={<PrivateRoute />}>
                            <Route path='/tasks' element={<Tasks />} />
                        </Route>
                    </Routes>
                </AuthContextProvider>
            </Router>
        </>
    )
}

export default App
