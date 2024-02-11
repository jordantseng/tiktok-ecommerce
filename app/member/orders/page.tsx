import { ScrollText } from 'lucide-react'
import Image from 'next/image'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Title from '@/components/Title'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const OrderCard = () => {
  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between border-b border-default pb-4 text-sm font-normal">
            <span className="text-gray-500">2021.12.27 12:23</span>
            <p className="text-primary">待付款</p>
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
                <span className="text-xl font-bold">1,000</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <span className="grid grid-cols-2 gap-4">
          <Button
            variant="ghost"
            className="rounded-3xl border border-gray-400 p-2 text-gray-400 hover:text-gray-400"
          >
            取消訂單
          </Button>
          <Button
            variant="ghost"
            className="rounded-3xl border border-primary p-2 text-primary hover:bg-primary-foreground hover:text-primary"
          >
            去支付
          </Button>
        </span>
      </CardFooter>
    </Card>
  )
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
  return (
    <div className="flex h-full">
      <NoOrder />
    </div>
  )
}

const CheckoutOrders = () => {
  return (
    <div className="flex h-full flex-col p-4">
      <OrderCard />
    </div>
  )
}

const ShippingOrders = () => {
  return (
    <div className="flex h-full flex-col p-4">
      <OrderCard />
    </div>
  )
}

const ReceiptOrders = () => {
  return (
    <div className="flex h-full flex-col p-4">
      <OrderCard />
    </div>
  )
}

const CommentOrders = () => {
  return (
    <div className="flex h-full flex-col p-4">
      <OrderCard />
    </div>
  )
}

const RefundOrders = () => {
  return (
    <div className="flex h-full flex-col p-4">
      <OrderCard />
    </div>
  )
}

const OrderPages = () => {
  return (
    <main className="flex min-h-screen flex-col bg-default">
      <Title title="訂單" goBackUrl="/member" />

      <div className="flex flex-1">
        <Tabs defaultValue="all" className="flex flex-1 flex-col overflow-x-auto">
          <TabsList className="flex justify-center gap-10 bg-white pb-2 md:justify-start md:pl-4">
            <TabsTrigger className="w-4 hover:text-primary" value="all">
              全部
            </TabsTrigger>
            <TabsTrigger className="w-4 hover:text-primary" value="checkout">
              待付款
            </TabsTrigger>
            <TabsTrigger className="w-4 hover:text-primary" value="shipping">
              待發貨
            </TabsTrigger>
            <TabsTrigger className="w-4 hover:text-primary" value="receipt">
              待收貨
            </TabsTrigger>
            <TabsTrigger className="w-4 hover:text-primary" value="comment">
              待評價
            </TabsTrigger>
            <TabsTrigger className="w-4 hover:text-primary" value="refund">
              退款/收貨
            </TabsTrigger>
          </TabsList>

          <TabsContent className="flex-1" value="all">
            <AllOrders />
          </TabsContent>
          <TabsContent className="flex-1" value="checkout">
            <CheckoutOrders />
          </TabsContent>
          <TabsContent className="flex-1" value="shipping">
            <ShippingOrders />
          </TabsContent>
          <TabsContent className="flex-1" value="receipt">
            <ReceiptOrders />
          </TabsContent>
          <TabsContent className="flex-1" value="comment">
            <CommentOrders />
          </TabsContent>
          <TabsContent className="flex-1" value="refund">
            <RefundOrders />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default OrderPages
