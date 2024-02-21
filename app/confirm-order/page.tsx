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
import React from 'react'
import { useImmer } from 'use-immer'
import { addOrder } from '@/services/order'
import { useAuthContext } from '@/context/AuthContext'
import { handleFee, handleLabel } from '@/lib/payment'

const ConfirmBillPage = () => {
  const { user } = useAuthContext()
  const { webSettingsData } = useWebSettingsContext()
  const { getSelectedCartItems } = useCartContext()
  const { selectedAddress } = useAddressContext()
  const [payStatus, setPayStatus] = useImmer<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useImmer(false)
  const [discount, setDiscount] = useImmer<{ code: string; discount: number } | null>(null)

  const handleAddOrder = () => {
    addOrder({
      domain_title: webSettingsData?.domain,
      member_id: user?.id || 0,
      member_name: user?.name || '',
      LogisticsSubType: selectedAddress?.LogisticsSubType || '',
      CVSStoreName: selectedAddress?.CVSStoreName || '',
      discount_code: discount?.code || '',
      CVSAddress: selectedAddress?.CVSAddress || '',
      CVSStoreID: selectedAddress?.CVSStoreID || '',
      paystatus: payStatus || '',
      rname: selectedAddress?.name || '',
      rtel: selectedAddress?.tel || '',
      rcity1: selectedAddress?.city1 || '',
      rcity2: selectedAddress?.city2 || '',
      raddress: selectedAddress?.address || '',
    })
  }

  const items = getSelectedCartItems()
  const total = items.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.amount || 0) * (currentValue.price || currentValue.originPrice),
    0,
  )

  const btnDisable =
    !payStatus || (!selectedAddress?.address && !selectedAddress?.CVSAddress) || items.length === 0

  const logisticFee = handleFee(
    webSettingsData || null,
    total,
    selectedAddress?.LogisticsSubType !== 'home-delivery',
  )

  return (
    <main className="h-full min-h-screen">
      <Title title="確認訂單" goBackUrl="/shopping-cart" />
      <div className={'flex min-h-screen w-full flex-col items-center bg-default'}>
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
                originPrice={opt.originPrice}
                productItemTitle={opt.productItemTitle}
                productItemId={opt.productItemId}
              />
            ))}
          </div>
        </div>
        <div className="w-full px-4">
          <Discount onDiscount={(code, discount) => setDiscount({ code, discount })} />
        </div>
        <div className="w-full p-4">
          <div className="rounded-lg bg-white p-2">
            <PaymentSetting onChange={(val) => setPayStatus(val)} />
          </div>
        </div>
        <PayConfirm discount={discount} onConfirm={() => setIsDialogOpen(true)} />
      </div>
      {isDialogOpen && (
        <BottomDialog className="h-auto" title="確認訂單" onClose={() => setIsDialogOpen(false)}>
          <div>
            <div className="flex items-center justify-center p-4 text-4xl font-bold">
              ${total + logisticFee - (discount?.discount || 0)}
            </div>
            <div className="flex items-center justify-between border-b py-2">
              <span>付款方式</span>
              <span>{handleLabel(payStatus || '', webSettingsData)}</span>
            </div>
            <div className="mb-2 flex items-center justify-between border-b py-2">
              <span>收件地址</span>
              <div className="flex flex-col">
                <span>{selectedAddress?.address || selectedAddress?.CVSStoreName}</span>
                {selectedAddress?.CVSAddress && <span>{selectedAddress?.CVSAddress}</span>}
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between border-b py-2">
              <span>收件人</span>
              <span>{selectedAddress?.name}</span>
            </div>
            <Button
              disabled={btnDisable}
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
