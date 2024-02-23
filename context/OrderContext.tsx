'use client'

import { PropsWithChildren, createContext, useContext, useEffect } from 'react'
import { useImmer } from 'use-immer'

import { OrderData, getOrders } from '@/services/order'
import { useAuthContext } from '@/context/AuthContext'

type OrderContextType = {
  orders: OrderData[]
}

const OrderContext = createContext<OrderContextType | null>(null)

export const OrderProvider = ({ children }: PropsWithChildren) => {
  const [orders, setOrders] = useImmer<OrderData[]>([])
  const { user, isPreparingData } = useAuthContext()

  useEffect(() => {
    if (isPreparingData) return

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
  }, [setOrders, user, isPreparingData])

  return <OrderContext.Provider value={{ orders }}>{children}</OrderContext.Provider>
}

export const useOrderContext = () => {
  const value = useContext(OrderContext)

  if (value == null) {
    throw new Error('useOrderContext cannot be used outside of OrderProvider')
  }

  return value
}
