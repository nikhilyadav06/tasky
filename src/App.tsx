import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import TasksPage from './pages/TasksPage'
import AuthContextProvider from './context/AuthContextProvider'
import PrivateRoute from './components/PrivateRoute'

function App() {
    return (
        <>
            <div className=' min-h-screen'>
                <Router>
                    <AuthContextProvider>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/login' element={<LoginPage />} />
                            <Route element={<PrivateRoute />}>
                                <Route path='/tasks' element={<TasksPage />} />
                            </Route>
                        </Routes>
                    </AuthContextProvider>
                </Router>
            </div>
        </>
    )
}

export default App
