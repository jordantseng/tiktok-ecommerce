'use client'

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Liff } from '@line/liff'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAuthContext } from './AuthContext'
import { bindLine, getTokenByLineIdToken, register, RegisterInfo } from '@/services/auth'
import { getBaseURL } from '@/lib/utils'
import { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useNavigationContext } from './NavigationContext'
import { useWebSettingsContext } from './WebSettingsContext'

type LineAuthContextType = {
  isLiffInit: boolean
  liffObject: Liff | undefined
  lineEmail: string
  liffError: string
  handleRegisterWithLine: (info: RegisterInfo) => void
  handleLineLogin: () => void
  handleLineLogout: () => void
}

const LingAuthContext = createContext<LineAuthContextType | null>(null)

export const LineAuthProvider = ({ children }: PropsWithChildren) => {
  const [liffObject, setLiffObject] = useState<Liff>()
  const [liffError, setLiffError] = useState('')
  const [lineEmail, setLineEmail] = useState('')

  const { webSettingsData } = useWebSettingsContext()
  const { from } = useNavigationContext()
  const { user, handleSetToken } = useAuthContext()
  const router = useRouter()
  const pathName = usePathname()
  const { toast } = useToast()

  const liffId =
    process.env.NODE_ENV === 'development'
      ? '2005664248-jXBbmKwy'
      : webSettingsData?.liffid || '2005483486-KrPb8qrj'

  const isLiffInit = !!liffObject && !liffError
  const searchParams = useSearchParams()

  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const liffClientId = searchParams.get('liffClientId')
  const liffRedirectUri = searchParams.get('liffRedirectUri')

  useEffect(() => {
    import('@line/liff')
      .then((liff) => liff.default)
      .then((liff) => {
        liff
          .init({ liffId })
          .then(() => {
            console.log('login: liff init succeeded.')
            setLiffObject(liff)
          })
          .catch((error: Error) => {
            console.log('login: liff init failed.')
            setLiffError(error.toString())
          })
      })
  }, [liffId])

  useEffect(() => {
    if (code || state || liffClientId || liffRedirectUri) {
      const lineBind = localStorage.getItem('line-bind')

      if (lineBind) {
        router.push('/profile')
      } else {
        router.push('/')
      }
    }
  }, [code, state, liffClientId, liffRedirectUri, router])

  useEffect(() => {
    if (liffObject && liffObject.isLoggedIn()) {
      const idToken = liffObject.getIDToken()
      const baseURL = getBaseURL(window.location.host)
      const lineBind = localStorage.getItem('line-bind')
      const token = localStorage.getItem('token')!
      const lineid = user?.lineid
      alert(lineid)
      if (!lineid && idToken) {
        if (!lineBind) {
          getTokenByLineIdToken(baseURL, idToken)
            .then(({ data }) => {
              handleSetToken(data.api_token)

              if (pathName === '/register') {
                router.push('/')
              }
            })
            .catch((error) => {
              if (error instanceof AxiosError) {
                const res = error.response?.data
                const data = res?.data

                if (data.email) {
                  setLineEmail(data.email)
                  router.push('/register')
                }
              }
            })
        } else {
          getTokenByLineIdToken(baseURL, idToken, token)
            .then(() => {
              router.push('/profile')
            })
            .catch((error) => {
              console.error('bindLine error: ', error)
              toast({
                variant: 'destructive',
                description: error instanceof Error ? `${error.message}` : `${error}`,
              })
            })
            .finally(() => {
              localStorage.removeItem('line-bind')
            })
        }
      }
    }
  }, [handleSetToken, toast, pathName, router, liffObject, user?.lineid])

  const handleRegisterWithLine = async ({ email, password, code }: RegisterInfo) => {
    try {
      const idToken = liffObject?.getIDToken()!
      const baseURL = getBaseURL(window.location.host)
      const response = await register(baseURL, { email, password, code, idToken })
      const data = response.data
      const apiToken = data?.api_token

      if (!apiToken) {
        throw new Error(response.resultmessage)
      } else {
        handleSetToken(apiToken)
        router.push(from || '/')
      }
    } catch (error) {
      console.error('handleRegisterWithLine error: ', error)
      toast({
        variant: 'destructive',
        description: error instanceof Error ? `${error.message}` : `${error}`,
      })
    }
  }

  const handleLineLogin = useCallback(() => {
    function redirectToMobileLineLogin() {
      // TODO: should follow this issue
      // this is workaround
      // if user open our liff app in mobile browser
      // we redirect user to mobile line liff
      // should keep follow if this way is deprecated
      // https://taichunmin.idv.tw/blog/2021-11-17-liff-open-in-line.html
      window.open(`https://line.me/R/app/${liffId}`, '_self')
    }

    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints
    const isInLine = navigator.userAgent.includes('Line')

    if (!isInLine && isMobile) {
      console.log('auth: redirect to mobile line liff...')
      redirectToMobileLineLogin()
    } else {
      console.log('auth: redirect to desktop line liff...', window.location.href)
      liffObject?.login()
    }
  }, [liffObject, liffId])

  const handleLineLogout = useCallback(() => {
    liffObject?.logout()
  }, [liffObject])

  return (
    <LingAuthContext.Provider
      value={{
        lineEmail,
        isLiffInit,
        liffObject,
        liffError,
        handleRegisterWithLine,
        handleLineLogin,
        handleLineLogout,
      }}
    >
      {children}
    </LingAuthContext.Provider>
  )
}

export const useLineAuthContext = () => {
  const value = useContext(LingAuthContext)

  if (value == null) {
    throw new Error('useLineAuthContext cannot be used outside of LineAuthProvider')
  }

  return value
}
