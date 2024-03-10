import { ChevronRight, Truck } from 'lucide-react'

import { OrderData, getFormatDate } from '@/services/order'
import { Skeleton } from '@/components/ui/skeleton'

type ShippingStatusCardProps = {
  order: OrderData | null
}

function ShippingStatusCard({ order }: ShippingStatusCardProps) {
  return (
    <div className="flex min-h-[104px] flex-1 justify-between rounded-xl bg-white p-4">
      <span className="flex flex-1 cursor-pointer items-center justify-between gap-2">
        <div className="h-full">
          {!order ? <Skeleton className="h-6 w-6" /> : <Truck color="#f74843" className="" />}
        </div>

        <div className="flex flex-1 flex-col items-start justify-between gap-2 text-foreground">
          {!order ? (
            <Skeleton className="h-6 w-64" />
          ) : (
            <span className="text-sm text-gray-700">
              {order.CVSAddress} - {order.CVSStoreName}
            </span>
          )}
          {!order ? (
            <Skeleton className="h-5 w-32" />
          ) : (
            <div className="flex gap-2 text-sm text-gray-400">
              {getFormatDate(order.updated_at!)}
            </div>
          )}
        </div>

        {!order ? <Skeleton className="h-5 w-5" /> : <ChevronRight />}
      </span>
    </div>
  )
}

export default ShippingStatusCard
