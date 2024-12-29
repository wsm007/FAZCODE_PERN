import { createContext, useState, useContext, useEffect } from "react";
import Cookie from 'js-cookie';
import axios from '../api/axios';

// Creamos el contexto
const AuthContext = createContext();

// Hook personalizado
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Componente Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);

  const signin = async (data) => {
    try {
      const res = await axios.post('/signin', data);
      setUser(res.data);
      setIsAuth(true);
      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data.error)) {
        return setErrors(error.response.data.error);
      }
      setErrors([error.response.data.message]);
    }
  };

  const signup = async (data) => {
    try {
      const res = await axios.post('/signup', data);
      setUser(res.data);
      setIsAuth(true);
      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data.error)) {
        return setErrors(error.response.data.error);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {

    if (Cookie.get('token')) {
      axios
        .get('/profile')
        .then(res => {
          console.log(res.data);
          setUser(res.data);
          setIsAuth(true);
        })
        .catch(err => {
          console.log(err);
          setUser(null);
          setIsAuth(false);
        })

    }

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        signup,
        signin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


// Exportamos todo al final
export { AuthProvider, useAuth, AuthContext };