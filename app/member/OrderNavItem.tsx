import { ReactNode } from 'react'
import IconCard from '@/components/IconCard'
import { Skeleton } from '@/components/ui/skeleton'

type OrderNavItemProps = {
  title: string
  Icon?: ReactNode
  count?: number
  onClick?: () => void
  isLoading?: boolean
}

function OrderNavItem({ title, Icon, count, isLoading, onClick }: OrderNavItemProps) {
  return (
    <div className="relative grid place-items-center" key={title}>
      <span className="relative flex">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-1">
            <Skeleton className="h-10 w-10 rounded-2xl" />
            <Skeleton className="h-4 w-10" />
          </div>
        ) : (
          <>
            <IconCard title={title} Icon={Icon} onClick={onClick} />
            {Number(count) > 0 && (
              <div className="absolute -end-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white">
                {count}
              </div>
            )}
          </>
        )}
      </span>
    </div>
  )
}

export default OrderNavItem
