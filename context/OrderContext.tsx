'use client'

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

import { OrderData, getOrders } from '@/services/order'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

type OrderContextType = {
  orders: OrderData[]
  isLoadingOrders: boolean
}

const OrderContext = createContext<OrderContextType | null>(null)

export const OrderProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const { token, user, isPreparingData, refreshUser } = useAuthContext()

  const [orders, setOrders] = useImmer<OrderData[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)

  useEffect(() => {
    if (!token) {
      router.push('/login')
    } else {
      refreshUser()
    }
  }, [token, router, refreshUser])

  useEffect(() => {
    if (isPreparingData) return

    setIsLoadingOrders(true)

    getOrders()
      .then((res) => {
        if (res.resultcode !== 0) {
          throw new Error(res.resultmessage)
        }
        setOrders(res.data.data || [])
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoadingOrders(false)
      })
  }, [setOrders, user, isPreparingData])

  return (
    <OrderContext.Provider value={{ orders, isLoadingOrders }}>{children}</OrderContext.Provider>
  )
}

export const useOrderContext = () => {
  const value = useContext(OrderContext)

  if (value == null) {
    throw new Error('useOrderContext cannot be used outside of OrderProvider')
  }

  return value
}
