import { Skeleton } from '@/components/ui/skeleton'
import { useContactContext } from '@/context/ContactContext'
import { FeedbackData } from '@/services/feedback'
import { OrderData } from '@/services/order'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'

type OrderMemoCardProps = {
  order: OrderData | null
}

function OrderMemoCard({ order }: OrderMemoCardProps) {
  const { handleGetContactById } = useContactContext()
  const [memo, setMemo] = useImmer<FeedbackData[]>([])

  useEffect(() => {
    const initialData = async () => {
      if (order?.id) {
        const res = await handleGetContactById(order.id)
        setMemo(res)
      }
    }
    initialData()
  }, [handleGetContactById, order, setMemo])

  return (
    <div className="relative m-4 mt-0 flex min-h-32 justify-between gap-2 rounded-xl bg-white p-4">
      <span className="text-sm text-gray-400">
        {!order ? <Skeleton className="h-5 w-14" /> : `備註`}
      </span>
      <span className="text-right text-sm">
        {!order ? <Skeleton className="h-5 w-20" /> : order.rmemo || memo?.[0]?.memo || '無'}
      </span>
    </div>
  )
}

export default OrderMemoCard
