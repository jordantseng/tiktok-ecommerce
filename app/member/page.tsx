'use client'

import { SquarePen, ChevronRight, User, Info, NotebookText } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import MerchandiseCard, { MerchandiseSkeleton } from '@/components/MerchandiseCard'
import NavBar from '@/components/NavBar'
import RecommendTitle from '@/components/RecommendTitle'
import { Skeleton } from '@/components/ui/skeleton'
import { orderStatusMap } from '@/constants/order'
import { useAuthContext } from '@/context/AuthContext'
import { useRecommendsContext } from '@/context/RecommendsContext'
import { useOrderContext } from '@/context/OrderContext'
import { filterOrderByStatus } from '@/services/order'
import OrderNavItem from '@/app/member/OrderNavItem'
import Link from 'next/link'

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

const navLinks = [
  {
    title: '帳號設定',
    href: '/profile',
    Icon: User,
  },
  {
    title: '常見問題',
    href: '/info?type=常見問題',
    Icon: Info,
  },
  {
    title: '隱私政策',
    href: '/privacy',
    Icon: NotebookText,
  },
  // {
  //   title: '退換貨政策',
  //   href: '/refund',
  //   Icon: SendToBack,
  // },
  // {
  //   title: '與客服即時交談',
  //   href: '/service',
  //   Icon: MessageCircleMore,
  // },
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
          <div className="relative flex w-full gap-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                {user ? (
                  <AvatarDemo src={user.img ?? ''} />
                ) : (
                  <Skeleton className="h-12 w-12 rounded-full md:h-20 md:w-20" />
                )}

                <div className="flex flex-col gap-1">
                  <span className="min-h-7 text-lg font-medium md:min-h-8 md:text-2xl">
                    {!user ? <Skeleton className="h-5 w-28 md:h-8 md:w-36" /> : user.id}
                  </span>
                  <span className="min-h-5 text-xs md:min-h-8 md:text-base">
                    {!user ? <Skeleton className="h-5 w-28 md:h-8 md:w-36" /> : user.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isPreparingAuthData ? (
                <Skeleton className="h-6 w-6 md:h-10 md:w-10" />
              ) : (
                <SquarePen
                  onClick={() => router.push('/profile')}
                  className="cursor-pointer md:h-10 md:w-10"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex flex-1 flex-col bg-gray-50">
        <div className="relative -top-24 m-4 flex flex-col gap-5 rounded-xl bg-white p-4">
          <div className="flex flex-1 justify-between">
            <span className="font-medium">
              {isPreparingAuthData ? <Skeleton className="h-6 w-20" /> : '我的訂單'}
            </span>
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
          {/* <div className="relative m-4 flex flex-col rounded-xl bg-white px-2">
            {navLinks.map(({ title, href, Icon }, index, source) => (
              <div
                key={title}
                onClick={() => router.push(href)}
                className={cn('flex cursor-pointer items-center justify-between gap-1 p-2', {
                  'border-b border-gray-200': index !== source.length - 1,
                })}
              >
                {isPreparingAuthData ? (
                  <Skeleton className="h-7 w-full" />
                ) : (
                  <>
                    <div className="flex gap-2">
                      <Icon className="text-primary" />
                      <span>{title}</span>
                    </div>

                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </div>
            ))}
          </div> */}
          <div className="mt-4 flex flex-col gap-4">
            <div className="font-lg flex items-center justify-center">
              {isPreparingAuthData ? <Skeleton className="h-8 w-32" /> : <RecommendTitle />}
            </div>
            <div className="grid grid-cols-2 gap-4 px-4 max-[320px]:w-full max-[320px]:grid-cols-1">
              {recommends.map((recommend) => (
                <Link key={recommend.id} href={`/product-detail?id=${recommend.id}`}>
                  <MerchandiseCard
                    className="w-full"
                    id={recommend.id}
                    key={recommend.id}
                    imgUrl={recommend.imgs[0]}
                    title={recommend.title}
                    tags={recommend.tags?.split(',')}
                    price={recommend.price}
                    originPrice={recommend.marketprice}
                    sales={String(recommend.buycount)}
                    stars={recommend.star}
                  />
                </Link>
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
