import Link from 'next/link'

import SearchHistory from '@/app/search/SearchHistory'
import Toolbar from '@/app/search/Toolbar'
import FilterDialog from '@/app/search/FilterDialog'
import Searchbar from '@/components/Searchbar'
import MerchandiseCard from '@/components/MerchandiseCard'
import PrevButton from '@/components/PrevButton'
import Pagination from '@/components/Pagination'
import { getProducts } from '@/services/product'
import { getCategories } from '@/services/category'
import { cn } from '@/lib/utils'
import { paginationGuard } from '@/lib/guard'

const PAGE_SIZE = 4

type SearchPageProps = {
  searchParams: {
    q: string
    filter: string
    page: string
    type: string
    order: string
    sortBy: string
    minPrice: string
    maxPrice: string
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q, filter, page, type, order, sortBy, minPrice, maxPrice } = searchParams

  const { data: products } = await getProducts({
    page: Number(page),
    pageSize: PAGE_SIZE,
    search: q,
    kindheadId: type,
    sortName: sortBy,
    sortType: order === 'ascending' ? 'asc' : 'desc',
    price1: Number(minPrice) || undefined,
    price2: Number(maxPrice) || undefined,
  })

  const { data: categories } = await getCategories()

  paginationGuard(Number(page), products.last_page, type)

  return (
    <>
      <main
        className={cn('min-h-screen bg-default', {
          'bg-white': !q,
        })}
      >
        <header className="sticky top-0 flex items-center gap-3 bg-default px-4 py-4">
          <PrevButton />
          <Searchbar />
        </header>
        <div className="p-4">
          {q ? (
            <>
              <Toolbar />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {products.data.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <MerchandiseCard
                      id={product.id}
                      key={product.id}
                      className="w-full"
                      imgUrl={product.imgs[0]}
                      title={product.title}
                      tags={product.tags?.split(',')}
                      price={product.price}
                      originPrice={product.marketprice}
                      sales={String(product.buycount)}
                    />
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-center p-4">
                <Pagination
                  page={Number(page)}
                  totalItems={products.total}
                  itemsPerPage={PAGE_SIZE}
                />
              </div>
            </>
          ) : (
            <SearchHistory />
          )}
        </div>
      </main>
      {filter && <FilterDialog categories={categories.data} />}
    </>
  )
}

export default SearchPage
