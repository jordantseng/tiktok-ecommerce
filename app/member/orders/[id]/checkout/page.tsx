'use client'

import { useEffect, useState } from 'react'
import { Clock4 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import RecipientCard from '@/app/member/orders/[id]/RecipientCard'
import OrderSummaryCard from '@/app/member/orders/[id]/OrderSummaryCard'
import OrderHeaderInfoCard from '@/app/member/orders/[id]/OrderHeaderInfoCard'
import TransactionInfoCard from '@/app/member/orders/[id]/TransactionInfoCard'
import OrderMemoCard from '@/app/member/orders/[id]/OrderMemoCard'
import { PrimaryButton } from '@/components/OrderButtons'
import { Skeleton } from '@/components/ui/skeleton'
import ShoppingItemCards from '@/components/ShoppingItemCards'
import { useOrderDetailContext } from '@/context/OrderDetailContext'
import { payOrder } from '@/services/order'
import { useToast } from '@/components/ui/use-toast'
import { getBaseURL } from '@/lib/utils'

const NINE_MINUTES = 9 * 60 * 1000

const CheckoutPage = () => {
  const { toast } = useToast()
  const { order, orderStatusTitle } = useOrderDetailContext()
  const router = useRouter()
  const [countdown, setCountdown] = useState<number>(0)

  useEffect(() => {
    setCountdown(0)

    if (order) {
      setCountdown(NINE_MINUTES)
    }
  }, [order])

  useEffect(() => {
    // TODO: need to set to local storage
    // if (countdown === 0) {
    //   return
    // }
    // let timer = setInterval(() => {
    //   setCountdown((prev) => prev - 1000)
    // }, 1000)
    // return () => {
    //   if (timer) {
    //     clearInterval(timer)
    //   }
    // }
  }, [countdown])

  const handlePay = () => {
    const baseURL = getBaseURL(window.location.host)

    if (!order?.id) {
      return toast({
        variant: 'destructive',
        description: 'No Order Id Offered',
      })
    }

    if (order?.paystatus?.includes('atm')) {
      router.push(`/atm-detail/checkout?id=${order.id}`)
    } else if (order?.paystatus?.includes('barcode')) {
      router.push(`/qrcode-detail/checkout?id=${order.id}`)
    } else {
      payOrder(baseURL, order?.id)
    }
  }

  return (
    <>
      <OrderHeaderInfoCard
        title={
          <>
            {!order ? <Skeleton className="h-7 w-7 rounded-full" /> : <Clock4 />}
            {!order ? <Skeleton className="h-7 w-14 md:h-8" /> : orderStatusTitle}
          </>
        }
        description={
          <>
            {!order ? (
              <Skeleton className="h-4 w-40 md:h-6" />
            ) : countdown > 0 ? (
              `${Math.floor(countdown / 1000 / 60)} 分鐘後訂單關閉，請及時付款哦`
            ) : (
              ''
            )}
          </>
        }
      />

      <section className="relative flex flex-1 flex-col bg-gray-50">
        <div className="relative -top-24 flex min-h-28 flex-col gap-2 rounded-xl p-4">
          <RecipientCard order={order} />
        </div>

        <div className="relative -top-28 flex flex-1 flex-col">
          <ShoppingItemCards order={order} />
          <OrderSummaryCard order={order} />
          <TransactionInfoCard order={order} />
          <OrderMemoCard order={order} />
        </div>

        <div className="sticky bottom-0 flex min-h-16 justify-end bg-white shadow-2xl">
          <div className="p-2">
            {!order ? (
              <Skeleton className="h-10 w-20 rounded-full" />
            ) : (
              <PrimaryButton onClick={handlePay}>去結帳</PrimaryButton>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default CheckoutPage
