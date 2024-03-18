'use client'

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  LoginInfo,
  RegisterInfo,
  User,
  changePassword,
  forgetPassword,
  getEmailCode,
  getUser,
  loginEmail,
  loginTiktok,
  register,
} from '@/services/auth'
import { useToast } from '@/components/ui/use-toast'
import { useNavigationContext } from './NavigationContext'

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
  isPreparingAuthData: boolean
  handleRegister: (registerInfo: RegisterInfo) => Promise<void>
  handleLoginEmail: (loginInfo: LoginInfo, isReset: boolean) => Promise<void>
  handleLoginTiktok: () => void
  handleGetEmailCode: (email: string) => Promise<void>
  handleForgetPassword: (email: string) => Promise<void>
  handleChangePassword: (email: string) => Promise<void>
  handleLogout: () => void
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tiktokToken = searchParams.get('token')

  const { from, setFromPath } = useNavigationContext()

  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState(getLocalStorageToken())
  const [isLoadingUser, setIsLoadingUser] = useState(false)

  const isLogin = !!token
  const isPreparingAuthData = !user || !token

  useEffect(() => {
    if (tiktokToken) {
      setToken(tiktokToken)
      setFromPath()
      localStorage.setItem('token', tiktokToken)
      router.replace(from || '/')
    }
  }, [tiktokToken, router, pathname, setFromPath, from])

  useEffect(() => {
    if (user && !user?.email) {
      router.push('/edit-email')
    }
  }, [user, router])

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

  const handleLoginEmail = async ({ email, password }: LoginInfo, isReset: boolean) => {
    try {
      const response = await loginEmail({ email, password })
      const data = response.data
      const apiToken = data?.api_token

      if (!apiToken) {
        throw new Error(response.resultmessage)
      } else {
        setToken(apiToken)
        localStorage.setItem('token', apiToken)
        isReset ? router.push('/reset-password') : router.push(from || '/')
      }
    } catch (error) {
      console.error('handleLoginEmail error: ', error)
      toast({
        variant: 'destructive',
        description: error instanceof Error ? `${error.message}` : `${error}`,
      })
    }
  }

  const handleLoginTiktok = () => {
    const callbackURL = window.location.origin + from
    loginTiktok(callbackURL)
  }

  const handleRegister = async ({ email, password, code }: RegisterInfo) => {
    try {
      const response = await register({ email, password, code })
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
      toast({
        variant: 'destructive',
        description: error instanceof Error ? `${error.message}` : `${error}`,
      })
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('token')
    setFromPath('/')
    router.push('/login')
  }

  const handleGetEmailCode = async (email: string) => {
    try {
      const response = await getEmailCode(email)
      toast({
        className: 'bg-cyan-500 text-white',
        description: response.resultmessage,
      })
    } catch (error) {
      console.error('handleRegister error: ', error)
      toast({
        variant: 'destructive',
        description: error instanceof Error ? `${error.message}` : `${error}`,
      })
      throw error
    }
  }

  const handleForgetPassword = async (email: string) => {
    try {
      const { resultcode, resultmessage } = await forgetPassword(email)

      if (resultcode === 0) {
        toast({
          className: 'bg-cyan-500 text-white',
          description: resultmessage,
        })
        router.push('/login?type=reset')
      } else {
        throw new Error(resultmessage)
      }
    } catch (error) {
      console.error('handleForgetPassword error: ', error)
      toast({
        variant: 'destructive',
        description: error instanceof Error ? `${error.message}` : `${error}`,
      })
    }
  }

  const handleChangePassword = async (email: string) => {
    try {
      const { resultcode, resultmessage } = await changePassword(email)

      if (resultcode === 0) {
        toast({
          className: 'bg-cyan-500 text-white',
          description: resultmessage,
        })
      } else {
        throw new Error(resultmessage)
      }
    } catch (error) {
      console.error('handleChangePassword error: ', error)
      toast({
        variant: 'destructive',
        description: error instanceof Error ? `${error.message}` : `${error}`,
      })
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLogin,
        isLoadingUser,
        isPreparingAuthData,
        refreshUser,
        handleRegister,
        handleLoginEmail,
        handleLoginTiktok,
        handleLogout,
        handleGetEmailCode,
        handleForgetPassword,
        handleChangePassword,
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
