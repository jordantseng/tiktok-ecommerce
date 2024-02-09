import { ChevronLeft } from 'lucide-react'

import SearchHistory from '@/app/search/SearchHistory'
import Toolbar from '@/app/search/Toolbar'
import FilterDialog from '@/app/search/FilterDialog'
import Searchbar from '@/components/Searchbar'
import MerchandiseCard from '@/components/MerchandiseCard'
import PrevButton from '@/components/PrevButton'
import { cn } from '@/lib/utils'

type SearchPageProps = { searchParams: { q: string; filter: string } }

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const { q, filter } = searchParams

  return (
    <>
      <main
        className={cn('min-h-screen bg-default', {
          'bg-white': !q,
        })}
      >
        <header className="sticky top-0 flex items-center gap-3 bg-default px-4 pb-4 pt-6">
          <PrevButton />
          <Searchbar />
        </header>
        <div className="p-4">
          {q ? (
            <>
              <Toolbar />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Array.from({ length: 10 }).map((_, index) => (
                  <MerchandiseCard
                    id={index}
                    key={index}
                    className="w-full"
                    imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
                    title="PS5"
                    tags={['game', 'tv']}
                    prize={18800}
                    unit="台"
                    sales={100}
                  />
                ))}
              </div>
            </>
          ) : (
            <SearchHistory />
          )}
        </div>
      </main>
      {filter && <FilterDialog />}
    </>
  )
}

export default SearchPage
