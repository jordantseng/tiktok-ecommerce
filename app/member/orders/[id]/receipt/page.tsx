'use client'

import { ShoppingBag } from 'lucide-react'

import RecipientCard from '@/app/member/orders/[id]/RecipientCard'
import OrderSummaryCard from '@/app/member/orders/[id]/OrderSummaryCard'
import OrderHeaderInfoCard from '@/app/member/orders/[id]/OrderHeaderInfoCard'
import TransactionInfoCard from '@/app/member/orders/[id]/TransactionInfoCard'
import ShippingStatusCard from '@/app/member/orders/[id]/ShippingStatusCard'
import ShoppingSummaryCards from '@/app/member/orders/[id]/ShoppingSummaryCards'
import OrderContactCard from '@/app/member/orders/[id]/OrderContactCard'
import { CommonButton } from '@/components/OrderButtons'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrderDetailContext } from '@/context/OrderDetailContext'
import { useOrderContext } from '@/context/OrderContext'

const ReceiptPage = () => {
  const { handleBuyAgain } = useOrderContext()
  const { order, orderStatusTitle } = useOrderDetailContext()

  return (
    <>
      <OrderHeaderInfoCard
        title={
          <>
            {!order ? <Skeleton className="h-7 w-7 rounded-full" /> : <ShoppingBag />}
            {!order ? <Skeleton className="h-7 w-14 md:h-8" /> : orderStatusTitle}
          </>
        }
        description={
          <>{!order ? <Skeleton className="h-4 w-40 md:h-6" /> : '已付款，等待商家發貨'}</>
        }
      />

      <section className="relative flex flex-1 flex-col bg-gray-50">
        <div className="relative -top-24 flex min-h-28 flex-col gap-4 rounded-xl p-4">
          <ShippingStatusCard order={order} />
          <RecipientCard order={order} />
        </div>

        <div className="relative -top-28 flex flex-1 flex-col">
          <ShoppingSummaryCards order={order} />
          <OrderSummaryCard order={order} />
          <TransactionInfoCard order={order} />
          <OrderContactCard order={order} />
        </div>

        <div className="sticky bottom-0 flex min-h-16 justify-end bg-white shadow-2xl">
          <div className="p-2">
            <div className="flex gap-2">
              {!order ? (
                Array(2)
                  .fill(null)
                  .map((_, index) => <Skeleton key={index} className="h-10 w-20 rounded-full" />)
              ) : (
                <>
                  <CommonButton onClick={handleBuyAgain(order?.orderdetail)}>再來一單</CommonButton>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ReceiptPage
