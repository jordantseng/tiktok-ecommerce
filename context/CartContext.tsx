'use client'
import { CartItems } from '@/types'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

type CartContextType = {
  items: Item[]
  handleAddToCart: (val: Item) => void
  handleRemoveFromCart: (id: number) => void
  updateSelected: (id: number, isSelect: boolean) => void
  getSelectedCartItems: () => Item[]
}

interface Item extends CartItems {
  isSelect: boolean
}

const CartContext = createContext<CartContextType | null>(null)

type CartProviderProps = {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<Item[]>([])

  const handleAddToCart = (val: Item) => {
    items.push(val)
    setItems([...items])
  }

  const handleRemoveFromCart = (id: number) => {
    const newItems = items.filter((opt) => opt.id !== id)
    setItems(newItems)
  }

  const updateSelected = (id: number, isSelect: boolean) => {
    const updatedItems = items.map((opt) => (opt.id === id ? { ...opt, isSelect: isSelect } : opt))
    setItems(updatedItems)
  }

  const getSelectedCartItems = () => {
    const res = items.filter((opt) => opt.isSelect)
    return res
  }

  return (
    <CartContext.Provider
      value={{
        items,
        handleAddToCart,
        handleRemoveFromCart,
        updateSelected,
        getSelectedCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const value = useContext(CartContext)

  if (value == null) {
    throw new Error('useSidebarContext cannot be used outside of SidebarProvider')
  }

  return value
}
