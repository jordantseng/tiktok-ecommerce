import { cn } from '@/lib/utils'

type IconCardProps = {
  title: string
  Icon: React.ReactNode
  isActive?: boolean
}

const IconCard = ({ title, Icon, isActive = false }: IconCardProps) => {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className={`${isActive ? 'text-primary' : ''}`}>{Icon}</div>
      <h4
        className={`${cn('md:text-md mb-2 scroll-m-20 text-sm font-normal md:tracking-wider', {
          'text-primary': isActive,
        })}`}
      >
        {title}
      </h4>
    </div>
  )
}

export default IconCard
