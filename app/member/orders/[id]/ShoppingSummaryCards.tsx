'use client'

import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'
import { OrderData, OrderDetail } from '@/services/order'

type ShoppingSummaryCardProps = {
  detail: OrderDetail
}

function ShoppingSummaryCard({ detail }: ShoppingSummaryCardProps) {
  return (
    <div className="relative m-4 flex flex-col gap-2 rounded-xl bg-white p-4">
      <div className="flex flex-1 items-end justify-between gap-2">
        {detail.product.imgs.map((img, index) => (
          <div key={index} className="">
            <Image
              width={100}
              height={100}
              className="h-16 w-16 rounded-xl md:h-20 md:w-20"
              src={img}
              alt={detail.product_title}
            />
          </div>
        ))}

        <div className="flex flex-col items-end text-sm">
          <span className="text-gray-500">共 {detail.qty} 件</span>
          <span className="flex items-center gap-1">
            合計
            <span className="text-lg font-bold">${detail.price.toLocaleString()}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function ShoppingSummaryCardSkeleton() {
  return (
    <div className="relative m-4 flex flex-col gap-2 rounded-xl bg-white p-4">
      <div className="flex flex-1 items-end justify-between gap-2">
        <div>
          <Skeleton className="h-16 w-16 rounded-xl md:h-20 md:w-20" />
        </div>

        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-7 w-10" />
          <Skeleton className="h-7 w-20" />
        </div>
      </div>
    </div>
  )
}

type ShoppingSummaryCardsProps = {
  order: OrderData | null
}

function ShoppingSummaryCards({ order }: ShoppingSummaryCardsProps) {
  if (!order || !order.orderdetail) {
    return <ShoppingSummaryCardSkeleton />
  }

  return (
    <main>
      {order.orderdetail.map((item) => (
        <ShoppingSummaryCard detail={item} key={item.id} />
      ))}
    </main>
  )
}

export default ShoppingSummaryCards
