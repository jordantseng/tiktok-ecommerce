'use client'

import { useState } from 'react'
import { ChevronRightIcon } from 'lucide-react'
import { useImmer } from 'use-immer'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Counter from '@/components/Counter'
import BottomDialog from '@/components/BottomDialog'
import { cn } from '@/lib/utils'

type SpecDialogProps = {
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
  onConfirm: () => void
}

const SpecDialog = ({
  specs,
  confirmedItem,
  open,
  selectedSize,
  count,
  onCountChange,
  onClose,
  onSpecSelect,
  onConfirm,
}: SpecDialogProps) => {
  return (
    <>
      {open && (
        <BottomDialog title="選擇規格" onClose={onClose}>
          <div className="mb-2">
            <h5 className="text-md mb-2 flex flex-1 scroll-m-20 justify-start font-normal tracking-tight">
              尺寸
            </h5>
            <div className="grid grid-cols-4 gap-6">
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
          <div className="flex">
            <Button
              className="flex-grow rounded-full text-white hover:bg-red-600"
              type="button"
              onClick={onConfirm}
            >
              確認
            </Button>
          </div>
        </BottomDialog>
      )}
    </>
  )
}

export default SpecDialog
