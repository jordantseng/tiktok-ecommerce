'use client'
import { getWebSettings } from '@/services/webSettings'
import { webSettingsData } from '@/types/common'
import { ReactNode, createContext, useContext, useEffect } from 'react'
import { useImmer } from 'use-immer'

type WebSettingsContextType = {
  webSettingsData: webSettingsData | null
}

const WebSettingsContext = createContext<WebSettingsContextType | null>(null)

type WebSettingsProviderProps = {
  children: ReactNode
}

export const WebSettingsProvider = ({ children }: WebSettingsProviderProps) => {
  const [data, setData] = useImmer<webSettingsData | null>(null)

  useEffect(() => {
    getWebSettings().then((res) => setData(res.data))
  }, [setData])

  return (
    <WebSettingsContext.Provider
      value={{
        webSettingsData: data,
      }}
    >
      {children}
    </WebSettingsContext.Provider>
  )
}

export const useWebSettingsContext = () => {
  const value = useContext(WebSettingsContext)

  if (value == null) {
    throw new Error('useWebSettingsContext cannot be used outside of WebSettingsProvider')
  }

  return value
}
