'use client'

import { CheckCircle2 } from 'lucide-react'

import ShoppingItemCards from '@/app/member/orders/[id]/ShoppingItemCards'
import OrderHeaderInfoCard from '@/app/member/orders/[id]/OrderHeaderInfoCard'
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
        <div className="relative -top-24 flex flex-1 flex-col">
          <ShoppingItemCards order={order} />
        </div>
      </section>
    </>
  )
}

export default ReceiptedPage
