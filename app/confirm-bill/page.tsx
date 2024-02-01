'use client'

import CartItem from '@/components/CartItem'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useCartContext } from '@/context/CartContext'
import {
  ChevronLeft,
  ChevronRight,
  CreditCardIcon,
  MapPinIcon,
  StoreIcon,
  TruckIcon,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useImmer } from 'use-immer'

const ConfirmBillPage = () => {
  const [count, setCount] = useImmer([1, 1])
  const [total, setTotal] = useImmer(0)
  const { items, updateSelected, getSelectedCartItems } = useCartContext()

  return (
    <main className="h-full">
      <header className="flex items-center justify-between bg-white px-4 pb-4 pt-6">
        <Link href="/shopping-cart">
          <ChevronLeft />
        </Link>

        <h4 className="mb-2 ml-auto mr-auto flex scroll-m-20 text-xl font-normal tracking-tight">
          確認訂單
        </h4>
      </header>
      <div className="flex w-full flex-col items-center justify-center bg-default">
        <div className="w-full p-4 pb-0">
          <div className="flex items-center justify-between rounded-lg bg-white p-2">
            <span>取貨方式</span>
            <Link href="/confirm-bill/choose-delivery">
              <Button className="font-light" variant="ghost">
                超商取貨 <ChevronRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full p-4 pb-0">
          <div className="flex flex-col items-center rounded-lg bg-white p-2">
            <div className="flex w-full items-center p-2">
              <span className="font-semibold">取貨人： 蓋瑞 0912344355</span>
            </div>
            <Separator />
            <div className="flex w-full items-center p-2">
              <div className="flex w-full flex-col justify-between">
                <span className="flex gap-x-2">
                  <MapPinIcon className="font-semibold text-red-400" /> 全家中正店
                </span>
                <div className="flex justify-between">
                  <span className="p-2 font-light">台北市中正區每人里中正路123號5巷13-2一樓</span>
                  <Link href="/confirm-bill/choose-receipt">
                    <Button variant="ghost">
                      <ChevronRight />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-4">
          <div className="rounded-lg bg-white">
            {items.map((opt, index) => (
              <CartItem
                isChecked={opt.isSelect}
                key={opt.id}
                id={opt.id}
                amount={count[index]}
                unit="標準款"
                editable={false}
                imgUrl={opt.imgUrl}
                title={opt.title}
                prize={opt.prize}
                tags={opt.tags}
                specialPrize={opt.specialPrize}
                onSelect={(res) => {
                  if (res) {
                    setTotal((draft) => draft + count[index] * (opt.specialPrize || opt.prize))
                    updateSelected(opt.id, res)
                  } else {
                    setTotal((draft) => draft - count[index] * (opt.specialPrize || opt.prize))
                    updateSelected(opt.id, res)
                  }
                }}
                onChange={(val) => {
                  const isMinus = val < count[index]
                  setCount((draft) => {
                    draft[index] = val
                  })
                  const nowItems = getSelectedCartItems()
                  nowItems.forEach((el) => {
                    if (opt.id === opt.id) {
                      setTotal(
                        isMinus
                          ? total - (el.specialPrize || el.prize)
                          : total + (el.specialPrize || el.prize),
                      )
                    }
                  })
                }}
              />
            ))}
          </div>
        </div>
        <div className="w-full px-4">
          <div className="flex items-center justify-between rounded-lg bg-white p-2">
            <span>優惠券</span>
            <Button className="font-light" variant="ghost">
              <span className="text-red-400">-$60</span> <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="w-full p-4">
          <div className="rounded-lg bg-white p-2">
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center justify-between space-x-2 bg-white p-4">
                <div className="flex items-center space-x-2">
                  <CreditCardIcon />
                  <Label htmlFor="r1">信用卡</Label>
                </div>
                <RadioGroupItem value="default" id="r1" />
              </div>
              <div className="flex items-center justify-between space-x-2 bg-white p-4">
                <div className="flex items-center space-x-2">
                  <TruckIcon />
                  <Label htmlFor="r2">貨到付款</Label>
                </div>
                <RadioGroupItem value="comfortable" id="r2" />
              </div>
              <div className="flex items-center justify-between space-x-2 bg-white p-4">
                <div className="flex items-center space-x-2">
                  <StoreIcon />
                  <Label htmlFor="r3">超商取貨付款</Label>
                </div>
                <RadioGroupItem value="compact" id="r3" />
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="mb-[18px] flex w-full justify-end bg-white px-6 py-6">
          <div className="flex items-center space-x-4">
            <div className="felx">
              <span>總計：</span>
              <span className="text-lg font-semibold text-red-400">${total}</span>
            </div>
            <Link href="/">
              <Button className="w-[4/12] rounded-3xl bg-primary">提交訂單</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ConfirmBillPage
