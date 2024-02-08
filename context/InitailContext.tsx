'use client'
import { getInitial } from '@/services/initial'
import { InitialData } from '@/types/common'
import { ReactNode, createContext, useContext, useEffect } from 'react'
import { useImmer } from 'use-immer'

type InitialContextType = {
  initialData: InitialData | null
}

const InitialContext = createContext<InitialContextType | null>(null)

type InitialProviderProps = {
  children: ReactNode
}

export const InitialProvider = ({ children }: InitialProviderProps) => {
  const [data, setData] = useImmer<InitialData | null>(null)

  useEffect(() => {
    getInitial().then((res) => setData(res.data))
  }, [])

  return (
    <InitialContext.Provider
      value={{
        initialData: data,
      }}
    >
      {children}
    </InitialContext.Provider>
  )
}

export const useInitialContext = () => {
  const value = useContext(InitialContext)

  if (value == null) {
    throw new Error('useSidebarContext cannot be used outside of SidebarProvider')
  }

  return value
}
