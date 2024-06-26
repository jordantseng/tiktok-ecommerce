'use client'

import { useCartContext } from '@/context/CartContext'
import React from 'react'
import { useWebSettingsContext } from '@/context/WebSettingsContext'
import { handleFee } from '@/lib/payment'
import { useAddressContext } from '@/context/AddressContext'
import Image from 'next/image'

type Props = {
  discount: { code: string; discount: number } | null
}

const PayDetail = ({ discount }: Props) => {
  const { webSettingsData } = useWebSettingsContext()
  const { getSelectedCartItems } = useCartContext()
  const { selectedAddress, deliveryType } = useAddressContext()

  const items = getSelectedCartItems()
  const total = items.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.amount || 0) * (currentValue.price || currentValue.originPrice),
    0,
  )

  const logisticFee = deliveryType
    ? handleFee(
        webSettingsData || null,
        total,
        Boolean(selectedAddress?.LogisticsSubType) &&
          selectedAddress?.LogisticsSubType !== 'HOME_DELIVERY',
      )
    : 0

  return (
    <div className="flex w-full flex-col justify-between bg-white p-2">
      <div className="flex items-center space-x-2">
        <div className="relative flex h-[18px] min-w-[18px]">
          <Image alt="info" fill src="/file.png" />
        </div>
        <span>付款詳情</span>
      </div>
      <div className="mt-2 flex items-center">
        <div className="flex w-full flex-col space-y-2">
          <div className="flex items-center justify-between text-sm font-light">
            <span className="break-keep">商品總金額：</span>
            <span className="flex">${total}</span>
          </div>
          <div className="flex items-center justify-between text-sm font-light">
            <span className="break-keep">運費總金額：</span>
            <span className="flex justify-center">${logisticFee}</span>
          </div>

          <div className="flex items-center justify-between text-sm font-light">
            <span className="break-keep">折扣折抵：</span>
            <span className="mb-2 flex border-b-2">-${discount?.discount || 0}</span>
          </div>
          <div className="flex items-center justify-between text-sm font-bold">
            <span className="break-keep">總付款金額：</span>
            <span className="flex justify-center text-lg font-semibold text-red-400">
              ${total + logisticFee - (discount?.discount || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayDetail
