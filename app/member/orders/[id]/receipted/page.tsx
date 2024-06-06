'use client'

import { CheckCircle2 } from 'lucide-react'

import ShoppingSummaryActionCards from '@/app/member/orders/[id]/ShoppingSummaryActionCards'
import OrderHeaderInfoCard from '@/app/member/orders/[id]/OrderHeaderInfoCard'
import { Skeleton } from '@/components/ui/skeleton'
import { OrderDetail } from '@/services/order'
import { useOrderDetailContext } from '@/context/OrderDetailContext'
import OrderSummaryCard from '../OrderSummaryCard'
import OrderMemoCard from '../OrderMemoCard'

const ReceiptedPage = () => {
  const { order, orderStatusTitle } = useOrderDetailContext()

  const handleBuyAgain = (order: OrderDetail) => {
    console.log('buy again', order)
  }

  return (
    <>
      <OrderHeaderInfoCard
        title={
          <>
            {!order ? <Skeleton className="h-7 w-7 rounded-full" /> : <CheckCircle2 />}
            {!order ? <Skeleton className="h-7 w-14 md:h-8" /> : orderStatusTitle}
          </>
        }
        description={<>{!order ? <Skeleton className="h-4 w-40 md:h-6" /> : '已完成，感謝購買'}</>}
      />

      <section className="relative flex flex-1 flex-col bg-gray-50">
        <div className="relative -top-24 flex flex-1 flex-col gap-4 p-4">
          <ShoppingSummaryActionCards
            title={orderStatusTitle}
            order={order}
            onClick={handleBuyAgain}
          />
          <OrderSummaryCard order={order} />
          <OrderMemoCard order={order} />
        </div>
      </section>
    </>
  )
}

export default ReceiptedPage
