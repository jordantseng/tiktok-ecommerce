'use client'

import CartItem from '@/components/CartItem'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useAddressContext } from '@/context/AddressContext'
import { useCartContext } from '@/context/CartContext'
import {
  ChevronRight,
  CircleDollarSignIcon,
  CreditCardIcon,
  MapPinIcon,
  StoreIcon,
  TruckIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useImmer } from 'use-immer'

const ConfirmBillPage = () => {
  const router = useRouter()
  const [count, setCount] = useImmer([1, 1])
  const [total, setTotal] = useImmer(0)
  const { items, updateSelected, getSelectedCartItems } = useCartContext()
  const { selectedAddress, deliveryType } = useAddressContext()
  const deliveryMap = {
    'home-delivery': '宅配到府',
    FAMIC2C: '超商取貨-全家',
    UNIMARTC2C: '超商取貨-7-11',
    HILIFEC2C: '超商取貨-萊爾富',
  }

  const handleAddOrder = () => {
    router.push('/confirm-order/success')
  }

  return (
    <main className="h-full">
      <Title title="確認訂單" goBackUrl="/shopping-cart" />
      <div className="flex w-full flex-col items-center justify-center bg-default">
        <div className="w-full p-4 pb-0">
          <div className="flex items-center justify-between rounded-lg bg-white p-2">
            <span>取貨方式</span>
            <Link href="/confirm-order/choose-delivery">
              <Button className="font-light" variant="ghost">
                {deliveryMap[deliveryType]} <ChevronRight />
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
                  <Link href="/confirm-order/choose-receipt">
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
            <span>優惠券：</span>
            <Input className="w-[40%]" placeholder="請輸入優惠代碼" onChange={() => {}} />
            <Button className="w-[30%]">確認兌換</Button>
          </div>
        </div>
        <div className="w-full p-4">
          <div className="rounded-lg bg-white p-2">
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center justify-between space-x-2 bg-white p-4">
                <div className="flex items-center space-x-2">
                  <CreditCardIcon />
                  <Label htmlFor="r1">信用卡一次付清</Label>
                </div>
                <RadioGroupItem value="1" id="r1" />
              </div>
              <div className="flex items-center justify-between space-x-2 bg-white p-4">
                <div className="flex items-center space-x-2">
                  <CreditCardIcon />
                  <Label htmlFor="r2">信用卡分期</Label>
                </div>
                <RadioGroupItem value="2" id="r2" />
              </div>
              <div className="flex items-center justify-between space-x-2 bg-white p-4">
                <div className="flex items-center space-x-2">
                  <CreditCardIcon />
                  <Label htmlFor="r3">無卡分期</Label>
                </div>
                <RadioGroupItem value="3" id="r3" />
              </div>
              <div className="flex items-center justify-between space-x-2 bg-white p-4">
                <div className="flex items-center space-x-2">
                  <CircleDollarSignIcon />
                  <Label htmlFor="r4">ATM轉帳</Label>
                </div>
                <RadioGroupItem value="4" id="r4" />
              </div>
              <div className="flex items-center justify-between space-x-2 bg-white p-4">
                <div className="flex items-center space-x-2">
                  <TruckIcon />
                  <Label htmlFor="r5">貨到付款</Label>
                </div>
                <RadioGroupItem value="5" id="r5" />
              </div>
              <div className="flex items-center justify-between space-x-2 bg-white p-4">
                <div className="flex items-center space-x-2">
                  <StoreIcon />
                  <Label htmlFor="r6">超商取貨付款</Label>
                </div>
                <RadioGroupItem value="6" id="r6" />
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="mb-[18px] flex w-full justify-end bg-white px-6 py-6">
          <div className="flex items-center space-x-4">
            <span className="break-keep">總計：</span>
            <div className="flex w-full flex-col">
              <span className="flex justify-center text-lg font-semibold text-red-400">
                ${total}
              </span>
              <span className="m-2 flex justify-center border-b-2 text-red-400">-60</span>
              <span className="flex justify-center text-red-400">${total - 60}</span>
            </div>
            <Button className="m-4 w-[50%] rounded-3xl bg-primary p-4" onClick={handleAddOrder}>
              確認訂單
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ConfirmBillPage
