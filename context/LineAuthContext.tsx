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
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthContext } from './AuthContext'
import { getTokenByLineIdToken, register, RegisterInfo } from '@/services/auth'
import { getBaseURL } from '@/lib/utils'
import { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useNavigationContext } from './NavigationContext'

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

const liffId = '2005664248-jXBbmKwy'

export const LineAuthProvider = ({ children }: PropsWithChildren) => {
  const [liffObject, setLiffObject] = useState<Liff>()
  const [liffError, setLiffError] = useState('')
  const [lineEmail, setLineEmail] = useState('')

  const { from } = useNavigationContext()
  const { handleSetToken } = useAuthContext()
  const router = useRouter()
  const { toast } = useToast()

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
  }, [])

  useEffect(() => {
    if (code || state || liffClientId || liffRedirectUri) {
      router.push('/')
    }
  }, [code, state, liffClientId, liffRedirectUri, router])

  useEffect(() => {
    if (liffObject && liffObject.isLoggedIn()) {
      const idToken = liffObject.getIDToken()
      const baseURL = getBaseURL(window.location.host)

      if (idToken) {
        getTokenByLineIdToken(baseURL, idToken)
          .then(({ data }) => {
            handleSetToken(data.api_token)
            router.push('/')
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
      }
    }
  }, [handleSetToken, router, liffObject])

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
    liffObject?.login()
  }, [liffObject])

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
