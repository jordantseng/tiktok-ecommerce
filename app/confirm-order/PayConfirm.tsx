'use client'

import { useCartContext } from '@/context/CartContext'
import React from 'react'
import { useWebSettingsContext } from '@/context/WebSettingsContext'
import { Button } from '@/components/ui/button'
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
      <div className="flex w-full items-center justify-between bg-white px-6">
        <span className="mr-1 flex items-center">共計:</span>
        <span className="mr-4 flex items-center md:mr-8">{items.length}件</span>
        <div className="flex items-center justify-between">
          <span className="break-keep">總計：</span>
          <span className="flex justify-center text-lg font-semibold text-red-400">
            ${total + logisticFee - (discount?.discount || 0)}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="m-4 w-auto rounded-3xl bg-primary p-4" onClick={onConfirm}>
            確認訂單
          </Button>
        </div>
      </div>
    </>
  )
}

export default PayConfirm
