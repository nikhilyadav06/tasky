import { Dispatch, SetStateAction, createContext } from 'react'

interface AuthContextProps {
    loggedInUser: string
    setLoggedInUser: Dispatch<SetStateAction<string>>
}

export const AuthContext = createContext<AuthContextProps>({
    loggedInUser: '',
    setLoggedInUser: () => {}
})
