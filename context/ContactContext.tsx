'use client'

import {
  ChangeEvent,
  PropsWithChildren,
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react'
import { useImmer } from 'use-immer'
import { format } from 'date-fns'

import { OrderData } from '@/services/order'
import { FeedbackData, createMemberFeedback, getMemberFeedbacks } from '@/services/feedback'
import { useAuthContext } from '@/context/AuthContext'
import { toast } from '@/components/ui/use-toast'
import { getBaseURL } from '@/lib/utils'

type ContactContextType = {
  selectedOrder: OrderData | null
  contactMessage: string
  contactTextareaRef: RefObject<HTMLTextAreaElement>
  isContactDialogOpen: boolean
  handleGetContactById: (id: number) => Promise<FeedbackData[]>
  handleSelectOrder: (order: OrderData) => void
  handleContactDialogOpen: () => void
  handleContactDialogClose: () => void
  handleContactMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleContactSubmit: () => void
}

const ContactContext = createContext<ContactContextType | null>(null)

export const ContactProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuthContext()

  const contactTextareaRef = useRef<HTMLTextAreaElement>(null)

  const [selectedOrder, setSelectedOrder] = useImmer<OrderData | null>(null)

  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [contactMessage, setContactMessage] = useState('')

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

    const baseURL = getBaseURL(window.location.host)

    try {
      await createMemberFeedback(baseURL, {
        id: selectedOrder.id!,
        domain_id: selectedOrder.domain_id!,
        ordergroup_id: selectedOrder.id!,
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

  const handleGetContactById = async (id: number) => {
    const baseURL = getBaseURL(window.location.host)

    try {
      const data = await getMemberFeedbacks(baseURL, id)
      return data.data
    } catch (error) {
      console.error(error)
      toast({
        description: `取得失敗: ${error}`,
        variant: 'destructive',
      })
      return []
    }
  }

  return (
    <ContactContext.Provider
      value={{
        contactMessage,
        contactTextareaRef,
        selectedOrder,
        handleContactDialogClose,
        handleContactDialogOpen,
        handleContactMessageChange,
        handleContactSubmit,
        handleGetContactById,
        handleSelectOrder,
        isContactDialogOpen,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export const useContactContext = () => {
  const value = useContext(ContactContext)

  if (value == null) {
    throw new Error('useContactContext cannot be used outside of ContactProvider')
  }

  return value
}
