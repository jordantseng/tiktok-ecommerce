'use client'

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
import { useRouter } from 'next/navigation'
import IconCard from '@/components/IconCard'
import MerchandiseCard from '@/components/MerchandiseCard'
import NavBar from '@/components/NavBar'
import { orderStatusMap } from '@/constants/member'

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
  const router = useRouter()

  const orderNavItems = [
    {
      title: orderStatusMap.checkout.title,
      href: orderStatusMap.checkout.href,
      Icon: <Wallet className="h-10 w-10 p-2" />,
      count: 10,
    },
    {
      title: orderStatusMap.shipping.title,
      href: orderStatusMap.shipping.href,
      Icon: <WalletCards className="h-10 w-10 p-2" />,
    },
    {
      title: orderStatusMap.receipt.title,
      href: orderStatusMap.receipt.href,
      Icon: <Truck className="h-10 w-10 p-2" />,
    },
    {
      title: orderStatusMap.receipted.title,
      href: orderStatusMap.receipted.href,
      Icon: <MessageSquareText className="h-10 w-10 p-2" />,
    },
    {
      title: orderStatusMap.refunded.title,
      href: orderStatusMap.refunded.href,
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
      href: '/service-center',
      Icon: <Building2 className="h-10 w-10 p-2" />,
    },
    {
      title: '在線客服',
      href: '/online-service',
      Icon: <Headphones className="h-10 w-10 p-2" />,
    },
  ]

  return (
    <main className="flex h-full min-h-screen flex-col">
      <section className="relative bg-gradient-to-r from-primary-alt to-primary pb-20 text-white">
        <div className="grid place-items-center gap-10 p-4">
          <div className="relative flex w-full flex-col gap-4">
            <div className="absolute right-0 top-0 flex gap-4">
              <Bolt
                onClick={() => router.push('/member/profile')}
                className="cursor-pointer md:h-10 md:w-10"
              />
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
            <span
              onClick={() => router.push('/member/orders?type=all')}
              className="flex cursor-pointer text-gray-600 transition-all hover:text-gray-500"
            >
              全部訂單
              <ChevronRight />
            </span>
          </div>

          <div className="grid flex-1 grid-cols-5">
            {orderNavItems.map(({ title, Icon, href, count }) => (
              <div className="relative grid place-items-center" key={title}>
                <span className="relative flex">
                  <IconCard title={title} Icon={Icon} onClick={() => router.push(href)} />
                  {count && count > 0 && (
                    <div className="absolute -end-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white">
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
                <IconCard key={title} title={title} Icon={Icon} onClick={() => router.push(href)} />
              ))}
            </div>
          </div>

          <div>
            <div className="font-lg relative flex items-center justify-center font-semibold">
              ✨為你推薦✨
            </div>
            {/* 窄螢幕手機會破圖 我先擋一下 */}
            <div className="flex gap-4 p-4 max-[320px]:block">
              <MerchandiseCard
                id={12345}
                className="w-[50%] max-[320px]:h-auto max-[320px]:w-full"
                imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
                title="PS5"
                tags={['game', 'tv']}
                price={18800}
                specialPrice={13000}
              />
              <MerchandiseCard
                id={12345}
                className="w-[50%] max-[320px]:h-auto max-[320px]:w-full"
                imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
                title="PS5"
                tags={['game', 'tv']}
                price={18800}
                specialPrice={13000}
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
