'use client'

import OrderCard from '@/app/member/orders/OrderCard'
import OrdersContainer from '@/app/member/orders/OrdersContainer'
import NoOrder from '@/app/member/orders/NoOrder'
import { useOrderContext } from '@/context/OrderContext'
import { filterOrderByStatus } from '@/services/order'

export const AllOrders = () => {
  const { orders } = useOrderContext()
  return (
    <OrdersContainer>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </OrdersContainer>
  )
}

export const CheckoutOrders = () => {
  const { orders } = useOrderContext()
  const status = 'checkout'
  const checkoutOrders = filterOrderByStatus(status, orders)
  return (
    <OrdersContainer>
      {checkoutOrders.map((order) => (
        <OrderCard key={order.id} order={order} status={status} />
      ))}
      {checkoutOrders.length === 0 && <NoOrder />}
    </OrdersContainer>
  )
}

export const ShippingOrders = () => {
  const { orders } = useOrderContext()
  const status = 'shipping'
  const shippingOrders = filterOrderByStatus(status, orders)
  return (
    <OrdersContainer>
      {shippingOrders.map((order) => (
        <OrderCard key={order.id} order={order} status={status} />
      ))}
      {shippingOrders.length === 0 && <NoOrder />}
    </OrdersContainer>
  )
}

export const ReceiptOrders = () => {
  const { orders } = useOrderContext()
  const status = 'receipt'
  const receiptOrders = filterOrderByStatus(status, orders)
  return (
    <OrdersContainer>
      {receiptOrders.map((order) => (
        <OrderCard key={order.id} order={order} status={status} />
      ))}
      {receiptOrders.length === 0 && <NoOrder />}
    </OrdersContainer>
  )
}

export const ReceiptedOrders = () => {
  const { orders } = useOrderContext()
  const status = 'receipted'
  const receiptedOrders = filterOrderByStatus(status, orders)
  return (
    <OrdersContainer>
      {receiptedOrders.map((order) => (
        <OrderCard key={order.id} order={order} status={status} />
      ))}
      {receiptedOrders.length === 0 && <NoOrder />}
    </OrdersContainer>
  )
}

export const RefundedOrders = () => {
  const { orders } = useOrderContext()
  const status = 'refunded'
  const refundedOrders = filterOrderByStatus(status, orders)
  return (
    <OrdersContainer>
      {refundedOrders.map((order) => (
        <OrderCard key={order.id} order={order} status={status} />
      ))}
      {refundedOrders.length === 0 && <NoOrder />}
    </OrdersContainer>
  )
}
