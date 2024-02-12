import Link from 'next/link'

import Sidebar from '@/app/products/Sidebar'
import ProductList from '@/app/products/ProductList'
import NavBar from '@/components/NavBar'
import PrevButton from '@/components/PrevButton'
import Searchbar from '@/components/Searchbar'
import MerchandiseCard from '@/components/MerchandiseCard'

const sidebarItems = [
  { id: 1, title: '蔬菜水果' },
  { id: 2, title: '肉禽蛋品' },
  { id: 3, title: '海鮮水產' },
  { id: 4, title: '素食冷凍' },
  { id: 5, title: '柴米油鹽' },
]

const subSidebarItems = [
  { id: 1, title: '所有' },
  { id: 2, title: '熱帶水果' },
  { id: 3, title: '櫻桃莓類' },
  { id: 4, title: '櫻桃莓類' },
  { id: 5, title: '櫻桃莓類' },
  { id: 6, title: '櫻桃莓類' },
]

type ProductsPageProps = {
  searchParams: { type: string }
}

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const { type } = searchParams

  return (
    <main className="mb-16 min-h-screen bg-default">
      <header className="sticky top-0 z-50 flex items-center gap-3 bg-default p-4">
        <PrevButton />
        <Searchbar />
      </header>
      <div className="flex min-h-screen w-full">
        <Sidebar activeType={type} items={sidebarItems} />
        <ProductList subSidebarItems={subSidebarItems}>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Link href={`/products/${1}`} key={index}>
                <MerchandiseCard
                  id={1234}
                  className="w-full border-none shadow-none"
                  imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
                  title="PS5"
                  tags={['game', 'tv']}
                  price={18800}
                />
                <hr className="mx-auto flex w-11/12" />
              </Link>
            ))}
        </ProductList>
      </div>
      <NavBar />
    </main>
  )
}

export default ProductsPage
