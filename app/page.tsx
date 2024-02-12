import { MessageSquareMoreIcon, MenuIcon, LampFloorIcon } from 'lucide-react'
import Link from 'next/link'

import HeroCarousel from '@/app/HeroCarousel'
import Searchbar from '@/components/Searchbar'
import IconCard from '@/components/IconCard'
import MerchandiseCard from '@/components/MerchandiseCard'
import NavBar from '@/components/NavBar'
import { getBanners } from '@/services/banner'
import { getCategoryTypes } from '@/services/categoryType'

export default async function HomePage() {
  const [{ data: banners }, { data: categoryTypes }] = await Promise.all([
    getBanners(),
    getCategoryTypes(),
  ])

  return (
    <main className="mb-16 bg-default">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-4">
        <h4 className="scroll-m-20 text-xl font-normal tracking-tight">天服能量購物商城</h4>
        <div className="flex items-center gap-4">
          <MessageSquareMoreIcon className="cursor-pointer" />
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
            <IconCard
              key={type.id}
              title={type.title}
              Icon={<LampFloorIcon className="h-12 w-12 p-2" />}
            />
          ))}
        </div>
        <h4 className="mb-2 scroll-m-20 text-xl font-medium tracking-tight">猜你喜歡</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <MerchandiseCard
              id={1234}
              key={index}
              className="w-full"
              imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
              title="PS5"
              tags={['game', 'tv']}
              price={18800}
              unit="台"
              sales={10000}
            />
          ))}
        </div>
      </div>
      <NavBar />
    </main>
  )
}
