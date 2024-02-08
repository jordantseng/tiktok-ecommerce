'use client'

import CartItem from '@/components/CartItem'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAddressContext } from '@/context/AddressContext'
import { useCartContext } from '@/context/CartContext'
import { ChevronRight, MapPinIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import PaymentSetting from './PaymentSetting'
import { useInitialContext } from '@/context/InitailContext'

const ConfirmBillPage = () => {
  const router = useRouter()
  const { initialData } = useInitialContext()
  const { getSelectedCartItems } = useCartContext()
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

  const items = getSelectedCartItems()
  const total = items.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.amount || 0) * (currentValue.specialPrize || currentValue.prize),
    0,
  )

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
          {selectedAddress ? (
            <div className="flex flex-col items-center rounded-lg bg-white p-2">
              <div className="flex w-full items-center p-2">
                <span className="font-semibold">
                  取貨人： {selectedAddress.name} {selectedAddress.tel}
                </span>
              </div>
              <Separator />
              <div className="flex w-full items-center p-2">
                <div className="flex w-full flex-col justify-between">
                  <span className="flex gap-x-2">
                    <MapPinIcon className="font-semibold text-red-400" />{' '}
                    {selectedAddress.CVSStoreName}
                  </span>
                  <div className="flex justify-between">
                    <span className="p-2 font-light">
                      {selectedAddress.CVSAddress || selectedAddress.address}
                    </span>
                    <Link href="/confirm-order/choose-receipt">
                      <Button variant="ghost">
                        <ChevronRight />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center rounded-lg bg-white p-2">
              <div className="flex w-full items-center justify-between p-2">
                <span className="font-semibold">請選擇收件地址</span>
                <Link href="/confirm-order/choose-receipt">
                  <Button variant="ghost">
                    <ChevronRight />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="w-full p-4">
          <div className="rounded-lg bg-white">
            {items.map((opt, index) => (
              <CartItem
                key={opt.id}
                id={opt.id}
                amount={opt.amount}
                unit={opt.unit}
                editable={false}
                imgUrl={opt.imgUrl}
                title={opt.title}
                prize={opt.prize}
                tags={opt.tags}
                specialPrize={opt.specialPrize}
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
            <PaymentSetting />
          </div>
        </div>
        <div className="mb-[18px] flex w-full justify-end bg-white px-6 py-6">
          <div className="flex items-center space-x-4">
            <div className="flex w-full flex-col">
              <div className="flex items-center justify-end">
                <span className=" flex text-red-400">${total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="break-keep">運費：</span>
                <span className="flex justify-center text-red-400">
                  ${initialData?.logisticprice}
                </span>
              </div>
              <div className="flex justify-end justify-between">
                <span className="break-keep">折扣：</span>
                <span className="mb-2 flex border-b-2 text-red-400">-$60</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="break-keep">總計：</span>$
                <span className="flex justify-center text-lg font-semibold text-red-400">
                  {total + (initialData?.logisticprice || 0) - 60}
                </span>
              </div>
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
