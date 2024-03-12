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
import PayDetail from '@/app/confirm-order/PayDetail'
import React from 'react'
import { useImmer } from 'use-immer'
import { PayStatus, addOrder } from '@/services/order'
import { useAuthContext } from '@/context/AuthContext'
import { handleFee, handleLabel } from '@/lib/payment'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import ChooseDelivery from './ChooseDelivery'

const ConfirmBillPage = () => {
  const { user } = useAuthContext()
  const { webSettingsData } = useWebSettingsContext()
  const { getSelectedCartItems } = useCartContext()
  const { selectedAddress } = useAddressContext()
  const [payStatus, setPayStatus] = useImmer<PayStatus | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useImmer({
    open: false,
    type: 'pay',
  })
  const [discount, setDiscount] = useImmer<{ code: string; discount: number } | null>(null)

  const handleOpen = (type: string) => {
    setIsDialogOpen((draft) => {
      draft.open = true
      draft.type = type
    })
  }

  const handleClose = () => {
    setIsDialogOpen((draft) => {
      draft.open = false
    })
  }

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
      paystatus: payStatus!,
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
    selectedAddress?.LogisticsSubType !== 'HOME_DELIVERY',
  )

  return (
    <main className="h-full min-h-screen">
      <Title title="確認訂單" goBackUrl="/shopping-cart" />
      <div className={'flex min-h-screen w-full flex-col items-center bg-background'}>
        <div className="w-full p-4 pb-2">
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
        {total - (webSettingsData?.freelogisticprice || 0) < 0 && (
          <div className="flex items-center justify-center">
            <span className="break-keep text-xs font-bold text-red-400">
              您還差${(webSettingsData?.freelogisticprice || 0) - total},即可享有免運費
            </span>
          </div>
        )}
        <div className="w-full px-4 py-1">
          <div className="rounded-lg bg-white p-2">
            <DeliveryInfo onClick={() => handleOpen('delivery')} />
          </div>
        </div>
        <div className="w-full px-4 py-1">
          <div className="rounded-lg bg-white p-2">
            <Discount onDiscount={(code, discount) => setDiscount({ code, discount })} />
          </div>
        </div>
        <div className="w-full px-4 py-1">
          <div className="rounded-lg bg-white p-2">
            {/* <PaymentSetting onChange={(val) => setPayStatus(val)} /> */}
            <div className="flex items-center justify-between rounded-lg bg-white pl-2">
              <div className="flex items-center space-x-2">
                <div className="relative flex h-[18px] min-w-[18px]">
                  <Image alt="info" fill src="/money.png" />
                </div>
                <span>付款方式</span>
              </div>
              <Button className="font-light" variant="ghost" onClick={() => handleOpen('pay')}>
                {handleLabel(payStatus, webSettingsData)} <ChevronRight />
              </Button>
            </div>
            {!payStatus && (
              <div className="font-lg flex items-center justify-center font-bold text-red-400">
                ⚠️請選擇付款方式才能確認訂單⚠️
              </div>
            )}
          </div>
        </div>
        <div className="w-full px-4 py-1 pb-2">
          <div className="rounded-lg bg-white p-2">
            <PayDetail discount={discount} />
          </div>
        </div>
        <PayConfirm payStatus={payStatus} discount={discount} onConfirm={() => handleAddOrder()} />
      </div>
      {isDialogOpen.open && isDialogOpen.type === 'pay' && (
        <BottomDialog className="h-auto" title="選擇支付方式" onClose={handleClose}>
          <PaymentSetting
            value={payStatus}
            onChange={(val) => {
              setPayStatus(val)
              handleClose()
            }}
          />
        </BottomDialog>
      )}
      {isDialogOpen.open && isDialogOpen.type === 'delivery' && (
        <BottomDialog className="h-auto" title="選擇收件方式" onClose={handleClose}>
          <ChooseDelivery onConfirm={handleClose} />
        </BottomDialog>
      )}
      {/* {isDialogOpen && (
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
      )} */}
    </main>
  )
}

export default ConfirmBillPage
