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
          <Skeleton className="h-12 w-12" />
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
