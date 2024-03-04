'use client'

import {
  Bolt,
  Headset,
  ChevronRight,
  MapPin,
  Footprints,
  MessageSquareHeart,
  Building2,
  Headphones,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import IconCard from '@/components/IconCard'
import MerchandiseCard, { MerchandiseSkeleton } from '@/components/MerchandiseCard'
import NavBar from '@/components/NavBar'
import { Skeleton } from '@/components/ui/skeleton'
import { orderStatusMap } from '@/constants/order'
import { useAuthContext } from '@/context/AuthContext'
import { useRecommendsContext } from '@/context/RecommendsContext'
import { filterOrderByStatus } from '@/services/order'
import OrderNavItem from '@/app/member/OrderNavItem'
import { useOrderContext } from '@/context/OrderContext'

function AvatarDemo({ src }: { src?: string }) {
  return (
    <Avatar className="h-12 w-12 border-2 md:h-20 md:w-20">
      <AvatarImage src={src || 'https://github.com/shadcn.png'} alt="@shadcn" />
      <AvatarFallback>
        <Skeleton className="h-12 w-12 md:h-20 md:w-20" />
      </AvatarFallback>
    </Avatar>
  )
}

// function NumericInfo() {
//   const { user } = useAuthContext()
//   const infos = [
//     { count: 51, label: '餘額(元)' },
//     { count: 51, label: '優惠券' },
//     { count: 51, label: '積分' },
//   ]
//   return (
//     <div className="grid grid-cols-3">
//       {infos.map(({ count, label }) => (
//         <div key={label} className="flex flex-col items-center justify-between">
//           <span className="text-xl md:text-2xl">
//             {!user ? (
//               <Skeleton className="h-7 w-7 md:h-8 md:w-8" />
//             ) : (
//               Number(count).toLocaleString()
//             )}
//           </span>
//           <span className="text-sm font-extrabold md:text-base">{label}</span>
//         </div>
//       ))}
//     </div>
//   )
// }

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

const MemberPage = () => {
  const router = useRouter()
  const { user, isPreparingAuthData } = useAuthContext()
  const { recommends, isLoadingRecommends } = useRecommendsContext()
  const { orders } = useOrderContext()

  return (
    <main className="flex h-full min-h-screen flex-col">
      <section className="relative bg-gradient-to-r from-primary-alt to-primary pb-20 text-white">
        <div className="grid place-items-center gap-10 p-4">
          <div className="relative flex w-full flex-col gap-4">
            <div className="absolute right-0 top-0 flex gap-4">
              {isPreparingAuthData ? (
                <>
                  <Skeleton className="h-6 w-6 md:h-10 md:w-10" />
                  <Skeleton className="h-6 w-6 md:h-10 md:w-10" />
                </>
              ) : (
                <>
                  <Bolt
                    onClick={() => router.push('/profile')}
                    className="cursor-pointer md:h-10 md:w-10"
                  />
                  <Headset className="cursor-pointer md:h-10 md:w-10" />
                </>
              )}
            </div>

            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                {user ? (
                  <AvatarDemo src={user.img ?? ''} />
                ) : (
                  <Skeleton className="h-12 w-12 rounded-full md:h-20 md:w-20" />
                )}

                <div className="flex flex-col gap-1">
                  <span className="min-h-7 text-lg md:min-h-8 md:text-2xl">
                    {!user ? <Skeleton className="h-5 w-28 md:h-8 md:w-36" /> : user.name}
                  </span>
                  <span className="min-h-4 text-xs md:min-h-8 md:text-base">
                    {!user ? <Skeleton className="h-5 w-28 md:h-8 md:w-36" /> : user.tiktokid}
                  </span>
                </div>
              </div>
            </div>

            {/* <NumericInfo /> */}
          </div>
        </div>
      </section>

      <section className="relative flex flex-1 flex-col bg-gray-50">
        <div className="relative -top-24 m-4 flex flex-col gap-5 rounded-xl bg-white p-4">
          <div className="flex flex-1 justify-between">
            <span className="font-medium">我的訂單</span>
            {isPreparingAuthData ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <span
                onClick={() => router.push('/member/orders?type=all')}
                className="flex cursor-pointer text-gray-600 transition-all hover:text-gray-500"
              >
                全部訂單
                <ChevronRight />
              </span>
            )}
          </div>

          <div className="grid flex-1 grid-cols-5">
            {isPreparingAuthData
              ? Array.from({ length: 5 }).map((_, index) => (
                  <OrderNavItem title="" key={index} isLoading />
                ))
              : Object.values(orderStatusMap).map(({ nav: { title, Icon, href }, value }) => (
                  <OrderNavItem
                    key={title}
                    title={title}
                    Icon={Icon}
                    onClick={() => router.push(href)}
                    count={filterOrderByStatus(value, orders).length}
                  />
                ))}
          </div>
        </div>

        <div className="relative -top-28 flex flex-1 flex-col">
          <div className="relative m-4 flex flex-col gap-5 rounded-xl bg-white p-4">
            <div className="flex flex-1 justify-between">
              <span className="font-medium">我的服務</span>
            </div>

            <div className="grid flex-1 grid-cols-5">
              {isPreparingAuthData
                ? Array.from({ length: 5 }).map((_, index) => (
                    <OrderNavItem title="" key={index} isLoading />
                  ))
                : serviceNavItems.map(({ title, Icon, href }) => (
                    <IconCard
                      key={title}
                      title={title}
                      Icon={Icon}
                      onClick={() => router.push(href)}
                    />
                  ))}
            </div>
          </div>

          <div>
            <div className="font-lg flex items-center justify-center font-semibold">
              ✨ 為你推薦 ✨
            </div>
            <div className="grid w-full grid-cols-2 place-items-center gap-4 p-4 max-[320px]:grid-cols-1">
              {recommends.map((recommend) => (
                <MerchandiseCard
                  className="h-full w-full"
                  id={recommend.id}
                  key={recommend.id}
                  imgUrl={recommend.imgs[0]}
                  title={recommend.title}
                  tags={recommend.tags?.split(',')}
                  price={recommend.price}
                  originPrice={recommend.marketprice}
                />
              ))}
              {isLoadingRecommends &&
                Array.from({ length: 2 }).map((_, index) => <MerchandiseSkeleton key={index} />)}
            </div>
          </div>
        </div>
      </section>

      <NavBar />
    </main>
  )
}

export default MemberPage
