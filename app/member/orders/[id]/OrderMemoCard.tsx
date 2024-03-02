import { Skeleton } from '@/components/ui/skeleton'
import { OrderData } from '@/services/order'

type OrderMemoCardProps = {
  order: OrderData | null
}

function OrderMemoCard({ order }: OrderMemoCardProps) {
  return (
    <div className="relative m-4 mt-0 flex min-h-32 justify-between gap-2 rounded-xl bg-white p-4">
      <span className="text-sm text-gray-400">
        {!order ? <Skeleton className="h-5 w-14" /> : `備註`}
      </span>
      <span className="text-right text-sm">
        {!order ? <Skeleton className="h-5 w-20" /> : order.rmemo || '無'}
      </span>
    </div>
  )
}

export default OrderMemoCard
