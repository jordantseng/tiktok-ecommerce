'use client'

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'

import { LoginInfo, User, getUser, login, register } from '@/services/auth'

function getLocalStorageToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || ''
  } else {
    return ''
  }
}

type AuthContextType = {
  user: User | null
  token: string
  isLogin: boolean
  isLoadingUser: boolean
  handleRegister: (loginInfo: LoginInfo) => Promise<void>
  handleLogin: (loginInfo: LoginInfo) => Promise<void>
  handleLogout: () => void
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)

  const [token, setToken] = useState(getLocalStorageToken())

  const [isLoadingUser, setIsLoadingUser] = useState(false)

  const isLogin = !!token

  const refreshUser = useCallback(async () => {
    setIsLoadingUser(true)
    try {
      const res = await getUser()
      setUser(res.data)
    } catch (error) {
      console.error('refreshUser error: ', error)
    } finally {
      setIsLoadingUser(false)
    }
  }, [])

  const handleLogin = async ({ email, password }: LoginInfo) => {
    try {
      const response = await login({ email, password })
      const data = response.data
      const apiToken = data?.api_token

      if (!apiToken) {
        throw new Error(response.resultmessage)
      } else {
        setToken(apiToken)
        localStorage.setItem('token', apiToken)
        router.push('/')
      }
    } catch (error) {
      console.error('handleLogin error: ', error)
      throw error
    }
  }

  const handleRegister = async ({ email, password }: LoginInfo) => {
    try {
      const response = await register({ email, password })
      const data = response.data
      const apiToken = data?.api_token

      if (!apiToken) {
        throw new Error(response.resultmessage)
      } else {
        setToken(apiToken)
        localStorage.setItem('token', apiToken)
        router.push('/')
      }
    } catch (error) {
      console.error('handleRegister error: ', error)
      throw error
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLogin,
        isLoadingUser,
        refreshUser,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const value = useContext(AuthContext)

  if (value == null) {
    throw new Error('useAuthContext cannot be used outside of AuthProvider')
  }

  return value
}
