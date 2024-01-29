'use client'

import { SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type SearchbarProps = {
  enableDialog?: boolean
  showSearchButton?: boolean
}

const Searchbar = ({ enableDialog = false, showSearchButton = false }: SearchbarProps) => {
  const router = useRouter()

  const navigateToSearchPage = () => {
    router.push('/search')
  }

  return (
    <form
      className={cn(`relative flex-grow items-center rounded-full`, {
        'cursor-pointer': enableDialog,
      })}
      {...(enableDialog && {
        onClick: navigateToSearchPage,
      })}
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
        // ref={searchInputRef}
        type="search"
        // defaultValue={searchTerm}
        readOnly={enableDialog}
      />
      {showSearchButton && (
        <p className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary">搜尋</p>
      )}
    </form>
  )
}

export default Searchbar
