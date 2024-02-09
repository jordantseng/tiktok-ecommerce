'use client'

import { ShoppingCartIcon } from 'lucide-react'

import { Button } from './ui/button'
import { useCartContext } from '@/context/CartContext'
import { CartItem } from '@/types/common'

type Props = {
  item: CartItem
}

const CartButton = ({ item }: Props) => {
  const { handleAddToCart } = useCartContext()
  // TODO: this component should use context api
  const handleClick = () => handleAddToCart(item)

  return (
    <Button
      className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary"
      variant="outline"
      size="icon"
    >
      <ShoppingCartIcon className="h-4 w-4 text-white" onClick={handleClick} />
    </Button>
  )
}

export default CartButton
