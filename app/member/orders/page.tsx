import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Title from '@/components/Title'

const OrderPages = () => {
  return (
    <main className="mb-16 min-h-screen bg-default">
      <Title title="訂單" goBackUrl="/member" />
      <div className="flex min-h-screen">
        <Tabs defaultValue="all" className="w-full overflow-x-auto">
          <TabsList className="flex justify-center gap-10 md:justify-start">
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

          <TabsContent value="all">
            <div>全部訂單</div>
          </TabsContent>
          <TabsContent value="checkout">
            <div>待付款</div>
          </TabsContent>
          <TabsContent value="shipping">
            <div>待發貨</div>
          </TabsContent>
          <TabsContent value="receipt">
            <div>待收貨</div>
          </TabsContent>
          <TabsContent value="comment">
            <div>待評價</div>
          </TabsContent>
          <TabsContent value="refund">
            <div>退款/收貨</div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default OrderPages
