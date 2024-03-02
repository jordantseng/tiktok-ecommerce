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
  const checkoutOrders = filterOrderByStatus('checkout', orders)
  return (
    <OrdersContainer>
      {checkoutOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
      {checkoutOrders.length === 0 && <NoOrder />}
    </OrdersContainer>
  )
}

export const ShippingOrders = () => {
  const { orders } = useOrderContext()
  const shippingOrders = filterOrderByStatus('shipping', orders)
  return (
    <OrdersContainer>
      {shippingOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
      {shippingOrders.length === 0 && <NoOrder />}
    </OrdersContainer>
  )
}

export const ReceiptOrders = () => {
  const { orders } = useOrderContext()
  const receiptOrders = filterOrderByStatus('receipt', orders)
  return (
    <OrdersContainer>
      {receiptOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
      {receiptOrders.length === 0 && <NoOrder />}
    </OrdersContainer>
  )
}

export const ReceiptedOrders = () => {
  const { orders } = useOrderContext()
  const receiptedOrders = filterOrderByStatus('receipted', orders)
  return (
    <OrdersContainer>
      {receiptedOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
      {receiptedOrders.length === 0 && <NoOrder />}
    </OrdersContainer>
  )
}

export const RefundedOrders = () => {
  const { orders } = useOrderContext()
  const refundedOrders = filterOrderByStatus('refunded', orders)
  return (
    <OrdersContainer>
      {refundedOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
      {refundedOrders.length === 0 && <NoOrder />}
    </OrdersContainer>
  )
}
