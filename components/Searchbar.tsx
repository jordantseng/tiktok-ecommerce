import { SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const Searchbar = ({ isDisabled = false, showSearchButton = false }) => {
  return (
    <form
      className={cn(`relative flex-grow items-center rounded-full`, {
        'cursor-pointer': isDisabled,
      })}
    >
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" height={20} width={20} />
      <input
        className={cn(`w-full rounded-full bg-white px-3 py-2 pl-10 text-sm outline-none`, {
          'cursor-pointer': isDisabled,
        })}
        placeholder="耳機"
        // ref={searchInputRef}
        type="search"
        // defaultValue={searchTerm}
        disabled={isDisabled}
      />
      {showSearchButton && (
        <p className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary">搜尋</p>
      )}
    </form>
  )
}

export default Searchbar
