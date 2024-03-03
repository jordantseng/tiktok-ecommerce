'use client'

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { redirect, usePathname } from 'next/navigation'

import {
  OrderData,
  OrderStatusTitle,
  getOrder,
  getOrderStatus,
  getOrderStatusTitle,
} from '@/services/order'
import { toast } from '@/components/ui/use-toast'

type OrderDetailProviderProps = PropsWithChildren<{
  id: string
}>

type OrderDetailContextType = {
  order: OrderData | null
  orderStatusTitle: OrderStatusTitle | null
}

const OrderDetailContext = createContext<OrderDetailContextType | null>(null)

export const OrderDetailProvider = ({ id, children }: OrderDetailProviderProps) => {
  const [order, setOrder] = useState<OrderData | null>(null)
  const [orderError, setOrderError] = useState<boolean | null>(null)
  const [orderStatusTitle, setOrderStatusTitle] = useState<OrderStatusTitle | null>(null)

  console.log('order', order)
  console.log('orderStatusTitle', orderStatusTitle)
  console.log('orderError', orderError)

  useEffect(() => {
    if (order) {
      const title = getOrderStatusTitle(order)!
      setOrderStatusTitle(title)
    }
  }, [order])

  const pathname = usePathname()
  const orderType = pathname.split('/').pop()

  useEffect(() => {
    if (!id) {
      redirect('/member/orders?type=all')
    }

    getOrder(Number(id))
      .then((res) => {
        const order = res.data
        const orderStatus = getOrderStatus(order)

        if (orderStatus !== orderType) {
          throw new Error('訂單狀態錯誤')
        }

        setOrder(order)
      })
      .catch((err) => {
        console.error('getOrder error: ', err)
        toast({
          variant: 'destructive',
          title: err.message,
        })
        setOrderError(true)
      })
  }, [id, orderType])

  useEffect(() => {
    if (orderError) {
      redirect('/member/orders?type=all')
    }
  }, [orderError])

  return (
    <OrderDetailContext.Provider value={{ order, orderStatusTitle }}>
      {children}
    </OrderDetailContext.Provider>
  )
}

export const useOrderDetailContext = () => {
  const value = useContext(OrderDetailContext)

  if (value == null) {
    throw new Error('useOrderDetailContext cannot be used outside of OrderDetailProvider')
  }

  return value
}
