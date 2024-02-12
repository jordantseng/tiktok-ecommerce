'use client'

import { ChangeEvent, MouseEvent } from 'react'
import { useImmer } from 'use-immer'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import BottomDialog from '@/components/BottomDialog'

const FilterDialog = () => {
  const [categories, updateCategories] = useImmer([
    { id: 1, title: '水果' },
    { id: 2, title: '堅果' },
    { id: 3, title: '零食' },
    { id: 4, title: '零食' },
    { id: 5, title: '零食' },
    { id: 6, title: '零食' },
  ])
  const [selectedCategoryIds, updateSelectedCategoryIds] = useImmer<number[]>([])
  const [price, updatePrice] = useImmer({ minPrice: 0, maxPrice: 0 })

  const router = useRouter()
  const searchParams = useSearchParams()

  const filter = searchParams.get('filter')

  const handleClose = () => {
    const params = new URLSearchParams(searchParams)

    if (filter) {
      params.delete('filter')
    }

    router.push(`/search/?${params.toString()}`)
  }

  const handleClick = (id: number) => {
    updateSelectedCategoryIds((draft) => {
      const index = draft.findIndex((selectedId) => selectedId === id)

      index === -1 ? draft.push(id) : draft.splice(index, 1)
    })
  }

  const handleMinPriceChange =
    (priceType: 'minPrice' | 'maxPrice') => (e: ChangeEvent<HTMLInputElement>) => {
      updatePrice((draft) => {
        draft[priceType] = Number(e.target.value)
      })
    }

  const handleReset = (e: MouseEvent) => {
    e.preventDefault()

    updatePrice((draft) => {
      draft.minPrice = 0
      draft.maxPrice = 0
    })

    updateSelectedCategoryIds((draft) => {
      draft.length = 0
    })
  }

  return (
    <BottomDialog className="h-[360px]" title="全部篩選" onClose={handleClose}>
      <div className="mb-2">
        <h5 className="text-md mb-2 flex flex-1 scroll-m-20 justify-start font-normal tracking-tight">
          類別
        </h5>
        <div className="grid grid-cols-3 gap-6">
          {categories.map((category) => (
            <Badge
              key={category.id}
              className={cn('', {
                'bg-primary-foreground text-primary outline outline-primary':
                  selectedCategoryIds.includes(category.id),
              })}
              onClick={() => handleClick(category.id)}
            >
              {category.title}
            </Badge>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h5 className="text-md mb-2 flex flex-1 scroll-m-20 justify-start font-normal tracking-tight">
          價格
        </h5>
        <div className="flex items-center gap-2">
          <Input
            placeholder="自定義最低金額"
            value={price.minPrice}
            type="number"
            min={0}
            onChange={handleMinPriceChange('minPrice')}
          />
          <div>-</div>
          <Input
            value={price.maxPrice}
            placeholder="自定義最高金額"
            type="number"
            onChange={handleMinPriceChange('maxPrice')}
          />
        </div>
      </div>
      <div className="flex">
        <Button
          className="flex-grow rounded-l-full bg-red-400/80 text-white hover:bg-red-500/80"
          type="button"
          onClick={handleReset}
        >
          重置
        </Button>
        <Button className="flex-grow rounded-r-full hover:bg-red-600">查看商品</Button>
      </div>
    </BottomDialog>
  )
}

export default FilterDialog
