'use client'
import { CartReq, addToCart, deleteFromCart, getMyCart, updatePurchase } from '@/services/cart'
import { CartItem } from '@/types/common'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

type CartContextType = {
  items: Item[]
  handleGetMyCart: () => void
  handleAddToCart: (val: CartItem) => void
  handleRemoveFromCart: (id: number) => void
  updateItemAmount: (id: number, amount: number) => void
  updateSelected: (id: number, isSelect: boolean) => void
  getSelectedCartItems: () => Item[]
  confirmPurchase: () => void
}

export type Item = CartItem & {
  isSelect: boolean
}

const CartContext = createContext<CartContextType | null>(null)

type CartProviderProps = {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useImmer<Item[]>([])

  useEffect(() => {
    handleGetMyCart()
  }, [])

  const handleGetMyCart = () => {
    getMyCart().then((res) => {
      const newItems = (res?.data?.data || []).map((opt) => ({
        id: opt.id,
        amount: opt.qty,
        imgUrl: opt.imgs[0],
        title: opt.title,
        price: opt.price,
        originPrice: opt.marketprice,
        productItemTitle: opt.productitem_title,
        productItemId: opt.productitem_id,
        tags: opt.tags.split(','),
        isSelect: false,
      }))
      setItems(newItems)
    })
  }

  const handleAddToCart = (val: CartItem) => {
    addToCart(val.productItemId || 0, val.amount || 1).then(() => handleGetMyCart())
  }

  const handleRemoveFromCart = (id: number) => {
    deleteFromCart(id)
    setItems((draft) => draft.filter((opt) => opt.id !== id))
  }

  const updateSelected = (id: number, isSelect: boolean) => {
    setItems((draft) => draft.map((opt) => (opt.id === id ? { ...opt, isSelect: isSelect } : opt)))
  }

  const confirmPurchase = () => {
    const selected = getSelectedCartItems()
    const request: CartReq[] = []
    selected.forEach((opt) => {
      request.push({
        productitem_id: opt.productItemId || 0,
        qty: opt.amount || 1,
        online: opt.isSelect ? 1 : 0,
      })
    })
    updatePurchase(request)
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
        handleGetMyCart,
        handleAddToCart,
        handleRemoveFromCart,
        updateSelected,
        updateItemAmount,
        getSelectedCartItems,
        confirmPurchase,
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
