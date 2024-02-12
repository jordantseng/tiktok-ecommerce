'use client'

import CartItem from '@/components/CartItem'
import MerchandiseCard from '@/components/MerchandiseCard'
import NavBar from '@/components/NavBar'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Item, useCartContext } from '@/context/CartContext'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'

const ShoppingCartPage = () => {
  const [total, setTotal] = useImmer(0)
  const { items, updateSelected, getSelectedCartItems, updateItemAmount } = useCartContext()

  const handleCheckAll = (res: boolean) => {
    let sum = 0
    items.forEach((opt) => {
      if (res) {
        sum += (opt.amount || 0) * (opt.specialPrice || opt.price)
      }
      updateSelected(opt.id, res)
    })
    setTotal(sum)
  }

  useEffect(() => {
    const arr = getSelectedCartItems()
    const sum = arr.reduce(
      (accumulator, currentValue) =>
        accumulator +
        (currentValue.amount || 0) * (currentValue.specialPrice || currentValue.price),
      0,
    )
    setTotal(sum)
  }, [getSelectedCartItems, setTotal])

  const handlePriceChange = (item: Item, val: number) => {
    const isMinus = val < (item.amount || 0)
    const nowItems = getSelectedCartItems()
    updateItemAmount(item.id, val)
    nowItems.forEach((el) => {
      if (item.id === el.id) {
        setTotal(
          isMinus ? total - (el.specialPrice || el.price) : total + (el.specialPrice || el.price),
        )
      }
    })
  }

  const handleSelect = (item: Item, res: boolean) => {
    const prizeAmount = item.specialPrice || item.price
    const updateAmount = (item.amount || 0) * prizeAmount

    setTotal((draft) => draft + (res ? updateAmount : -updateAmount))
    updateSelected(item.id, res)
  }

  return (
    <main className="mb-16 h-full min-h-screen">
      <Title title="購物車" />
      <div className="flex w-full flex-col items-center bg-default">
        <div className="w-full p-4">
          <div className="rounded-lg bg-white">
            {items.map((opt, index) => (
              <CartItem
                isChecked={opt.isSelect}
                key={opt.id}
                id={opt.id}
                amount={opt.amount}
                editable={true}
                imgUrl={opt.imgUrl}
                title={opt.title}
                price={opt.price}
                tags={opt.tags}
                specialPrice={opt.specialPrice}
                onSelect={(res) => handleSelect(opt, res)}
                onChange={(val) => handlePriceChange(opt, val)}
              />
            ))}
          </div>
        </div>

        <div className="font-lg mb-2 flex items-center justify-center font-semibold">
          ✨為你推薦✨
        </div>
        <div className="mb-5 flex w-full items-center justify-center gap-x-1.5 p-4 max-[320px]:block">
          <MerchandiseCard
            id={12345}
            className="h-auto w-[50%] max-[320px]:w-full"
            imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
            title="PS5"
            tags={['game', 'tv']}
            price={18800}
            specialPrice={13000}
          />
          <MerchandiseCard
            id={55555}
            className="h-auto w-[50%] max-[320px]:w-full"
            imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
            title="PS5 GGGHHGHGHGHGHGHGHGHGHGHG"
            tags={['game', 'tv']}
            price={18800}
          />
        </div>
        <div className="mb-[18px] flex w-full justify-between bg-white p-6">
          <div className="text-md flex items-center space-x-2">
            <Checkbox
              id="terms"
              onCheckedChange={handleCheckAll}
              checked={getSelectedCartItems().length === items.length}
            />
            <label htmlFor="terms" className="text-lg font-medium">
              全選
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <div className="felx">
              <span>總計：</span>
              <span className="text-lg font-semibold text-red-400">${total}</span>
            </div>
            <Link
              aria-disabled={total === 0}
              tabIndex={total === 0 ? -1 : undefined}
              style={{
                pointerEvents: total === 0 ? 'none' : 'auto',
              }}
              href="/confirm-order"
            >
              <Button className="w-[4/12] rounded-3xl bg-primary" disabled={total === 0}>
                結帳
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <NavBar />
    </main>
  )
}

export default ShoppingCartPage
