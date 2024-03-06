'use client'

import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'
import { OrderData, OrderSpec } from '@/services/order'
import { PropsWithChildren } from 'react'

function CardContainer({ children }: PropsWithChildren) {
  return <div className="relative m-4 flex flex-col gap-2 rounded-xl bg-white p-4">{children}</div>
}

type ShoppingItemCardProps = {
  detail: OrderSpec
}

function ShoppingItemCard({ detail }: ShoppingItemCardProps) {
  return (
    <div className="flex flex-1 items-end justify-between">
      <span className="flex items-center gap-4">
        <div className="rounded-xl bg-background p-4">
          {Array.isArray(detail.imgs) && detail.imgs[0] ? (
            <Image
              width={100}
              height={100}
              className="md:h-25 md:w-25 h-10 w-10"
              src={detail.imgs[0]}
              alt={detail.product_title}
            />
          ) : (
            <div className="md:h-25 md:w-25 h-10 w-10" />
          )}
        </div>
        {/* <div className="grid grid-cols-3 gap-2">
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
        </div> */}

        <div className="flex-1 text-sm">
          <span>{detail.product_title}</span>
          <div className="flex flex-col text-gray-500">
            <span>規格：{detail.productitem_title}</span>
            <span>數量：{detail.qty}份</span>
          </div>
        </div>
      </span>

      <span className="text-lg font-bold">${detail.price.toLocaleString()}</span>
    </div>
  )
}

function ShoppingItemCardSkeleton() {
  return (
    <div className="flex flex-1 items-end justify-between gap-2">
      <div className="rounded-xl bg-background p-4">
        <Skeleton className="md:h-25 md:w-25 h-10 w-10" />
      </div>

      <div className="flex flex-1 flex-col gap-2 text-sm">
        <Skeleton className="h-5 w-40" />
        <div className="flex flex-col gap-2 text-gray-500">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      <Skeleton className="h-7 w-10" />
    </div>
  )
}

type ShoppingItemCardsProps = {
  order: OrderData | null
}

function ShoppingItemCards({ order }: ShoppingItemCardsProps) {
  if (!order || !order.orderdetail) {
    return (
      <CardContainer>
        <ShoppingItemCardSkeleton />
      </CardContainer>
    )
  }

  return order.orderdetail.map((item) => (
    <CardContainer key={item.id}>
      <ShoppingItemCard detail={item} />
    </CardContainer>
  ))
}

export { ShoppingItemCard }
export default ShoppingItemCards
