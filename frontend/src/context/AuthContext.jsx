import { createContext, useState, useContext } from "react";
import axios from 'axios'

export const AuthContext = createContext()

// Hook personalizado
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth mus be used within an AuthProvider')
    }
    return context
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [errors, seterror] = useState(null)

    async function signin(data){
        const res = await axios.post('http://localhost:3000/api/signin', data, {
            withCredentials: true
        })
        console.log(res.data)
        setUser(res.data)
    }

    async function signup(data) {
        const res = await axios.post('http://localhost:3000/api/signup', data, {
            withCredentials: true
        });
        console.log(res.data);
        setUser(res.data)
    }
    

    return (
        <AuthContext.Provider value={{
            user,
            isAuth,
            errors,
            signup,
            signin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// export default AuthProvider