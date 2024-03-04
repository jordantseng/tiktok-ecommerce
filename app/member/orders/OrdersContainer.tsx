'use client'

import { PropsWithChildren } from 'react'

import NoOrder from '@/app/member/orders/NoOrder'
import { useOrderContext } from '@/context/OrderContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const OrderCardSkeleton = () => (
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
          <Skeleton className="h-5 w-10" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-end">
      <span className="grid grid-cols-2 gap-2">
        <Skeleton className="h-10 w-20 rounded-full" />
        <Skeleton className="h-10 w-20 rounded-full" />
      </span>
    </CardFooter>
  </Card>
)

const OrdersContainer = ({ children }: PropsWithChildren) => {
  const { orders, isLoadingOrders } = useOrderContext()

  function renderContent() {
    if (isLoadingOrders) {
      return Array(5)
        .fill(null)
        .map((_, index) => <OrderCardSkeleton key={index} />)
    }
    if (orders.length === 0) {
      return <NoOrder />
    }
    return children
  }

  return <div className="flex h-full flex-col gap-4 p-4">{renderContent()}</div>
}

export default OrdersContainer
