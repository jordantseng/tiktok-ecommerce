'use client'

import { useState } from 'react'
import { ChevronRightIcon } from 'lucide-react'
import { useImmer } from 'use-immer'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Counter from '@/components/Counter'
import { cn } from '@/lib/utils'
import BottomDialog from '@/components/BottomDialog'

const SpecDialog = () => {
  const [sizes, updateSizes] = useImmer(['S', 'M', 'L', 'XL'])
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [confirmedItem, updateConfirmedItem] = useImmer<{ size: string; count: number }>({
    size: '',
    count: 0,
  })
  const [count, setCount] = useState(selectedSize === confirmedItem.size ? confirmedItem.count : 1)

  const handleClick = (size: string) => {
    setSelectedSize(size)
    setCount(1)
  }

  const handleClose = () => {
    setIsDialogOpen(false)
    setCount(1)
    setSelectedSize(confirmedItem.size)
  }

  const handleConfirm = () => {
    setIsDialogOpen(false)
    updateConfirmedItem((draft) => {
      draft.size = selectedSize
      draft.count = count
    })
  }

  return (
    <>
      <Card
        className="m-2 cursor-pointer border-none shadow-none"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardContent className="flex justify-between gap-2 p-3">
          <div>
            已選
            {confirmedItem.count !== 0 && (
              <>
                {confirmedItem.size} - x{confirmedItem.count}
              </>
            )}
          </div>
          <ChevronRightIcon />
        </CardContent>
      </Card>
      {isDialogOpen && (
        <BottomDialog title="選擇規格" onClose={handleClose}>
          <div className="mb-2">
            <h5 className="text-md mb-2 flex flex-1 scroll-m-20 justify-start font-normal tracking-tight">
              尺寸
            </h5>
            <div className="grid grid-cols-4 gap-6">
              {sizes.map((size) => (
                <Badge
                  key={size}
                  variant="secondary"
                  className={cn('', {
                    'bg-primary-foreground text-primary outline outline-primary': selectedSize
                      ? selectedSize === size
                      : confirmedItem?.size === size,
                  })}
                  onClick={() => handleClick(size)}
                >
                  {size || confirmedItem?.size}
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
              onChange={(count) => setCount(count)}
            />
          </div>
          <div className="flex">
            <Button
              className="flex-grow rounded-full text-white hover:bg-red-600"
              type="button"
              onClick={handleConfirm}
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
