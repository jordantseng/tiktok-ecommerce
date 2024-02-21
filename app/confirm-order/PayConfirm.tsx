'use client'

import { useCartContext } from '@/context/CartContext'
import React from 'react'
import { useWebSettingsContext } from '@/context/WebSettingsContext'
import { Button } from '@/components/ui/button'
import BottomDialog from '@/components/BottomDialog'
import { useImmer } from 'use-immer'
import { handleFee } from '@/lib/payment'
import { useAddressContext } from '@/context/AddressContext'

type Props = {
  discount: { code: string; discount: number } | null
  onConfirm: () => void
}

const PayConfirm = ({ discount, onConfirm }: Props) => {
  const { webSettingsData } = useWebSettingsContext()
  const { getSelectedCartItems } = useCartContext()
  const { selectedAddress } = useAddressContext()

  const items = getSelectedCartItems()
  const total = items.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.amount || 0) * (currentValue.price || currentValue.originPrice),
    0,
  )

  const logisticFee = handleFee(
    webSettingsData || null,
    total,
    selectedAddress?.LogisticsSubType !== 'HOME_DELIVERY',
  )

  return (
    <>
      <div className="mb-[18px] flex w-full items-center justify-between bg-white px-6 py-6">
        <span className="mr-1 flex items-center">共計:</span>
        <span className="mr-4 flex items-center md:mr-8">{items.length}件</span>
        <div className="flex items-center space-x-4">
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-end">
              <span className=" flex text-red-400">${total}</span>
            </div>
            {logisticFee > 0 && (
              <div className="flex items-center justify-between">
                <span className="break-keep">運費：</span>
                <span className="flex justify-center text-red-400">${logisticFee}</span>
              </div>
            )}
            {discount?.discount && (
              <div className="flex justify-end justify-between">
                <span className="break-keep">折扣：</span>
                <span className="mb-2 flex border-b-2 text-red-400">-${discount.discount}</span>
              </div>
            )}

            <div className="flex items-center justify-center">
              <span className="break-keep">總計：</span>
              <span className="flex justify-center text-lg font-semibold text-red-400">
                ${total + logisticFee - (discount?.discount || 0)}
              </span>
            </div>
          </div>
          <Button className="m-4 w-[50%] rounded-3xl bg-primary p-4" onClick={onConfirm}>
            確認訂單
          </Button>
        </div>
      </div>
    </>
  )
}

export default PayConfirm
