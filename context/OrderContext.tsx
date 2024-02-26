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

import { OrderData, getOrders } from '@/services/order'
import { createMemberFeedback } from '@/services/feedback'
import { useAuthContext } from '@/context/AuthContext'
import { toast } from '@/components/ui/use-toast'

type OrderContextType = {
  orders: OrderData[]
  contactOrder: OrderData | null
  contactMessage: string
  contactTextareaRef: RefObject<HTMLTextAreaElement>
  isLoadingOrders: boolean
  isContactDialogOpen: boolean
  handleContactDialogOpen: (order: OrderData) => () => void
  handleContactDialogClose: () => void
  handleContactMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleContactSubmit: () => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export const OrderProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const { token, user, isPreparingData, refreshUser } = useAuthContext()
  const contactTextareaRef = useRef<HTMLTextAreaElement>(null)

  const [orders, setOrders] = useImmer<OrderData[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [contactMessage, setContactMessage] = useState('')
  const [contactOrder, setContactOrder] = useState<OrderData | null>(null)

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

  const handleContactDialogOpen = (order: OrderData) => () => {
    setIsContactDialogOpen(true)
    setContactOrder(order)
    setTimeout(() => {
      contactTextareaRef.current?.focus()
    })
  }

  const handleContactDialogClose = () => {
    setIsContactDialogOpen(false)
    setContactMessage('')
    setContactOrder(null)
  }

  const handleContactMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContactMessage(e.target.value)
  }

  const handleContactSubmit = async () => {
    if (!contactOrder) {
      toast({
        description: '請選擇訂單',
        variant: 'destructive',
      })
      return
    }

    try {
      await createMemberFeedback({
        id: contactOrder.id!,
        domain_id: contactOrder.domain_id!,
        ordergroup_id: Number(contactOrder.ordergroupnumber),
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

  return (
    <OrderContext.Provider
      value={{
        orders,
        contactOrder,
        contactMessage,
        contactTextareaRef,
        isLoadingOrders,
        isContactDialogOpen,
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
