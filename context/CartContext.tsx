'use client'
import { CartItem } from '@/types/common'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

type CartContextType = {
  items: Item[]
  handleAddToCart: (val: Item) => void
  handleRemoveFromCart: (id: number) => void
  updateSelected: (id: number, isSelect: boolean) => void
  getSelectedCartItems: () => Item[]
}

interface Item extends CartItem {
  isSelect: boolean
}

const CartContext = createContext<CartContextType | null>(null)

type CartProviderProps = {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useImmer<Item[]>([
    {
      id: 56583,
      amount: 1,
      imgUrl:
        'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$',
      title: 'PS5 新春大禮包',
      prize: 18888,
      tags: ['快速出貨', '24hr'],
      isSelect: false,
    },
    {
      id: 12334,
      amount: 1,
      imgUrl:
        'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$',
      title: 'PS5 新春大禮包 龍年大好運好彩頭',
      prize: 18888,
      specialPrize: 13000,
      tags: ['快速出貨', '24hr'],
      isSelect: false,
    },
  ])

  const handleAddToCart = (val: Item) => setItems((draft) => draft.push(val))

  const handleRemoveFromCart = (id: number) =>
    setItems((draft) => draft.filter((opt) => opt.id !== id))

  const updateSelected = (id: number, isSelect: boolean) =>
    setItems((draft) => draft.map((opt) => (opt.id === id ? { ...opt, isSelect: isSelect } : opt)))

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
