import { createContext, useState, useContext } from "react";

export const AuthContext = createContext()

// Hook personalizado
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context ){
        throw new Error('useAuth mus be used within an AuthProvider')
    }
    return context
}


// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [errors, seterror] = useState(null)

    return <AuthContext.Provider value={{
        user,
        isAuth,
        errors
    }}>
        {children}
    </AuthContext.Provider>
}

// export default AuthProvider