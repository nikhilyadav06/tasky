import { ReactNode, useEffect, useState } from 'react'
import * as jose from 'jose'

import { AuthContext } from '../context/AuthContext'

interface AuthContextProviderProps {
    children: ReactNode
}

interface CustomPayload extends jose.JWTPayload {
    username?: string
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [loggedInUser, setLoggedInUser] = useState<string>('')

    useEffect(() => {
        const af = async (token: string) => {
            const secret = new TextEncoder().encode(
                process.env.SECRET_KEY,
            )

            const { payload }: { payload: CustomPayload } = await jose.jwtVerify(token, secret)

            const userFromToken: string | undefined = payload.username

            if (userFromToken) {
                setLoggedInUser(userFromToken)
            } else {
                throw new Error('username not valid')
            }
        }
        const token = localStorage.getItem('token')

        if (token) {
            try {
                af(token)
            } catch (error) {
                localStorage.removeItem('token')
            }
        }
    }, [])

    const logoutUser = () => {
        localStorage.removeItem('token')
        setLoggedInUser('')
    }

    const loginUser = (username: string) => {
        const af = async () => {
            const secret = new TextEncoder().encode(
                process.env.SECRET_KEY,
            )
            
            const token = await new jose.SignJWT({ username })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('1h')
                .sign(secret)

            localStorage.setItem('token', token)
        }
        af()

        setLoggedInUser(username)
    }

    const value = {
        loggedInUser,
        setLoggedInUser,
        loginUser,
        logoutUser
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider
