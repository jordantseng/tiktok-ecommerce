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
import { useNavigationContext } from '@/context/NavigationContext'
import { getBaseURL } from '@/lib/utils'

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
  handleSetToken: (token: string) => void
  handleRegister: (registerInfo: RegisterInfo) => Promise<void>
  handleLoginEmail: (loginInfo: LoginInfo, isReset: boolean) => Promise<void>
  handleLoginTiktok: () => void
  handleBindTiktok: () => void
  handleGetEmailCode: (email: string) => Promise<void>
  handleForgetPassword: (email: string) => Promise<void>
  handleChangePassword: (password: string) => Promise<void>
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
  const tiktokDict = searchParams.get('dict')

  const { from, setFromPath } = useNavigationContext()

  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState(getLocalStorageToken())
  const [isLoadingUser, setIsLoadingUser] = useState(false)

  const isLogin = !!token
  const isPreparingAuthData = !user || !token

  const handleSetToken = useCallback((token: string) => {
    setToken(token)
    localStorage.setItem('token', token)
  }, [])

  const handleTiktokToken = useCallback(
    (token: string) => {
      setFromPath()
      handleSetToken(token)
      router.replace(from || '/')
    },
    [from, router, setFromPath, handleSetToken],
  )

  const handleTiktokDict = useCallback(
    (dict: string) => {
      setFromPath()
      localStorage.setItem('dict', dict)
      router.replace('/edit-email')
    },
    [router, setFromPath],
  )

  useEffect(() => {
    if (tiktokToken) {
      handleTiktokToken(tiktokToken)
    } else if (tiktokDict) {
      handleTiktokDict(tiktokDict)
    }
  }, [tiktokToken, tiktokDict, handleTiktokToken, handleTiktokDict])

  useEffect(() => {
    if (user && !user?.email && pathname !== '/edit-email') {
      router.push('/edit-email')
    }
  }, [user, router, pathname])

  const refreshUser = useCallback(async () => {
    const baseURL = getBaseURL(window.location.host)
    setIsLoadingUser(true)
    try {
      const res = await getUser(baseURL)
      setUser(res.data)
    } catch (error) {
      console.error('refreshUser error: ', error)
    } finally {
      setIsLoadingUser(false)
    }
  }, [])

  const handleLoginEmail = async ({ email, password, token }: LoginInfo, isReset: boolean) => {
    try {
      const baseURL = getBaseURL(window.location.host)
      const response = await loginEmail(baseURL, { email, password, token })
      const data = response.data
      const apiToken = data?.api_token

      if (!apiToken) {
        throw new Error(response.resultmessage)
      } else {
        handleSetToken(apiToken)
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
    const baseURL = getBaseURL(window.location.host)
    loginTiktok(baseURL, callbackURL)
  }

  const handleBindTiktok = () => {
    const callbackURL = window.location.origin + from
    const baseURL = getBaseURL(window.location.host)
    loginTiktok(baseURL, callbackURL, token)
  }

  const handleRegister = async ({ email, password, code }: RegisterInfo) => {
    try {
      const baseURL = getBaseURL(window.location.host)
      const response = await register(baseURL, { email, password, code })
      const data = response.data
      const apiToken = data?.api_token

      if (!apiToken) {
        throw new Error(response.resultmessage)
      } else {
        handleSetToken(apiToken)
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
      const baseURL = getBaseURL(window.location.host)
      const response = await getEmailCode(baseURL, email)
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
    const baseURL = getBaseURL(window.location.host)

    try {
      const { resultcode, resultmessage } = await forgetPassword(baseURL, email)

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

  const handleChangePassword = async (password: string) => {
    const baseURL = getBaseURL(window.location.host)

    try {
      const { resultcode, resultmessage } = await changePassword(baseURL, password)

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
        handleSetToken,
        handleRegister,
        handleLoginEmail,
        handleLoginTiktok,
        handleBindTiktok,
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
