'use client'

import { BadgeJapaneseYen } from 'lucide-react'

import ShoppingSummaryActionCards from '@/app/member/orders/[id]/ShoppingSummaryActionCards'
import OrderHeaderInfoCard from '@/app/member/orders/[id]/OrderHeaderInfoCard'
import { Skeleton } from '@/components/ui/skeleton'
import { OrderDetail } from '@/services/order'
import { useOrderDetailContext } from '@/context/OrderDetailContext'

const RefundedPage = () => {
  const { order, orderStatusTitle } = useOrderDetailContext()

  const handleCheckRefund = (detail: OrderDetail) => {
    console.log('check refund', detail)
  }

  return (
    <>
      <OrderHeaderInfoCard
        title={
          <>
            {!order ? <Skeleton className="h-7 w-7 rounded-full" /> : <BadgeJapaneseYen />}
            {!order ? <Skeleton className="h-7 w-14 md:h-8" /> : orderStatusTitle}
          </>
        }
        description={
          <>{!order ? <Skeleton className="h-4 w-40 md:h-6" /> : '已取消，可再買一次'}</>
        }
      />

      <section className="relative flex flex-1 flex-col bg-gray-50">
        <div className="relative -top-24 flex flex-1 flex-col gap-4 p-4">
          <ShoppingSummaryActionCards
            title={orderStatusTitle}
            order={order}
            onClick={handleCheckRefund}
          />
        </div>
      </section>
    </>
  )
}

export default RefundedPage
