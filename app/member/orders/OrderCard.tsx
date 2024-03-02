'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import { buttonMap } from '@/app/member/orders/Buttons'
import { useOrderContext } from '@/context/OrderContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getFormatDate, getOrderStatus, getOrderStatusTitle } from '@/services/order'
import { OrderData } from '@/services/order'
import { cn } from '@/lib/utils'

type Action = {
  label: string
  onClick: () => void
  type: 'primary' | 'secondary' | 'common'
}

type OrderCardProps = {
  order: OrderData
}

const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = getOrderStatus(order)!
  const { handleContactDialogOpen, handleSelectOrder } = useOrderContext()

  const createDate = getFormatDate(order.created_at!)
  const orderStatus = getOrderStatusTitle(order)
  const totalprice = order.totalprice?.toLocaleString()
  const productTitle = order.product_title
  const productImgs = order.product_imgs

  const handlePay = () => {
    const newSearchPamras = new URLSearchParams(searchParams)
    router.push(`/member/orders/${order.id}?${newSearchPamras.toString()}`)
  }

  const handleContact = () => {
    handleContactDialogOpen()
    handleSelectOrder(order)
  }

  const handleBuyAgain = () => {}
  const handleConfirmReceipt = () => {}
  const handleCheckLogistics = () => {}
  const handleCheckRefund = () => {}
  const handleRemindShipping = () => {}

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
      { label: '再來一單', onClick: handleBuyAgain, type: 'common' },
      { label: '確認收貨', onClick: handleConfirmReceipt, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
    receipted: [
      { label: '查看物流', onClick: handleCheckLogistics, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
    refunded: [
      { label: '查看退款', onClick: handleCheckRefund, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
  }

  const action = actions[status] || []

  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between border-b border-default pb-4 text-sm font-normal">
            <span className="text-gray-500">{createDate}</span>
            <p className="text-primary">{orderStatus}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p>{productTitle}</p>
          <div className="flex items-end justify-between">
            <div className="flex gap-4">
              {productImgs &&
                productImgs.length > 0 &&
                productImgs.map((image) => (
                  <div key={image} className="rounded-xl bg-default p-4">
                    <Image
                      width={100}
                      height={100}
                      className="md:h-25 md:w-25 h-10 w-10"
                      src={image}
                      alt={image}
                    />
                  </div>
                ))}
            </div>

            <div className="flex flex-col items-end gap-1 text-sm">
              {/* <span className="text-gray-400">共 2 件</span> */}
              <span>
                合計：$
                <span className="text-xl font-bold">{totalprice}</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <span
          className={cn('grid gap-2', {
            'grid-cols-2': action.length === 2,
            'grid-cols-3': action.length === 3,
          })}
        >
          {action.map(({ type, label, onClick }, index) => {
            const ButtonComponent = buttonMap[type]
            return (
              <ButtonComponent key={index} onClick={onClick}>
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
