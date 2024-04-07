'use client'

import { FormEvent, useRef } from 'react'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'

type SearchbarProps = {
  enableDialog?: boolean
  showSearchButton?: boolean
  domain?: string
}

const Searchbar = ({ domain, enableDialog = false, showSearchButton = false }: SearchbarProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchTerm = searchParams.get('q') || ''
  const pathname = usePathname()

  const handleFormClick = () => {
    router.push('/search')
  }

  console.log('domain', domain)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newSearchParams = new URLSearchParams(searchParams)
    const searchValue = searchInputRef.current?.value
    const page = newSearchParams.get('page') || '1'
    newSearchParams.set('page', page)

    searchValue ? newSearchParams.set('q', searchValue) : newSearchParams.delete('q')

    if (pathname === '/search') {
      const stringifiedHistoryTerms = localStorage.getItem('historyTerms') ?? '[]'
      const historyTerms = JSON.parse(stringifiedHistoryTerms)

      if (searchValue) {
        historyTerms.push(searchValue)
      }

      const updatedHistoryTerms = Array.from(new Set([...historyTerms]))
      localStorage.setItem('historyTerms', JSON.stringify(updatedHistoryTerms))

      router.push(`/search/?${newSearchParams.toString()}`)
    }

    if (pathname === '/products') {
      router.push(`/products/?${newSearchParams.toString()}`)
    }
  }

  return (
    <form
      className={cn(`relative flex-grow items-center rounded-full`, {
        'cursor-pointer': enableDialog,
      })}
      {...(enableDialog && {
        onClick: handleFormClick,
      })}
      onSubmit={handleSubmit}
    >
      <SearchIcon
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        height={20}
        width={20}
      />
      <input
        className={cn(`w-full rounded-full bg-white px-3 py-2 pl-10 text-sm outline-none`, {
          'cursor-pointer': enableDialog,
        })}
        placeholder="耳機"
        ref={searchInputRef}
        type="search"
        defaultValue={searchTerm}
        readOnly={enableDialog}
      />
      {showSearchButton && (
        <p className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary">搜尋</p>
      )}
    </form>
  )
}

export default Searchbar
