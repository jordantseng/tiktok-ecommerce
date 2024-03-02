'use client'

import { ChangeEvent, MouseEvent } from 'react'
import { useImmer } from 'use-immer'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import BottomDialog from '@/components/BottomDialog'
import { cn } from '@/lib/utils'

type FilterDialogProps = {
  categories: {
    id: number
    title: string
    imgs: string
  }[]
}

const FilterDialog = ({ categories }: FilterDialogProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [price, updatePrice] = useImmer(() => {
    const minPrice = Number(searchParams.get('minPrice'))
    const maxPrice = Number(searchParams.get('maxPrice'))
    return { minPrice, maxPrice }
  })
  const [selectedCategoryIds, updateSelectedCategoryIds] = useImmer<number[]>(() => {
    const typeIds = searchParams.get('type')?.split(',').map(Number) || []
    return [...typeIds]
  })

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

  const handleSubmit = () => {
    const newSearchParams = new URLSearchParams(searchParams)

    if (selectedCategoryIds.length !== 0) {
      newSearchParams.set('type', selectedCategoryIds.join(','))
    } else {
      newSearchParams.delete('type')
    }

    if (price.minPrice !== 0 || price.maxPrice !== 0) {
      newSearchParams.set('minPrice', String(price.minPrice))
      newSearchParams.set('maxPrice', String(price.maxPrice))
    } else {
      newSearchParams.delete('minPrice')
      newSearchParams.delete('maxPrice')
    }

    newSearchParams.delete('filter')

    router.push(`/search?${newSearchParams.toString()}`)
  }

  return (
    <BottomDialog title="全部篩選" onClose={handleClose}>
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
        <Button className="flex-grow rounded-r-full hover:bg-red-600" onClick={handleSubmit}>
          查看商品
        </Button>
      </div>
    </BottomDialog>
  )
}

export default FilterDialog
