import { MessageSquareMoreIcon, MenuIcon, LampFloorIcon } from 'lucide-react'

import HeroCarousel from '@/app/HeroCarousel'
import Searchbar from '@/components/Searchbar'
import IconCard from '@/components/IconCard'
import MerchandiseCard from '@/components/MerchandiseCard'
import NavBar from '@/components/NavBar'

export default function HomePage() {
  return (
    <main className="mb-16 bg-default">
      <header className="flex items-center justify-between bg-white px-4 pb-4 pt-6">
        <h4 className="mb-2 scroll-m-20 text-xl font-normal tracking-tight">天服能量購物商城</h4>
        <div className="flex items-center gap-4">
          <MessageSquareMoreIcon />
          <MenuIcon />
        </div>
      </header>
      <div className="p-4">
        <div className="mb-2">
          <Searchbar enableDialog showSearchButton />
        </div>
        <div className="mb-2">
          <HeroCarousel />
        </div>
        <div className="mb-2 grid grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <IconCard
              key={index}
              title="商品種類"
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
              prize={18800}
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
