import { ChevronRight, MapPin } from 'lucide-react'

import { OrderData } from '@/services/order'
import { Skeleton } from '@/components/ui/skeleton'

type RecipientCardProps = {
  order: OrderData | null
}

function RecipientCard({ order }: RecipientCardProps) {
  return (
    <div className="relative -top-24 m-4 flex min-h-28 flex-col gap-2 rounded-xl bg-white p-4">
      <div className="flex flex-1 justify-between">
        <span className="flex flex-1 cursor-pointer items-center justify-between gap-2">
          <div className="h-full">
            <MapPin color="#f74843" className="mt-4" />
          </div>

          <div className="flex flex-1 flex-col items-start justify-between gap-2 text-foreground">
            {!order ? (
              <Skeleton className="h-6 w-64" />
            ) : (
              <span className="font-medium">{order.raddress}</span>
            )}
            {!order ? (
              <Skeleton className="h-5 w-32" />
            ) : (
              <div className="flex gap-2 text-sm text-gray-400">
                <span>{order.rname}</span>
                <span>{order.rtel}</span>
              </div>
            )}
          </div>

          {!order ? <Skeleton className="h-5 w-5" /> : <ChevronRight />}
        </span>
      </div>
    </div>
  )
}

export default RecipientCard
