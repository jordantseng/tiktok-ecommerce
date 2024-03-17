'use client'

import {
  ChangeEvent,
  PropsWithChildren,
  RefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useImmer } from 'use-immer'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

import { OrderData, OrderDetail, getOrders } from '@/services/order'
import { createMemberFeedback } from '@/services/feedback'
import { useAuthContext } from '@/context/AuthContext'
import { useCartContext } from '@/context/CartContext'
import { useNavigationContext } from '@/context/NavigationContext'
import { toast } from '@/components/ui/use-toast'

type OrderContextType = {
  orders: OrderData[]
  selectedOrder: OrderData | null
  contactMessage: string
  contactTextareaRef: RefObject<HTMLTextAreaElement>
  isLoadingOrders: boolean
  isContactDialogOpen: boolean
  handleBuyAgain: (orderDetail: OrderDetail[] | undefined) => () => void
  handleSelectOrder: (order: OrderData) => void
  handleContactDialogOpen: () => void
  handleContactDialogClose: () => void
  handleContactMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleContactSubmit: () => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export const OrderProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  const { token, user, isPreparingAuthData, refreshUser } = useAuthContext()
  const { handleAddToCarts } = useCartContext()
  const { setFromPath } = useNavigationContext()

  const contactTextareaRef = useRef<HTMLTextAreaElement>(null)

  const [orders, setOrders] = useImmer<OrderData[]>([])
  const [selectedOrder, setSelectedOrder] = useImmer<OrderData | null>(null)

  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [contactMessage, setContactMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setFromPath()
      router.push('/login')
    } else {
      if (!user) {
        refreshUser()
      } else if (!user.email) {
        router.push('/edit-email')
      }
    }
  }, [token, router, user, refreshUser, setFromPath])

  useEffect(() => {
    if (isPreparingAuthData) return

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
  }, [setOrders, user, isPreparingAuthData])

  const handleContactDialogOpen = () => {
    setIsContactDialogOpen(true)
    setTimeout(() => {
      contactTextareaRef.current?.focus()
    })
  }

  const handleSelectOrder = (order: OrderData) => {
    setSelectedOrder(order)
  }

  const handleContactDialogClose = () => {
    setIsContactDialogOpen(false)
    setContactMessage('')
    setSelectedOrder(null)
  }

  const handleContactMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContactMessage(e.target.value)
  }

  const handleContactSubmit = async () => {
    if (!selectedOrder) {
      toast({
        description: '請選擇訂單',
        variant: 'destructive',
      })
      return
    }

    try {
      await createMemberFeedback({
        id: selectedOrder.id!,
        domain_id: selectedOrder.domain_id!,
        ordergroup_id: Number(selectedOrder.ordergroupnumber),
        name: user?.name || '',
        email: user?.email || '',
        tel: user?.tel || '',
        mobile: user?.mobile || '',
        title: '訂單留言',
        memo: contactMessage,
        retitle: '',
        rebody: '',
        redate: '',
        member_id: user?.id || 0,
        adminuser_id: 0,
        adminuser_name: '',
        created_at: format(new Date(), 'yyyy-MM-dd'),
        updated_at: '',
      })
      toast({
        description: '發送成功',
        className: 'bg-cyan-500 text-white',
      })
    } catch (error) {
      console.error(error)
      toast({
        description: `發送失敗: ${error}`,
        variant: 'destructive',
      })
    }
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
        selectedOrder,
        contactMessage,
        contactTextareaRef,
        isLoadingOrders,
        isContactDialogOpen,
        handleBuyAgain,
        handleSelectOrder,
        handleContactDialogClose,
        handleContactDialogOpen,
        handleContactMessageChange,
        handleContactSubmit,
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
