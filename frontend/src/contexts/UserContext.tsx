import { createContext, ReactNode, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../services/connection/api';

export interface IUser {
  id?: string
  username: string
  password: string
  token?: string
  accountId?: string
}

export interface IError {
  msg?: string
  active: boolean
}

interface UserContextType {
  loading: boolean
  user: IUser
  error: IError
  login: (user: IUser) => Promise<void>
  logout: () => Promise<void>
  registerUser: (user: IUser) => Promise<void>
  setErrorForm: (msg: string) => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode
}

export const UsersContext = createContext({} as UserContextType)

function updatingCookie(logged: boolean, user?: IUser) {
  if (logged && user?.token && user?.id && user?.accountId) {
    Cookies.set('challenge-ng-cod3r-auth', user.username, { expires: 1 });
    Cookies.set('token', user.token, { expires: 1 });
    Cookies.set('id', user.id, { expires: 1 });
    Cookies.set('accountId', user.accountId, { expires: 1 });
  } else {
    Cookies.remove('challenge-ng-cod3r-auth') 
    Cookies.remove('token')
    Cookies.remove('id')
    Cookies.remove('accountId')
  }
}

export function UserProvider({ children }: UserProviderProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<IError>({ msg: '', active: false })
  const [user, setUser] = useState<IUser>({ username: '', password: '', accountId: '' })

  async function login(user: IUser) {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // importante usar pra simular delay
    try {
      const { username, password } = user
      const authetenticateUser = await api.post(`/authenticate`, {
        username, 
        password
      })
      const userLogged = {
        id: authetenticateUser.data.user.id,
        username: user.username, 
        password: '', 
        token: authetenticateUser.data.token,
        accountId: authetenticateUser.data.user.accountId
      }
      if (userLogged?.token) {
        setUser(userLogged)
        updatingCookie(true, userLogged)
      }
    } catch (err) {
      if (err instanceof Error) setError({ msg: 'Usuário ou senha Incorretos!', active: true })
    } finally {
      setLoading(false)
    }
  }

  async function registerUser(user: IUser) {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000)) 
    const { username, password } = user
    const userExist = await api.get(`/userByUsername/${username}`);
    if(userExist?.data?.username){
      setError({ msg: 'Usuário com este nome já existe', active: true })
      return;
    }
    try {
      await api.post(`/user`, {
        username,
        password,
      })
      const authetenticateUser = await api.post(`/authenticate`, {
        username,
        password,
      })
      const userLogged = {
        id: authetenticateUser.data.user.id,
        username: user.username, 
        password: '', 
        token: authetenticateUser.data.token,
        accountId: authetenticateUser.data.user.accountId
      }
      if (userLogged?.token) {
        setUser(userLogged)
        updatingCookie(true, userLogged)
      }
    } catch (err) {
      if (err instanceof Error) setError({ msg: err.message, active: true })
    } finally {
      setLoading(false)
    }
  }

  async function setErrorForm(msg: string){
    setError({msg: msg, active: true})
  }

  async function logout() {
    setLoading(true)
    setUser({id: '', username: '', password: '', token: '' , accountId: ''})
    updatingCookie(false)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const username = Cookies.get('challenge-ng-cod3r-auth')
    if (username) { 
      setUser({
        id: Cookies.get('id'),
        username,
        password: '',
        token: Cookies.get('token'),
        accountId: Cookies.get('accountId')
      })
    } 
    setLoading(false)
  }, [])

  return (
    <UsersContext.Provider
      value={{
        loading,
        user,
        error,    
        login,
        logout,
        registerUser,
        setErrorForm,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
