'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { ButtonType, buttonMap } from '@/app/member/orders/Buttons'
import { useOrderContext } from '@/context/OrderContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { ShoppingItemCard } from '@/components/ShoppingItemCards'
import { getFormatDate, getOrder, getOrderStatus, getOrderStatusTitle } from '@/services/order'
import { OrderData } from '@/services/order'
import { cn } from '@/lib/utils'

export const OrderCardSkeleton = () => (
  <Card className="w-full border-none">
    <CardHeader>
      <CardTitle>
        <div className="flex justify-between border-b border-background pb-4 text-sm font-normal">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-[72px] w-[72px] rounded-xl" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-end">
      <span className="grid grid-cols-2 gap-2">
        <Skeleton className="h-10 w-20 rounded-full" />
        <Skeleton className="h-10 w-20 rounded-full" />
      </span>
    </CardFooter>
  </Card>
)

type Action = {
  label: string
  type: ButtonType
  isLoading?: boolean
  onClick: () => void
}

type OrderCardProps = {
  order: OrderData
}

const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter()
  const status = getOrderStatus(order)!

  const { toast } = useToast()
  const { handleContactDialogOpen, handleSelectOrder, handleBuyAgain } = useOrderContext()

  const [isBuying, setIsBuying] = useState(false)

  const createDate = getFormatDate(order.created_at!)
  const orderStatus = getOrderStatusTitle(order)

  const totalprice = order.totalprice
  const orderID = order.id

  const handlePay = () => {
    router.push(`/member/orders/${orderID}/checkout`)
  }

  const handleBuyMore = async () => {
    if (!orderID) {
      toast({
        variant: 'destructive',
        description: '訂單編號錯誤',
      })
      return
    }

    setIsBuying(true)

    try {
      const { data } = await getOrder(orderID)
      const orderDetail = data.orderdetail
      handleBuyAgain(orderDetail)()
    } catch (error) {
      console.error('getOrder error: ', error)

      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          description: error.message,
        })
      }
    } finally {
      setIsBuying(false)
    }
  }

  const handleContact = () => {
    handleContactDialogOpen()
    handleSelectOrder(order)
  }

  const handleConfirmReceipt = () => {
    router.push(`/member/orders/${orderID}/receipt`)
  }

  const handleCheckLogistics = () => {
    router.push(`/member/orders/${orderID}/receipted`)
  }

  const handleCheckRefunded = () => {
    router.push(`/member/orders/${orderID}/refunded`)
  }

  const handleRemindShipping = () => {
    router.push(`/member/orders/${orderID}/shipping`)
  }

  const actions: Record<typeof status, Action[]> = {
    checkout: [
      { label: '付款', onClick: handlePay, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
    shipping: [
      { label: '提醒發貨', onClick: handleRemindShipping, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
    receipt: [
      { label: '再來一單', onClick: handleBuyMore, type: 'common', isLoading: isBuying },
      { label: '確認收貨', onClick: handleConfirmReceipt, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
    receipted: [
      { label: '查看物流', onClick: handleCheckLogistics, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
    refunded: [
      { label: '查看退款', onClick: handleCheckRefunded, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
  }

  const action = actions[status] || []

  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between border-b border-background pb-4 text-sm font-normal">
            <span className="text-gray-500">{createDate}</span>
            <p className="text-primary">{orderStatus}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {order.orderdetail && (
            <ShoppingItemCard
              detail={{
                ...order.orderdetail[0],
                price: Number(totalprice),
              }}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <span
          className={cn('grid gap-2', {
            'grid-cols-2': action.length === 2,
            'grid-cols-3': action.length === 3,
          })}
        >
          {action.map(({ type, label, isLoading, onClick }, index) => {
            const ButtonComponent = buttonMap[type]
            return (
              <ButtonComponent key={index} onClick={onClick} isLoading={isLoading}>
                {label}
              </ButtonComponent>
            )
          })}
        </span>
      </CardFooter>
    </Card>
  )
}

export default OrderCard
