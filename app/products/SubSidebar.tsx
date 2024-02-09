'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type SubSidebarProps = {
  isOpen: boolean
  subSidebarItems: any // TODO: need backend data
  onClick: (title: string) => void
  onSidebarOpen: () => void
}

const SubSidebar = ({ subSidebarItems, isOpen, onSidebarOpen, onClick }: SubSidebarProps) => {
  const searchParams = useSearchParams()

  const subType = searchParams.get('subType')

  console.log(subType)

  return (
    <div className="sticky top-[68px] z-20">
      <div className="relative z-30 flex h-14 items-center justify-between gap-2 bg-white px-2">
        {isOpen ? (
          <h4 className="flex items-center text-sm font-normal tracking-tight">全部分類</h4>
        ) : (
          <div className="flex gap-2 overflow-x-scroll">
            {/* TODO: need backend data */}
            {subSidebarItems.map((item: any) => (
              <Badge
                key={item.id}
                variant={subType === item.title ? 'primary' : 'secondary'}
                className={cn('text-nowrap px-2 py-1 text-xs', {
                  'font-semibold': subType === item.title,
                })}
                onClick={() => onClick(item.title)}
              >
                {item.title}
              </Badge>
            ))}
          </div>
        )}
        <button className="text-primary" onClick={onSidebarOpen}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-14 grid w-full grid-cols-2 gap-4 bg-white px-2 pb-2 md:grid-cols-3">
          {/* TODO: need backend data */}
          {subSidebarItems.map((item: any) => (
            <Badge
              key={item.id}
              variant={subType === item.title ? 'primary' : 'secondary'}
              className={cn('text-nowrap px-2 py-1 text-xs', {
                'font-semibold': subType === item.title,
              })}
              onClick={() => onClick(item.title)}
            >
              {item.title}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

export default SubSidebar
