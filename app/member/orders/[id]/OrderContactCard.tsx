'use client'

import MessageItem from '@/components/MessageItem'
import { Skeleton } from '@/components/ui/skeleton'
import { useContactContext } from '@/context/ContactContext'
import { FeedbackData } from '@/services/feedback'
import { OrderData } from '@/services/order'
import { useCallback, useEffect } from 'react'
import { useImmer } from 'use-immer'

type OrderMemoCardProps = {
  order: OrderData | null
}

function OrderContactCard({ order }: OrderMemoCardProps) {
  const {
    handleGetContactById,
    handleContactMessageChange,
    handleResetMessage,
    handleContactSubmit,
    contactMessage,
    handleSelectOrder,
  } = useContactContext()

  const [memo, setMemo] = useImmer<FeedbackData[]>([])

  const initialData = useCallback(async () => {
    const res = await handleGetContactById(Number(order!.id))
    setMemo(res)
  }, [handleGetContactById, order, setMemo])

  const handleMessage = async () => {
    await handleContactSubmit()
    handleResetMessage()
    initialData()
  }

  useEffect(() => {
    if (order?.id) {
      handleSelectOrder(order)
      initialData()
    }
  }, [order])

  return (
    <div className="relative mt-0 flex min-h-32 flex-col justify-between bg-default">
      {!order ? (
        <Skeleton className="h-5 w-14" />
      ) : (
        <>
          <MessageItem
            self={true}
            editable={true}
            msg={contactMessage}
            onChange={handleContactMessageChange}
            onSubmit={handleMessage}
          />
          {memo.map((opt) => (
            <div key={opt.id}>
              {opt.rebody && <MessageItem msg={opt.rebody} />}
              <MessageItem msg={opt.memo} self={true} />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default OrderContactCard
