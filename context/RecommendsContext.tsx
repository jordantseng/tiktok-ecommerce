'use client'

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

import { ProductData, getProducts } from '@/services/product'
import { getBaseURL } from '@/lib/utils'

type RecommendsContextType = {
  recommends: ProductData[]
  isLoadingRecommends: boolean
}

const RecommendsContext = createContext<RecommendsContextType | null>(null)

export const RecommendsProvider = ({ children }: PropsWithChildren) => {
  const [recommends, setRecommends] = useImmer<ProductData[]>([])
  const [isLoadingRecommends, setIsLoadingRecommends] = useState(true)

  useEffect(() => {
    const baseURL = getBaseURL(window.location.host)

    getProducts({ baseURL, page: 1, pageSize: 10000 })
      .then(({ data }) => {
        setRecommends(data.data)
      })
      .finally(() => {
        setIsLoadingRecommends(false)
      })
  }, [setRecommends])

  return (
    <RecommendsContext.Provider
      value={{
        recommends,
        isLoadingRecommends,
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
