import { ReactNode, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

interface AuthContextProviderProps {
    children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [loggedInUser, setLoggedInUser] = useState('')

    const value = {
        loggedInUser,
        setLoggedInUser,
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider
