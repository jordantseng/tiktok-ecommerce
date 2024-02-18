'use client'

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

import { ProductData, getProducts } from '@/services/product'

type RecommendsContextType = {
  recommends: ProductData[]
  isLoading: boolean
}

const RecommendsContext = createContext<RecommendsContextType | null>(null)

export const RecommendsProvider = ({ children }: PropsWithChildren) => {
  const [recommends, setRecommends] = useImmer<ProductData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    getProducts({ page: 1, pageSize: 2 })
      .then(({ data }) => {
        setRecommends(data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [setRecommends])

  return (
    <RecommendsContext.Provider
      value={{
        recommends,
        isLoading,
      }}
    >
      {children}
    </RecommendsContext.Provider>
  )
}

export const useRecommendsContext = () => {
  const value = useContext(RecommendsContext)

  if (value == null) {
    throw new Error('RecommendsContext cannot be used outside of SidebarProvider')
  }

  return value
}
