'use client'
import { LoginInfo, LoginRes, login, register } from '@/services/auth'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  user: User | null
  token: string
  isLogin: boolean
  handleRegister: (loginInfo: LoginInfo) => Promise<void>
  handleLogin: (loginInfo: LoginInfo) => Promise<void>
  handleLogout: (user: User) => void
}

type User = {
  id?: number
  tiktokid?: string
  lineid?: string
  online?: number
  domain_id?: number
  img?: string
  api_token?: string
  tel?: string
  name?: string
  mobile?: string
  password?: string
  email?: string
}

const AuthContext = createContext<AuthContextType | null>(null)

function getLocalStorageToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || ''
  } else {
    return ''
  }
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)

  const [token, setToken] = useState(getLocalStorageToken())

  const isLogin = !!token

  useEffect(() => {
    if (!token) {
      router.push('/login')
    } else {
      // TODO: fetch user data
      setUser({
        name: '林蓋瑞',
        email: 'gary@gmail.com',
        password: 'a123456789',
        api_token: 'f14dd61a50bfbf1f640cc0041667c4746e75d829ae65ce210f0584b1c96819c2',
        id: 10000,
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

export const useAuth = () => {
  const value = useContext(AuthContext)

  if (value == null) {
    throw new Error('useAuth cannot be used outside of AuthProvider')
  }

  return value
}
