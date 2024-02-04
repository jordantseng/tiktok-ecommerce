'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, ArrowDownWideNarrowIcon, ShoppingCartIcon, UserRoundIcon } from 'lucide-react'

import IconCard from '@/components/IconCard'

const NavBar = () => {
  const pathName = usePathname()

  const navItems = [
    {
      title: '首頁',
      href: '/',
      Icon: <HomeIcon className="h-10 w-10 p-2" />,
    },
    {
      title: '分類',
      href: '/products',
      Icon: <ArrowDownWideNarrowIcon className="h-10 w-10 p-2" />,
    },
    {
      title: '購物車',
      href: '/shopping-cart',
      Icon: <ShoppingCartIcon className="h-10 w-10 p-2" />,
    },
    {
      title: '我的',
      href: '/member',
      Icon: <UserRoundIcon className="h-10 w-10 p-2" />,
    },
  ]

  return (
    <nav className="h-22 fixed bottom-0 flex w-full justify-around bg-white">
      {navItems.map((item, index) => {
        return (
          <Link key={index} href={item.href}>
            <IconCard
              title={item.title}
              Icon={item.Icon}
              isActive={item.href === '/' ? pathName === '/' : pathName.includes(item.href)}
            />
          </Link>
        )
      })}
    </nav>
  )
}

export default NavBar
