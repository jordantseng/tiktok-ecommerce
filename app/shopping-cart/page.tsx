'use client'

import CartItem from '@/components/CartItem'
import MerchandiseCard from '@/components/MerchandiseCard'
import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useCartContext } from '@/context/CartContext'
import React, { useState } from 'react'
import { useImmer } from 'use-immer'

const ShoppingCartPage = () => {
  const [count, setCount] = useImmer([1, 1])
  const [total, setTotal] = useState(0)
  const { items, updateSelected, getSelectedCartItems } = useCartContext()

  const handleCheckAll = (res: boolean) => {
    console.log(res)
  }

  return (
    <main className="mb-16">
      <header className="flex items-center justify-between bg-white px-4 pb-4 pt-6">
        <h4 className="mb-2 ml-auto mr-auto flex scroll-m-20 text-xl font-normal tracking-tight">
          購物車
        </h4>
      </header>
      <div className="bg-default flex w-full flex-col items-center justify-center">
        <div className="w-full p-4">
          <div className="rounded-lg bg-white">
            {items.map((opt, index) => (
              <CartItem
                key={opt.id}
                id={opt.id}
                amount={count[index]}
                editable={true}
                imgUrl={opt.imgUrl}
                title={opt.title}
                prize={opt.prize}
                tags={opt.tags}
                specialPrize={opt.specialPrize}
                onSelect={(res) => {
                  if (res) {
                    setTotal(total + count[index] * (opt.specialPrize || opt.prize))
                    updateSelected(opt.id, res)
                  } else {
                    setTotal(total - count[index] * (opt.specialPrize || opt.prize))
                    updateSelected(opt.id, res)
                  }
                }}
                onChange={(val) => {
                  setCount((draft) => {
                    draft[index] = val
                  })
                  const nowItems = getSelectedCartItems()
                  nowItems.forEach((el) => {
                    if (opt.id === opt.id) {
                      setTotal(total + count[index] * (el.specialPrize || el.prize))
                    }
                  })
                }}
              />
            ))}
          </div>
        </div>

        <div className="font-lg mb-2 flex items-center justify-center font-semibold">
          ✨為你推薦✨
        </div>
        <div className="mb-5 flex w-full items-center justify-center gap-x-1.5 p-2">
          <MerchandiseCard
            id={12345}
            className="max-h-[320px] w-[50%] md:w-auto"
            imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
            title="PS5"
            tags={['game', 'tv']}
            prize={18800}
            specialPrize={13000}
            unit="台"
          />
          <MerchandiseCard
            id={55555}
            className="max-h-[320px] w-[50%] md:w-auto"
            imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
            title="PS5 GGGHHGHGHGHGHGHGHGHGHGHG"
            tags={['game', 'tv']}
            prize={18800}
            unit="台"
          />
        </div>
        <div className="mb-[18px] flex w-full justify-between bg-white px-6 py-6">
          <div className="text-md flex items-center space-x-2">
            <Checkbox id="terms" onCheckedChange={handleCheckAll} />
            <label htmlFor="terms" className="text-lg font-medium">
              全選
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <div className="felx">
              <span>總計：</span>
              <span className="text-lg font-semibold text-red-400">${total}</span>
            </div>
            <Button className="w-[4/12] rounded-3xl bg-primary">結帳</Button>
          </div>
        </div>
      </div>
      <NavBar />
    </main>
  )
}

export default ShoppingCartPage
