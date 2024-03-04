'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import IconCard from '@/components/IconCard'

const NavBar = () => {
  const pathName = usePathname()

  const navItems = [
    {
      title: '首頁',
      href: '/',
      Icon: <Image src="/home.svg" height={40} width={40} alt="" className="h-10 w-10 p-2" />,
    },
    {
      title: '分類',
      href: '/products?page=1',
      Icon: <Image src="/sort.svg" height={40} width={40} alt="" className="h-10 w-10 p-2" />,
    },
    {
      title: '購物車',
      href: '/shopping-cart',
      Icon: (
        <Image src="/shopping-cart.svg" height={40} width={40} alt="" className="h-10 w-10 p-2" />
      ),
    },
    {
      title: '我的',
      href: '/member',
      Icon: <Image src="/user.svg" height={40} width={40} alt="" className="h-10 w-10 p-2" />,
    },
  ]

  return (
    <nav className="h-22 fixed bottom-0 z-50 flex w-full max-w-md justify-around bg-white drop-shadow-2xl">
      {navItems.map((item, index) => {
        const splitedPathname = item.href.split('?')[0]
        return (
          <Link key={index} href={item.href}>
            <IconCard
              title={item.title}
              Icon={item.Icon}
              isActive={item.href === '/' ? pathName === '/' : pathName.includes(splitedPathname)}
            />
          </Link>
        )
      })}
    </nav>
  )
}

export default NavBar
