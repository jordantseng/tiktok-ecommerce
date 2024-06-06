'use client'

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import { useRouter } from 'next/navigation'

import { OrderData, OrderDetail, getOrders } from '@/services/order'
import { useAuthContext } from '@/context/AuthContext'
import { useCartContext } from '@/context/CartContext'
import { useNavigationContext } from '@/context/NavigationContext'
import { toast } from '@/components/ui/use-toast'
import { getBaseURL } from '@/lib/utils'

type OrderContextType = {
  orders: OrderData[]
  isLoadingOrders: boolean
  refreshOrders: () => void
  handleBuyAgain: (orderDetail: OrderDetail[] | undefined) => () => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export const OrderProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  const { token, user, isPreparingAuthData, refreshUser } = useAuthContext()
  const { handleAddToCarts } = useCartContext()
  const { setFromPath } = useNavigationContext()

  const [orders, setOrders] = useImmer<OrderData[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)

  useEffect(() => {
    if (!token) {
      setFromPath()
      router.push('/login')
    } else if (!user) {
      refreshUser()
    }
  }, [token, router, user, refreshUser, setFromPath])

  useEffect(() => {
    const baseURL = getBaseURL(window.location.host)

    if (isPreparingAuthData) return

    setIsLoadingOrders(true)

    getOrders(baseURL)
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
  }, [setOrders, user, isPreparingAuthData])

  const refreshOrders = () => {
    const baseURL = getBaseURL(window.location.host)
    getOrders(baseURL)
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
  }

  const handleBuyAgain = (orderDetail: OrderDetail[] | undefined) => async () => {
    if (!orderDetail) {
      throw new Error('orderDetail is undefined')
    }

    try {
      const cartItems = orderDetail.map((item) => ({
        productitem_id: item.productitem_id,
        qty: item.qty,
        online: 0,
      }))

      await handleAddToCarts(cartItems)

      toast({
        className: 'bg-cyan-500 text-white',
        description: '已將商品加入購物車',
      })
    } catch (error) {
      console.error('handleBuyAgain error: ', error)
      toast({
        variant: 'destructive',
        description: `加入購物車失敗: ${error}`,
      })
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        isLoadingOrders,
        handleBuyAgain,
        refreshOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrderContext = () => {
  const value = useContext(OrderContext)

  if (value == null) {
    throw new Error('useOrderContext cannot be used outside of OrderProvider')
  }

  return value
}
