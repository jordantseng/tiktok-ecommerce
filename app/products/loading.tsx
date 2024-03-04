import Sidebar from '@/app/products/Sidebar'
import ProductList from '@/app/products/ProductList'
import NavBar from '@/components/NavBar'
import PrevButton from '@/components/PrevButton'
import Searchbar from '@/components/Searchbar'
import { Skeleton } from '@/components/ui/skeleton'

const ProductsLoadingPage = () => {
  return (
    <main className="mb-16 min-h-screen bg-background">
      <header className="sticky top-0 z-50 flex items-center gap-3 bg-background p-4">
        <PrevButton />
        <Searchbar />
      </header>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <ProductList>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div key={index}>
                <div className="flex flex-col space-y-3 p-2">
                  <Skeleton className="h-[130px] w-full rounded-xl" />
                </div>
                <hr className="mx-auto flex w-11/12" />
              </div>
            ))}
        </ProductList>
      </div>
      <NavBar />
    </main>
  )
}

export default ProductsLoadingPage
