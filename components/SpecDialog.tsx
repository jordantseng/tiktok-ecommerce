'use client'

import { Badge } from '@/components/ui/badge'
import Counter from '@/components/Counter'
import BottomDialog from '@/components/BottomDialog'
import { cn } from '@/lib/utils'

type SpecDialogProps = {
  unitTitle?: string
  specs: { id: number; title: string }[]
  confirmedItem: {
    id: string
    size: string
    count: number
  }
  selectedSize: {
    id: string
    size: string
  } | null
  count: number
  onSpecSelect: ({ id, size }: { id: string; size: string }) => void
  open: boolean
  onClose: () => void
  onCountChange: (count: number) => void
  className?: string
  Image?: React.ReactNode
  Actions?: React.ReactNode
}

const SpecDialog = ({
  unitTitle = '',
  specs,
  confirmedItem,
  open,
  selectedSize,
  count,
  onCountChange,
  onClose,
  onSpecSelect,
  className,
  Image,
  Actions,
}: SpecDialogProps) => {
  if (!open) {
    return null
  }

  return (
    <>
      <BottomDialog className={className} title="選擇規格" onClose={onClose}>
        {Image}
        <div className="mb-2">
          <h5 className="text-md mb-2 flex flex-1 scroll-m-20 justify-start font-normal tracking-tight">
            {unitTitle}
          </h5>
          <div className="flex flex-wrap gap-2">
            {specs.map((spec) => (
              <Badge
                key={spec.id}
                variant="secondary"
                className={cn('', {
                  'bg-primary-foreground text-primary outline outline-primary': selectedSize
                    ? selectedSize.size === spec.title
                    : confirmedItem?.size === spec.title,
                })}
                onClick={() => onSpecSelect({ id: String(spec.id), size: spec.title })}
              >
                {spec.title}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <h5 className="text-md mb-2 flex flex-1 scroll-m-20 justify-start font-normal tracking-tight">
            選擇數量
          </h5>
          <Counter
            value={count}
            isLeftCounterDisabled={count === 0}
            onChange={(count) => onCountChange(count)}
          />
        </div>
        {Actions}
      </BottomDialog>
    </>
  )
}

export default SpecDialog
