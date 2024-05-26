'use client'
import { PropsWithChildren, useState } from 'react'

import SubSidebar from '@/app/products/SubSidebar'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

type ProductListProps = PropsWithChildren<{ subSidebarItems?: { id: number; title: string }[] }>

const ProductList = ({ subSidebarItems = [], children }: ProductListProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleNavigation = (title: number) => {
    const params = new URLSearchParams(searchParams)

    params.set('subType', String(title))

    router.push(`/products/?${params.toString()}`)
  }

  return (
    <div className="relative w-[calc(100%-80px)] bg-white">
      <SubSidebar
        isOpen={isOpen}
        onSidebarOpen={() => setIsOpen(!isOpen)}
        subSidebarItems={subSidebarItems}
        onClick={handleNavigation}
      />
      {isOpen && (
        <div
          className={cn('absolute z-10 h-full min-h-screen w-full', {
            'bg-black/50': isOpen,
          })}
          onClick={() => setIsOpen(false)}
        />
      )}
      {children}
    </div>
  )
}

export default ProductList
