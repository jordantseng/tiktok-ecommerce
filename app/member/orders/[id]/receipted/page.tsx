'use client'

import { CheckCircle2 } from 'lucide-react'

import RecipientCard from '@/app/member/orders/[id]/RecipientCard'
import ShoppingItemCards from '@/app/member/orders/[id]/ShoppingItemCards'
import OrderSummaryCard from '@/app/member/orders/[id]/OrderSummaryCard'
import OrderHeaderInfoCard from '@/app/member/orders/[id]/OrderHeaderInfoCard'
import TransactionInfoCard from '@/app/member/orders/[id]/TransactionInfoCard'
import { Skeleton } from '@/components/ui/skeleton'
import { getOrderStatusTitle } from '@/services/order'
import { useOrderDetailContext } from '@/context/OrderDetailContext'

const ReceiptedPage = () => {
  const { order } = useOrderDetailContext()

  console.log('order: ', order)

  return (
    <>
      <OrderHeaderInfoCard
        title={
          <>
            {!order ? <Skeleton className="h-7 w-7 rounded-full" /> : <CheckCircle2 />}
            {!order ? <Skeleton className="h-7 w-14 md:h-8" /> : getOrderStatusTitle(order)}
          </>
        }
        description={<>{!order ? <Skeleton className="h-4 w-40 md:h-6" /> : '已完成，感謝購買'}</>}
      />

      <section className="relative flex flex-1 flex-col bg-gray-50">
        <div className="relative -top-24 flex min-h-28 flex-col gap-2 rounded-xl p-4">
          <RecipientCard order={order} />
        </div>

        <div className="relative -top-28 flex flex-1 flex-col">
          <ShoppingItemCards order={order} />
          <OrderSummaryCard order={order} />
          <TransactionInfoCard order={order} />
        </div>
      </section>
    </>
  )
}

export default ReceiptedPage
