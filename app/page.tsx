import { MessageSquareMoreIcon, MenuIcon } from 'lucide-react'
import Link from 'next/link'

import HeroCarousel from '@/app/HeroCarousel'
import Searchbar from '@/components/Searchbar'
import IconCard from '@/components/IconCard'
import MerchandiseCard from '@/components/MerchandiseCard'
import NavBar from '@/components/NavBar'
import { getBanners } from '@/services/banner'
import { getCategories } from '@/services/category'
import { getProducts } from '@/services/product'
import { getWebSettings } from '@/services/webSettings'

export default async function HomePage() {
  const [
    { data: banners },
    { data: categoryTypes },
    { data: products },
    { data: webSettingsData },
  ] = await Promise.all([
    getBanners(),
    getCategories(),
    getProducts({ page: 1, pageSize: 4 }),
    getWebSettings(),
  ])

  return (
    <main className="mb-16 bg-default">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-4">
        <h4 className="scroll-m-20 text-xl font-normal tracking-tight">
          {webSettingsData?.title || '天服能量購物商城'}
        </h4>
        <div className="flex items-center gap-4">
          <Link href="/announcement">
            <MessageSquareMoreIcon className="cursor-pointer" />
          </Link>
          <Link href="/info">
            <MenuIcon />
          </Link>
        </div>
      </header>
      <div className="p-4">
        <div className="mb-2">
          <Searchbar enableDialog showSearchButton />
        </div>
        <div className="mb-2">
          <HeroCarousel items={banners.data} />
        </div>
        <div className="mb-2 grid grid-cols-4 gap-2">
          {categoryTypes.data.map((type) => (
            <IconCard key={type.id} title={type.title} imgUrl={type.imgs} />
          ))}
        </div>
        <h4 className="mb-2 scroll-m-20 text-xl font-medium tracking-tight">猜你喜歡</h4>
        <div className="grid grid-cols-2 gap-4">
          {products.data.map((product) => (
            <Link key={product.id} href={`/productDetail?id=${product.id}`}>
              <MerchandiseCard
                id={product.id}
                className="w-full"
                imgUrl={product.imgs[0]}
                title={product.title}
                tags={product.tags?.split(',')}
                price={product.price}
                originPrice={product.marketprice}
                sales={String(product.buycount)}
                stars={product.star}
              />
            </Link>
          ))}
        </div>
      </div>
      <NavBar />
    </main>
  )
}
