'use client'

import { Truck } from 'lucide-react'

import RecipientCard from '@/app/member/orders/[id]/RecipientCard'
import ShoppingItemCards from '@/app/member/orders/[id]/ShoppingItemCards'
import OrderSummaryCard from '@/app/member/orders/[id]/OrderSummaryCard'
import OrderHeaderInfoCard from '@/app/member/orders/[id]/OrderHeaderInfoCard'
import TransactionInfoCard from '@/app/member/orders/[id]/TransactionInfoCard'
import { Skeleton } from '@/components/ui/skeleton'
import { getOrderStatusTitle } from '@/services/order'
import { useOrderDetailContext } from '@/context/OrderDetailContext'
import { Button } from '@/components/ui/button'

const ShippingPage = () => {
  const { order } = useOrderDetailContext()

  console.log('order: ', order)

  return (
    <>
      <OrderHeaderInfoCard
        title={
          <>
            {!order ? <Skeleton className="h-7 w-7 rounded-full" /> : <Truck />}
            {!order ? <Skeleton className="h-7 w-14 md:h-8" /> : getOrderStatusTitle(order)}
          </>
        }
        description={
          <>{!order ? <Skeleton className="h-4 w-40 md:h-6" /> : '已付款，等待上架發貨'}</>
        }
      />

      <section className="relative flex flex-1 flex-col bg-gray-50">
        <RecipientCard order={order} />

        <div className="relative -top-28 flex flex-1 flex-col">
          <ShoppingItemCards order={order} />
          <OrderSummaryCard order={order} />
          <TransactionInfoCard order={order} />
        </div>

        <div className="sticky bottom-0 flex min-h-16 justify-end bg-white shadow-2xl">
          <div className="p-2">
            {!order ? (
              <Skeleton className="h-10 w-28 rounded-full" />
            ) : (
              <Button
                variant="ghost"
                className="rounded-3xl border border-primary px-6 py-4 text-primary hover:bg-primary-foreground hover:text-primary"
              >
                提醒發貨
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default ShippingPage
