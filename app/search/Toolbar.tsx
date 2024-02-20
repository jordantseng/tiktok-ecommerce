'use client'

import { ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon, FilterIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'

const Toolbar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sortBy = searchParams.get('sortBy')
  const order = searchParams.get('order')

  const handlePriceClick = () => {
    const params = new URLSearchParams(searchParams)

    params.set('sortBy', 'price')

    if (sortBy === 'price') {
      params.set('order', order === 'ascending' ? 'descending' : 'ascending')
    } else {
      params.set('order', 'ascending')
    }

    router.push(`/search/?${params.toString()}`)
  }

  const handleSalesClick = () => {
    const params = new URLSearchParams(searchParams)

    if (sortBy === 'buycount') {
      params.set('order', order === 'ascending' ? 'descending' : 'ascending')
    } else {
      params.set('order', 'ascending')
    }

    params.set('sortBy', 'buycount')

    router.push(`/search/?${params.toString()}`)
  }

  const handleFilterClcik = () => {
    const params = new URLSearchParams(searchParams)

    if (!params.has('filter')) {
      params.set('filter', 'open')
    } else {
      params.delete('filter')
    }

    router.push(`/search/?${params.toString()}`)
  }

  const renderSortIcon = (sortName: string) => {
    if (sortBy !== sortName) {
      return <ChevronsUpDownIcon className="h-3 w-3" />
    }

    return order === 'ascending' ? (
      <ChevronUpIcon className="h-3 w-3" />
    ) : (
      <ChevronDownIcon className="h-3 w-3" />
    )
  }

  return (
    <div className="mb-4 flex justify-around">
      <button className="flex items-center justify-center gap-1 text-sm" onClick={handlePriceClick}>
        價格
        {renderSortIcon('price')}
      </button>
      <button className="flex items-center justify-center gap-1 text-sm" onClick={handleSalesClick}>
        銷量
        {renderSortIcon('buycount')}
      </button>
      <button
        className="flex items-center justify-center gap-1 text-sm"
        onClick={handleFilterClcik}
      >
        篩選
        <FilterIcon
          className={cn('h-3 w-3', {
            'fill-black': searchParams.has('filter'),
          })}
        />
      </button>
    </div>
  )
}

export default Toolbar
