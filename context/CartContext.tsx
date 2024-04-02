'use client'
import {
  CartBodyItem,
  CartReq,
  addToCart,
  addToCarts,
  deleteFromCart,
  getMyCart,
  updatePurchase,
} from '@/services/cart'
import { CartItem } from '@/types/common'
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

type CartContextType = {
  items: Item[]
  handleGetMyCart: () => void
  handleAddToCart: (val: CartItem) => void
  handleAddToCarts: (carts: CartBodyItem[]) => void
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

  const handleGetMyCart = useCallback(() => {
    getMyCart().then((res) => {
      const newItems = (res?.data?.data || []).map((opt) => ({
        id: opt.id,
        amount: opt.qty,
        imgUrl: opt.imgs[0],
        title: opt.title,
        price: opt.price,
        originPrice: opt.marketprice,
        product_id: opt.product_id,
        productItemTitle: opt.productitem_title,
        productItemId: opt.productitem_id,
        unit: opt.unit,
        tags: opt?.tags?.split(','),
        isSelect: opt.online ? true : false,
      }))
      setItems(newItems)
    })
  }, [setItems])

  const handleAddToCart = (val: CartItem) => {
    const targetItem = items.find((opt) => opt.productItemId === val.productItemId)
    addToCart(val.productItemId || 0, (targetItem?.amount || 0) + (val.amount || 1)).then(() =>
      handleGetMyCart(),
    )
  }

  const handleAddToCarts = (carts: CartBodyItem[]) => {
    addToCarts(carts).then(() => handleGetMyCart())
  }

  const handleRemoveFromCart = (id: number) => {
    deleteFromCart(id)
    setItems((draft) => draft.filter((opt) => opt.id !== id))
  }

  const updateSelected = (id: number, isSelect: boolean) => {
    setItems((draft) => draft.map((opt) => (opt.id === id ? { ...opt, isSelect: isSelect } : opt)))
  }

  const confirmPurchase = () => {
    const request: CartReq[] = []
    items.forEach((opt) => {
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
        handleAddToCarts,
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
