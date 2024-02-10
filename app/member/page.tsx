import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Bolt,
  Headset,
  ChevronRight,
  Wallet,
  Truck,
  WalletCards,
  MessageSquareText,
  BadgeJapaneseYen,
  MapPin,
  Footprints,
  MessageSquareHeart,
  Building2,
  Headphones,
} from 'lucide-react'
import IconCard from '@/components/IconCard'
import MerchandiseCard from '@/components/MerchandiseCard'
import NavBar from '@/components/NavBar'

function AvatarDemo() {
  return (
    <Avatar className="h-12 w-12 border-2 md:h-20 md:w-20">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

function NumericInfo() {
  const infos = [
    { count: 51, label: '餘額(元)' },
    { count: 51, label: '優惠券' },
    { count: 51, label: '積分' },
  ]
  return (
    <div className="grid grid-cols-3">
      {infos.map(({ count, label }) => (
        <div key={label} className="flex flex-col items-center justify-between">
          <span className="text-xl md:text-2xl">{Number(count).toLocaleString()}</span>
          <span className="text-sm font-extrabold md:text-base">{label}</span>
        </div>
      ))}
    </div>
  )
}

const MemberPage = () => {
  const orderNavItems = [
    {
      title: '待付款',
      href: '/',
      Icon: <Wallet className="h-10 w-10 p-2" />,
      count: 10,
    },
    {
      title: '待發貨',
      href: '/products',
      Icon: <WalletCards className="h-10 w-10 p-2" />,
    },
    {
      title: '待收貨',
      href: '/shopping-cart',
      Icon: <Truck className="h-10 w-10 p-2" />,
    },
    {
      title: '待評價',
      href: '/member',
      Icon: <MessageSquareText className="h-10 w-10 p-2" />,
    },
    {
      title: '退款/收貨',
      href: '/member',
      Icon: <BadgeJapaneseYen className="h-10 w-10 p-2" />,
    },
  ]

  const serviceNavItems = [
    {
      title: '收貨地址',
      href: '/address',
      Icon: <MapPin className="h-10 w-10 p-2" />,
    },
    {
      title: '足跡',
      href: '/footprints',
      Icon: <Footprints className="h-10 w-10 p-2" />,
    },
    {
      title: '我的收藏',
      href: 'my-favorites',
      Icon: <MessageSquareHeart className="h-10 w-10 p-2" />,
    },
    {
      title: '服務中心',
      href: '/member',
      Icon: <Building2 className="h-10 w-10 p-2" />,
    },
    {
      title: '在線客服',
      href: '/member',
      Icon: <Headphones className="h-10 w-10 p-2" />,
    },
  ]

  return (
    <main className="flex h-full min-h-screen flex-col">
      <section className="from-primary-alt relative bg-gradient-to-r to-primary pb-20 text-white">
        <div className="grid place-items-center gap-10 p-4">
          <div className="relative flex w-full flex-col gap-4">
            <div className="absolute right-0 top-0 flex gap-4">
              <Bolt className="cursor-pointer md:h-10 md:w-10" />
              <Headset className="cursor-pointer md:h-10 md:w-10" />
            </div>

            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <AvatarDemo />

                <div className="flex flex-col">
                  <span className="text-lg md:text-2xl">123456</span>
                  <span className="text-xs md:text-base">15800000000</span>
                </div>
              </div>
            </div>

            <NumericInfo />
          </div>
        </div>
      </section>

      <section className="relative flex flex-1 flex-col bg-gray-50">
        <div className="relative -top-24 m-4 flex flex-col gap-5 rounded-xl bg-white p-4">
          <div className="flex flex-1 justify-between">
            <span className="font-medium">我的訂單</span>
            <span className="flex cursor-pointer text-gray-600 transition-all hover:text-gray-500">
              全部訂單
              <ChevronRight />
            </span>
          </div>

          <div className="grid flex-1 grid-cols-5">
            {orderNavItems.map(({ title, Icon, href, count }) => (
              <div className="relative grid place-items-center" key={title}>
                <span className="relative flex md:w-20">
                  <IconCard title={title} Icon={Icon} />
                  {count && count > 0 && (
                    <div className="absolute -end-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white md:end-8">
                      {count}
                    </div>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative -top-28 flex flex-1 flex-col">
          <div className="relative m-4 flex flex-col gap-5 rounded-xl bg-white p-4">
            <div className="flex flex-1 justify-between">
              <span className="font-medium">我的服務</span>
            </div>

            <div className="grid flex-1 grid-cols-5">
              {serviceNavItems.map(({ title, Icon, href }) => (
                <IconCard key={title} title={title} Icon={Icon} />
              ))}
            </div>
          </div>

          <div>
            <div className="font-lg relative flex items-center justify-center font-semibold">
              ✨為你推薦✨
            </div>

            <div className="flex gap-4 p-4">
              <MerchandiseCard
                id={12345}
                className="w-[50%] max-[320px]:h-auto max-[320px]:w-full"
                imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
                title="PS5"
                tags={['game', 'tv']}
                price={18800}
                specialPrice={13000}
                unit="台"
              />
              <MerchandiseCard
                id={12345}
                className="w-[50%] max-[320px]:h-auto max-[320px]:w-full"
                imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
                title="PS5"
                tags={['game', 'tv']}
                price={18800}
                specialPrice={13000}
                unit="台"
              />
            </div>
          </div>
        </div>
      </section>

      <NavBar />
    </main>
  )
}

export default MemberPage
