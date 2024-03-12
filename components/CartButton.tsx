'use client'

import { ShoppingCartIcon } from 'lucide-react'

import { Button } from './ui/button'
import { CartItem } from '@/types/common'
import { useRouter } from 'next/navigation'

type Props = {
  item: CartItem
}

const CartButton = ({ item }: Props) => {
  const router = useRouter()
  // TODO: this component should use context api
  const handleClick = () => router.push(`/product-detail?id=${item.id}`)

  return (
    <Button
      className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary"
      size="icon"
    >
      <ShoppingCartIcon className="h-4 w-4 text-white" onClick={handleClick} />
    </Button>
  )
}

export default CartButton
