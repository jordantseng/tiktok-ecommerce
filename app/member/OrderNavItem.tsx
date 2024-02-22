import { ReactNode } from 'react'
import IconCard from '@/components/IconCard'

type OrderNavItemProps = {
  title: string
  Icon: ReactNode
  count: number
  onClick: () => void
}

function OrderNavItem({ title, Icon, count, onClick }: OrderNavItemProps) {
  return (
    <div className="relative grid place-items-center" key={title}>
      <span className="relative flex">
        <IconCard title={title} Icon={Icon} onClick={onClick} />
        {count > 0 && (
          <div className="absolute -end-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white">
            {count}
          </div>
        )}
      </span>
    </div>
  )
}

export default OrderNavItem
