import { useContext } from 'react'
import { UsersContext } from '../contexts/UserContext'

const useAuth = () => useContext(UsersContext)

export default useAuth
