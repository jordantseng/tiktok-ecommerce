'use client'

import { FC, PropsWithChildren } from 'react'
import { ScrollText } from 'lucide-react'
import Image from 'next/image'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Title from '@/components/Title'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { orderStatusMap } from '@/constants/order'
import { useOrderContext } from '@/context/OrderContext'
import { Skeleton } from '@/components/ui/skeleton'
import {
  OrderStatus,
  filterOrderByStatus,
  getFormatDate,
  getOrderStatusTitle,
} from '@/services/order'
import { OrderData } from '@/services/order'
import { cn } from '@/lib/utils'

type ButtonProps = {
  children: string
  onClick: () => void
}

const PrimaryButton = ({ children, onClick }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="min-w-20 rounded-3xl border border-primary p-2 text-primary hover:bg-primary-foreground hover:text-primary"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

const SecondaryButton = ({ children, onClick }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="hover:whit-blue-400 min-w-20 rounded-3xl border border-blue-400 p-2 text-blue-400 hover:bg-blue-100 hover:text-blue-400"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

const CommonButton = ({ children, onClick }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="min-w-20 rounded-3xl border border-foreground p-2 text-foreground hover:border-gray-500 hover:bg-gray-100 hover:text-gray-500"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

type ButtonType = 'primary' | 'secondary' | 'common'

type ButtonMap = Record<ButtonType, FC<ButtonProps>>

type Action = {
  label: string
  onClick: () => void
  type: 'primary' | 'secondary' | 'common'
}

type OrderCardProps = {
  order: OrderData
  status?: OrderStatus | 'all'
}

const buttonMap: ButtonMap = {
  primary: PrimaryButton,
  secondary: SecondaryButton,
  common: CommonButton,
}

const OrderCard = ({ order, status = 'all' }: OrderCardProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createDate = getFormatDate(order.created_at!)
  const orderStatus = getOrderStatusTitle(order)
  const totalprice = order.totalprice?.toLocaleString()

  const handlePay = () => {
    const newSearchPamras = new URLSearchParams(searchParams)

    router.push(`/member/orders/detail?${newSearchPamras.toString()}`)
  }

  const handleContact = () => {}
  const handleBuyAgain = () => {}
  const handleConfirmReceipt = () => {}
  const handleCheckLogistics = () => {}
  const handleCheckRefund = () => {}
  const handleRemindShipping = () => {}

  const actions: Record<typeof status, Action[]> = {
    all: [
      { label: '付款', onClick: handlePay, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
    receipt: [
      { label: '再來一單', onClick: handleBuyAgain, type: 'common' },
      { label: '確認收貨', onClick: handleConfirmReceipt, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
    checkout: [
      { label: '付款', onClick: handlePay, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
    shipping: [
      { label: '提醒發貨', onClick: handleRemindShipping, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
    receipted: [
      { label: '查看物流', onClick: handleCheckLogistics, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
    refunded: [
      { label: '查看退款', onClick: handleCheckRefund, type: 'primary' },
      { label: '與我聯絡', onClick: handleContact, type: 'secondary' },
    ],
  }

  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between border-b border-default pb-4 text-sm font-normal">
            <span className="text-gray-500">{createDate}</span>
            <p className="text-primary">{orderStatus}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p>生鮮超市</p>
          <div className="flex items-end justify-between">
            <div className="flex gap-4">
              <div className="rounded-xl bg-default p-4">
                <Image
                  width={100}
                  height={100}
                  className="md:h-25 md:w-25 h-10 w-10"
                  src="https://img.freepik.com/free-psd/grape-fruits-isolated-transparent-background_191095-14703.jpg?w=1060&t=st=1707652451~exp=1707653051~hmac=65ed420c75cf93ae28e14b5f563205eff39194d323cb73ba78e7fae7fd00612d"
                  alt="蘋果"
                />
              </div>
              <div className="rounded-xl bg-default p-4">
                <Image
                  width={100}
                  height={100}
                  className="md:h-25 md:w-25 h-10 w-10"
                  src="https://img.freepik.com/free-psd/grape-fruits-isolated-transparent-background_191095-14703.jpg?w=1060&t=st=1707652451~exp=1707653051~hmac=65ed420c75cf93ae28e14b5f563205eff39194d323cb73ba78e7fae7fd00612d"
                  alt="蘋果"
                />
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 text-sm">
              <span className="text-gray-400">共 2 件</span>
              <span>
                合計：$
                <span className="text-xl font-bold">{totalprice}</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <span
          className={cn('grid gap-2', {
            'grid-cols-2': actions[status].length === 2,
            'grid-cols-3': actions[status].length === 3,
          })}
        >
          {actions[status].map(({ type, label, onClick }, index) => {
            const ButtonComponent = buttonMap[type]
            return (
              <ButtonComponent key={index} onClick={onClick}>
                {label}
              </ButtonComponent>
            )
          })}
        </span>
      </CardFooter>
    </Card>
  )
}

const OrderCardSkeleton = () => {
  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between border-b border-default pb-4 text-sm font-normal">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-20" />
          <div className="flex items-end justify-between">
            <span className="flex gap-4">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <Skeleton className="h-16 w-16 rounded-lg" />
            </span>
            <span className="flex flex-col items-end gap-4">
              <Skeleton className="h-5 w-10" />
              <Skeleton className="h-5 w-20" />
            </span>
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
}

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

const NoOrder = () => {
  return (
    <div className="m-auto flex flex-1 flex-col items-center justify-center gap-8">
      <ScrollText color="#e8dad9" size={100} />
      <h4 className="text-center text-gray-500">抱歉，沒有找到訂單哦！</h4>
    </div>
  )
}

const AllOrders = () => {
  const { orders } = useOrderContext()
  return (
    <OrdersContainer>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </OrdersContainer>
  )
}

const CheckoutOrders = () => {
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

const ShippingOrders = () => {
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

const ReceiptOrders = () => {
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

const ReceiptedOrders = () => {
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

const RefundedOrders = () => {
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

const OrdersPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')!

  const handleTabChange = (value: string) => {
    const newSearchPamras = new URLSearchParams(searchParams)
    newSearchPamras.set('type', value)
    router.push(`/member/orders?${newSearchPamras.toString()}`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-default">
      <Title title="訂單" goBackUrl="/member" />

      <div className="flex flex-1">
        <Tabs
          value={type}
          defaultValue="all"
          className="flex flex-1 flex-col overflow-x-auto"
          onValueChange={handleTabChange}
        >
          <TabsList className="sticky top-0 flex justify-center gap-10 bg-white pb-2 md:justify-start md:pl-4">
            <TabsTrigger className="w-4 hover:text-primary" value="all">
              全部
            </TabsTrigger>
            {Object.values(orderStatusMap).map(({ value, nav }) => (
              <TabsTrigger key={value} className="w-4 hover:text-primary" value={value}>
                {nav.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent className="flex-1" value="all">
            <AllOrders />
          </TabsContent>
          <TabsContent className="flex-1" value={orderStatusMap.checkout.value}>
            <CheckoutOrders />
          </TabsContent>
          <TabsContent className="flex-1" value={orderStatusMap.shipping.value}>
            <ShippingOrders />
          </TabsContent>
          <TabsContent className="flex-1" value={orderStatusMap.receipt.value}>
            <ReceiptOrders />
          </TabsContent>
          <TabsContent className="flex-1" value={orderStatusMap.receipted.value}>
            <ReceiptedOrders />
          </TabsContent>
          <TabsContent className="flex-1" value={orderStatusMap.refunded.value}>
            <RefundedOrders />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default OrdersPage
