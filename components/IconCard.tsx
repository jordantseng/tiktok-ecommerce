import Image from 'next/image'

import { cn } from '@/lib/utils'

type IconCardProps = {
  title: string
  isActive?: boolean
  Icon?: React.ReactNode
  imgUrl?: string
  onClick?: () => void
}

const IconCard = ({ title, isActive, Icon, imgUrl, onClick }: IconCardProps) => {
  return (
    <div
      className={cn('flex flex-col items-center justify-between transition-all', {
        'cursor-pointer hover:text-primary': !!onClick,
      })}
      onClick={onClick}
    >
      {Icon && <div className={`${isActive ? 'text-primary' : ''}`}>{Icon}</div>}
      {imgUrl && (
        <div className="relative size-14">
          <Image className="rounded-lg object-cover" src={imgUrl} fill alt={title} />
        </div>
      )}
      <h4
        className={cn(
          'md:text-md mb-2 scroll-m-20 text-sm font-normal text-gray-500 md:tracking-wider',
          {
            'text-primary': isActive,
          },
        )}
      >
        {title}
      </h4>
    </div>
  )
}

export default IconCard
