'use client'

import { PropsWithChildren } from 'react'

import NoOrder from '@/app/member/orders/NoOrder'
import { useOrderContext } from '@/context/OrderContext'
import { OrderCardSkeleton } from '@/app/member/orders/OrderCard'

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
