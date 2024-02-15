'use client'

import CartItem from '@/components/CartItem'
import Title from '@/components/Title'
import BottomDialog from '@/components/BottomDialog'
import { Button } from '@/components/ui/button'
import { useAddressContext } from '@/context/AddressContext'
import { useCartContext } from '@/context/CartContext'
import { useWebSettingsContext } from '@/context/WebSettingsContext'
import PayConfirm from '@/app/confirm-order/PayConfirm'
import Discount from '@/app/confirm-order/DIscount'
import DeliveryInfo from '@/app/confirm-order/DeliveryInfo'
import PaymentSetting from '@/app/confirm-order/PaymentSetting'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useImmer } from 'use-immer'

const ConfirmBillPage = () => {
  const router = useRouter()
  const { webSettingsData } = useWebSettingsContext()
  const { getSelectedCartItems } = useCartContext()
  const { selectedAddress } = useAddressContext()
  const [payStatus, setPayStatus] = useImmer<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useImmer(false)

  const handleAddOrder = () => {
    router.push('/confirm-order/success')
  }

  const items = getSelectedCartItems()
  const total = items.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.amount || 0) * (currentValue.specialPrice || currentValue.price),
    0,
  )

  return (
    <main className="h-full">
      <Title title="確認訂單" goBackUrl="/shopping-cart" />
      <div className="flex h-screen w-full flex-col items-center bg-default">
        <DeliveryInfo />
        <div className="w-full p-4">
          <div className="rounded-lg bg-white">
            {items.map((opt) => (
              <CartItem
                key={opt.id}
                id={opt.id}
                amount={opt.amount}
                editable={false}
                imgUrl={opt.imgUrl}
                title={opt.title}
                price={opt.price}
                tags={opt.tags}
                specialPrice={opt.specialPrice}
              />
            ))}
          </div>
        </div>
        <div className="w-full px-4">
          <Discount onDiscount={(val) => console.log(val)} />
        </div>
        <div className="w-full p-4">
          <div className="rounded-lg bg-white p-2">
            <PaymentSetting onChange={(val) => setPayStatus(val)} />
          </div>
        </div>
        <PayConfirm onConfirm={() => setIsDialogOpen(true)} />
      </div>
      {isDialogOpen && (
        <BottomDialog title="確認訂單" onClose={() => setIsDialogOpen(false)}>
          <div>
            <div className="flex items-center justify-center p-4 text-4xl font-bold">
              ${total + (webSettingsData?.logisticprice || 0) - 60}
            </div>
            <div className="flex items-center justify-between border-b py-2">
              <span>付款方式</span>
              <span>{payStatus}</span>
            </div>
            <div className="mb-2 flex items-center justify-between border-b py-2">
              <span>收件人</span>
              <span>{selectedAddress?.name}</span>
            </div>
            <Button
              disabled={!payStatus || !selectedAddress?.address}
              className="w-full rounded-full"
              variant="primary"
              onClick={handleAddOrder}
            >
              確認付款
            </Button>
          </div>
        </BottomDialog>
      )}
    </main>
  )
}

export default ConfirmBillPage
