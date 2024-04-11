import SearchHistory from '@/app/search/SearchHistory'
import Toolbar from '@/app/search/Toolbar'
import FilterDialog from '@/app/search/FilterDialog'
import Searchbar from '@/components/Searchbar'
import PrevButton from '@/components/PrevButton'
import Pagination from '@/components/Pagination'
import { getProducts } from '@/services/product'
import { getCategories } from '@/services/category'
import { cn, getBaseURL } from '@/lib/utils'
import { paginationGuard } from '@/lib/guard'
import ProductList from '@/app/search/ProductList'
import { headers } from 'next/headers'

const PAGE_SIZE = 15

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
  const headerList = headers()
  const baseURL = getBaseURL(headerList.get('host')!)

  const { data: products } = await getProducts({
    baseURL,
    page: Number(page),
    pageSize: PAGE_SIZE,
    search: q,
    kindheadId: type,
    sortName: sortBy,
    sortType: order === 'ascending' ? 'asc' : 'desc',
    price1: Number(minPrice) || undefined,
    price2: Number(maxPrice) || undefined,
  })

  const { data: categories } = await getCategories(baseURL)

  paginationGuard(Number(page), products.last_page, type)

  return (
    <>
      <main
        className={cn('min-h-screen bg-background', {
          'bg-white': !q,
        })}
      >
        <header className="sticky top-0 z-40 flex items-center gap-3 bg-background px-4 py-4">
          <PrevButton redirectUrl="/" />
          <Searchbar />
        </header>
        <div className="p-4">
          {q ? (
            <>
              <Toolbar />
              <ProductList products={products} />
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
