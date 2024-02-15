'use client'

import { PropsWithChildren, createContext, useContext, useEffect } from 'react'
import { useImmer } from 'use-immer'

import { getWebSettings } from '@/services/webSettings'
import { WebSettingsData } from '@/types/common'

type WebSettingsContextType = {
  webSettingsData: WebSettingsData | null
}

const WebSettingsContext = createContext<WebSettingsContextType | null>(null)

export const WebSettingsProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useImmer<WebSettingsData | null>(null)

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
