'use client'

import { Clock4 } from 'lucide-react'

import RecipientCard from '@/app/member/orders/[id]/RecipientCard'
import ShoppingItemCards from '@/app/member/orders/[id]/ShoppingItemCards'
import PrevButton from '@/components/PrevButton'
import { Button } from '@/components/ui/button'
import { OrderData, getOrder, getOrderStatusTitle } from '@/services/order'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import OrderSummaryCard from './OrderSummaryCard'

type OrderPageProps = {
  params: {
    id: string
  }
}

const NINE_MINUTES = 9 * 60 * 1000

const OrderPage = ({ params }: OrderPageProps) => {
  const { id } = params
  const [order, setOrder] = useState<OrderData | null>(null)
  const [countdown, setCountdown] = useState<number>(0)

  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  useEffect(() => {
    setCountdown(0)

    getOrder(Number(id))
      .then((res) => {
        setOrder(res.data)
        setCountdown(NINE_MINUTES)
      })
      .catch((err) => {
        console.error('getOrder error: ', err)
        toast({
          variant: 'destructive',
          title: err,
        })
      })
  }, [id])

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

  console.log('order: ', order)

  if (!type) {
    return toast({
      variant: 'destructive',
      title: '訂單不存在',
    })
  }

  return (
    <main className="flex h-full min-h-screen flex-col">
      <section className="relative bg-gradient-to-r from-primary-alt to-primary pb-20 text-white">
        <div className="grid place-items-center gap-10 p-4">
          <div className="relative flex w-full flex-col gap-4">
            <PrevButton />

            <div className="flex w-full items-center justify-center">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex flex-col gap-2">
                  <span className="flex items-center justify-center gap-2 text-lg md:text-2xl">
                    {!order ? <Skeleton className="h-7 w-7 rounded-full" /> : <Clock4 />}
                    {!order ? <Skeleton className="h-7 w-14 md:h-8" /> : getOrderStatusTitle(order)}
                  </span>
                  <span className="text-xs md:text-base">
                    {!order ? (
                      <Skeleton className="h-4 w-40 md:h-6" />
                    ) : countdown > 0 ? (
                      `${Math.floor(countdown / 1000 / 60)} 分鐘後訂單關閉，請及時付款哦`
                    ) : (
                      ''
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex flex-1 flex-col bg-gray-50">
        <RecipientCard order={order} />

        <div className="relative -top-28 flex flex-1 flex-col">
          <ShoppingItemCards order={order} />

          <OrderSummaryCard order={order} />

          <div className="relative m-4 mt-0 flex flex-col gap-2 rounded-xl bg-white p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">下單時間</span>
              <span>2021.12.27 12:22:35</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">訂單編號</span>
              <span>83837423749237492</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">支付方式</span>
              <span>支付寶</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">交易流水號</span>
              <span>838374237492374921939</span>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex min-h-16 justify-end bg-white shadow-2xl">
          <div className="p-2">
            <Button
              variant="ghost"
              className="rounded-3xl border border-primary px-6 py-4 text-primary hover:bg-primary-foreground hover:text-primary"
            >
              付款
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default OrderPage