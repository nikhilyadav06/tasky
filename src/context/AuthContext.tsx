import { Dispatch, SetStateAction, createContext } from 'react'

interface AuthContextProps {
    loggedInUser: string
    setLoggedInUser: Dispatch<SetStateAction<string>>
    loginUser: (username: string) => void
    logoutUser: () => void
}

export const AuthContext = createContext<AuthContextProps>({
    loggedInUser: '',
    setLoggedInUser: () => {},
    loginUser: () => {},
    logoutUser: () => {}
})
