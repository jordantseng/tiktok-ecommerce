'use client'

import Image from 'next/image'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { OrderData, OrderDetail, OrderStatusTitle, getFormatDate } from '@/services/order'
import { CommonButton, PrimaryButton } from '../Buttons'

type ShoppingSummaryActionCardProps = {
  detail: OrderDetail
  title: OrderStatusTitle
  onClick?: (detail: OrderDetail) => void
}

function ShoppingSummaryActionCard({ detail, title, onClick }: ShoppingSummaryActionCardProps) {
  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between border-b border-background pb-4 text-sm font-normal">
            <span>{detail.updated_at && getFormatDate(detail.updated_at)}</span>
            <span className="text-primary">{title}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-1 items-end justify-between gap-2">
            {detail.imgs.map((img, index) => (
              <div key={index} className="rounded-xl bg-background p-4">
                <Image
                  width={100}
                  height={100}
                  className="md:h-25 md:w-25 h-10 w-10"
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
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {typeof onClick === 'function' && title === '已收貨' && (
          <CommonButton onClick={() => onClick(detail)}>再買一次</CommonButton>
        )}
        {typeof onClick === 'function' && title === '已退款' && (
          <PrimaryButton onClick={() => onClick(detail)}>查看退款</PrimaryButton>
        )}
      </CardFooter>
    </Card>
  )
}

function ShoppingSummaryActionCardSkeleton() {
  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between border-b border-background pb-4 text-sm font-normal">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <Skeleton className="h-[72px] w-[72px] rounded-xl" />
            <div>
              <Skeleton className="h-5 w-20" />
              <Skeleton className="mt-2 h-5 w-20" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Skeleton className="h-10 w-20 rounded-full" />
      </CardFooter>
    </Card>
  )
}

type ShoppingSummaryActionCardsProps = {
  order: OrderData | null
  title: OrderStatusTitle | null
  onClick?: (detail: OrderDetail) => void
}

function ShoppingSummaryActionCards({ order, title, onClick }: ShoppingSummaryActionCardsProps) {
  if (!order || !order.orderdetail || !title) {
    return <ShoppingSummaryActionCardSkeleton />
  }

  return order.orderdetail.map((item) => (
    <ShoppingSummaryActionCard detail={item} key={item.id} title={title} onClick={onClick} />
  ))
}

export default ShoppingSummaryActionCards
