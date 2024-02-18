'use client'

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

import { LoginInfo, User, getUser, login, register } from '@/services/auth'
import { useRouter } from 'next/navigation'

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
  handleRegister: (loginInfo: LoginInfo) => Promise<void>
  handleLogin: (loginInfo: LoginInfo) => Promise<void>
  handleLogout: (user: User) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)

  const [token, setToken] = useState(getLocalStorageToken())

  const isLogin = !!token

  useEffect(() => {
    if (!token) {
      router.push('/login')
    } else {
      getUser()
        .then((res) => setUser(res.data))
        .catch((error) => {
          console.error('getUser error: ', error)
        })
    }
  }, [token, router])

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
