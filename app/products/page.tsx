import Link from 'next/link'
import { headers } from 'next/headers'

import Sidebar from '@/app/products/Sidebar'
import ProductList from '@/app/products/ProductList'
import NavBar from '@/components/NavBar'
import PrevButton from '@/components/PrevButton'
import Searchbar from '@/components/Searchbar'
import Pagination from '@/components/Pagination'
import { getProducts } from '@/services/product'
import { getCategories, getSubCategories } from '@/services/category'
import { paginationGuard } from '@/lib/guard'
import ProductItem from '@/components/ProductItem'
import ProductNotFound from '@/components/ProductNotFound'
import { getBaseURL } from '@/lib/utils'
import { PAGE_SIZE } from '@/constant'

type ProductsPageProps = {
  searchParams: { page: string; type: string; subType: string; q: string }
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { page, type, subType, q } = searchParams
  const headerList = headers()
  const baseURL = getBaseURL(headerList.get('host')!)

  const [{ data: products }, { data: categories }] = await Promise.all([
    getProducts({
      baseURL,
      page: Number(page),
      pageSize: PAGE_SIZE,
      kindheadId: type,
      kindmainId: subType,
      search: q,
    }),
    getCategories(baseURL),
  ])

  const category = categories.data.find(({ id }) => id === Number(type)) || categories.data[0] || []

  paginationGuard(Number(page), products.last_page, type, subType)

  const { data: subCategories } = await getSubCategories(baseURL, category.id)

  return (
    <main className="mb-16 min-h-screen bg-background">
      <header className="sticky top-0 z-50 flex items-center gap-3 bg-background p-4">
        <PrevButton />
        <Searchbar />
      </header>
      <div className="flex min-h-screen w-full">
        <Sidebar activeType={type} items={categories.data} />
        <ProductList subSidebarItems={subCategories}>
          {products.data.length === 0 ? (
            <ProductNotFound />
          ) : (
            products.data
              .toSorted((a, b) => Number(b.sortnum) - Number(a.sortnum))
              .map((product) => (
                <Link key={product.id} href={`/product-detail?id=${product.id}`}>
                  <ProductItem
                    id={product.id}
                    className="w-full border-none shadow-none"
                    imgUrl={product.imgs[0]}
                    title={product.title}
                    tags={product.tags?.split(',')}
                    price={product.price}
                    originPrice={product.marketprice}
                    stars={product.star}
                    sales={String(product.buycount)}
                  />
                </Link>
              ))
          )}
          <div className="sticky bottom-16 flex items-center justify-center bg-white p-4">
            <Pagination page={Number(page)} totalItems={products.total} itemsPerPage={PAGE_SIZE} />
          </div>
        </ProductList>
      </div>
      <NavBar />
    </main>
  )
}

export default ProductsPage
