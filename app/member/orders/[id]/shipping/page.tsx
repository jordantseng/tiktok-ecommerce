'use client'

import { Truck } from 'lucide-react'

import RecipientCard from '@/app/member/orders/[id]/RecipientCard'
import OrderSummaryCard from '@/app/member/orders/[id]/OrderSummaryCard'
import OrderHeaderInfoCard from '@/app/member/orders/[id]/OrderHeaderInfoCard'
import TransactionInfoCard from '@/app/member/orders/[id]/TransactionInfoCard'
import OrderMemoCard from '@/app/member/orders/[id]/OrderMemoCard'
import ShoppingSummaryCards from '@/app/member/orders/[id]/ShoppingSummaryCards'
import OrderContactCard from '@/app/member/orders/[id]/OrderContactCard'
import { PrimaryButton } from '@/components/OrderButtons'
import { useToast } from '@/components/ui/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrderDetailContext } from '@/context/OrderDetailContext'

const ShippingPage = () => {
  const { order, orderStatusTitle } = useOrderDetailContext()
  const { toast } = useToast()

  const handleRemind = () => {
    // Boss say only do this is fine
    toast({
      className: 'bg-primary text-white',
      description: '已通知賣家',
    })
  }

  return (
    <>
      <OrderHeaderInfoCard
        title={
          <>
            {!order ? <Skeleton className="h-7 w-7 rounded-full" /> : <Truck />}
            {!order ? <Skeleton className="h-7 w-14 md:h-8" /> : orderStatusTitle}
          </>
        }
        description={
          <>{!order ? <Skeleton className="h-4 w-40 md:h-6" /> : '已付款，等待上架發貨'}</>
        }
      />

      <section className="relative flex flex-1 flex-col bg-gray-50">
        <div className="relative -top-24 flex min-h-28 flex-col gap-2 rounded-xl p-4">
          <RecipientCard order={order} />
        </div>

        <div className="relative -top-28 flex flex-1 flex-col">
          <ShoppingSummaryCards order={order} />
          <OrderSummaryCard order={order} />
          <TransactionInfoCard order={order} />
          <OrderMemoCard order={order} />
          <OrderContactCard order={order} />
        </div>

        <div className="sticky bottom-0 flex min-h-16 justify-end bg-white shadow-2xl">
          <div className="p-2">
            {!order ? (
              <Skeleton className="h-10 w-20 rounded-full" />
            ) : (
              <PrimaryButton onClick={handleRemind}>提醒發貨</PrimaryButton>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default ShippingPage
