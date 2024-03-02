import { Skeleton } from '@/components/ui/skeleton'
import { OrderData } from '@/services/order'

type OrderSummaryCardProps = {
  order: OrderData | null
}

function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  const totalProductsPrice = order?.totalprice! - order?.totalportage! - order?.discount!
  const totalPortage = order?.totalportage
  const totalPrice = order?.totalprice
  const discount = order?.discount

  return (
    <div className="relative m-4 mt-0 flex flex-col gap-2 rounded-xl bg-white p-4 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-400">商品總金額</span>
        <span>
          <span className="text-lg font-bold">
            {!order ? (
              <Skeleton className="h-7 w-14" />
            ) : (
              `$${totalProductsPrice?.toLocaleString()}`
            )}
          </span>
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-gray-400">運費總金額</span>
          <span className="text-foreground">
            {!order ? <Skeleton className="h-5 w-14" /> : `$${totalPortage?.toLocaleString()}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">優惠折抵</span>
          <span className="text-foreground">
            {!order ? <Skeleton className="h-5 w-14" /> : `-$${discount?.toLocaleString()}`}
          </span>
        </div>

        <div className="flex justify-between border-t pt-2">
          <span className="font-medium text-foreground">總付款金額</span>
          <span className="text-primary">
            <span className="text-lg font-bold">
              {!order ? <Skeleton className="h-7 w-14" /> : `$${totalPrice?.toLocaleString()}`}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummaryCard
