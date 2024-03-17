'use client'

import { usePathname } from 'next/navigation'
import { PropsWithChildren, createContext, use, useCallback, useContext, useState } from 'react'

type NavigationContextType = {
  from: string
  setFromPath: (path?: string) => void
}

const NavigationContext = createContext<NavigationContextType | null>(null)

export const NavigationProvider = ({ children }: PropsWithChildren) => {
  const [from, setFrom] = useState('')
  const pathname = usePathname()

  const setFromPath = useCallback(
    (path = '') => {
      setFrom(path || pathname)
    },
    [pathname],
  )

  return (
    <NavigationContext.Provider value={{ from, setFromPath }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigationContext = () => {
  const value = useContext(NavigationContext)

  if (value == null) {
    throw new Error('useContext cannot be used outside of NavigationProvider')
  }

  return value
}
