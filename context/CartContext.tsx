'use client'
import { addToCart, deleteFromCart, getMyCart, updatePurchase } from '@/services/cart'
import { CartItem } from '@/types/common'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

type CartContextType = {
  items: Item[]
  handleAddToCart: (val: CartItem) => void
  handleRemoveFromCart: (id: number) => void
  updateItemAmount: (id: number, amount: number) => void
  updateSelected: (id: number, isSelect: boolean) => void
  getSelectedCartItems: () => Item[]
}

export type Item = CartItem & {
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
      price: 18888,
      tags: ['快速出貨', '24hr'],
      isSelect: false,
    },
    {
      id: 12334,
      amount: 1,
      imgUrl:
        'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$',
      title: 'PS5 新春大禮包 龍年大好運好彩頭',
      price: 18888,
      specialPrice: 13000,
      tags: ['快速出貨', '24hr'],
      isSelect: false,
    },
  ])

  useEffect(() => {
    getMyCart().then((res) => {
      const newItems = (res?.data?.data || []).map((opt) => ({
        id: opt.id,
        amount: opt.qty,
        imgUrl: opt.imgs,
        title: opt.title,
        price: opt.price,
        specialPrice: opt.marketprice,
        tags: opt.tags.split(','),
        isSelect: false,
      }))
      setItems((draft) => [...draft, ...newItems])
    })
  }, [])

  const handleAddToCart = (val: CartItem) => {
    addToCart(val.id, 1)
    setItems((draft) => draft.push({ ...val, isSelect: false }))
  }

  const handleRemoveFromCart = (id: number) => {
    deleteFromCart(id)
    setItems((draft) => draft.filter((opt) => opt.id !== id))
  }

  const updateSelected = (id: number, isSelect: boolean) => {
    setItems((draft) => draft.map((opt) => (opt.id === id ? { ...opt, isSelect: isSelect } : opt)))
    // updatePurchase(id, isSelect ? 1 : 0)
  }

  const updateItemAmount = (id: number, amount: number) =>
    setItems((draft) => draft.map((opt) => (opt.id === id ? { ...opt, amount } : opt)))

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
        updateItemAmount,
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
