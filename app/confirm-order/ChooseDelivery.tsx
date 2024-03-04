'use client'

import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Delivery, useAddressContext } from '@/context/AddressContext'
import { useWebSettingsContext } from '@/context/WebSettingsContext'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ChooseDelivery = () => {
  const { webSettingsData } = useWebSettingsContext()
  const router = useRouter()
  const { handleSelectDeliveryType, deliveryType, resetSelectAddress } = useAddressContext()
  const handleClick = () => router.push('/confirm-order/choose-receipt')
  return (
    <RadioGroup
      className="w-full bg-white"
      defaultValue={deliveryType || ''}
      onValueChange={(val) => {
        resetSelectAddress()
        handleSelectDeliveryType(val as Delivery)
      }}
    >
      <div className="space-y-2 p-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20">宅配到府</div>
            {webSettingsData?.logisticprice && (
              <div className="text-red-400">${webSettingsData?.logisticprice}</div>
            )}
          </div>
          <RadioGroupItem value="HOME_DELIVERY" id="HOME_DELIVERY" />
        </div>
        <Separator />
        <Button
          className="mx-auto flex items-center justify-center text-red-400"
          variant="ghost"
          disabled={deliveryType !== 'HOME_DELIVERY'}
          onClick={handleClick}
        >
          ＋新增 宅配地址
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2 p-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20">全家</div>
            {webSettingsData?.logisticprice_csv && (
              <div className="text-red-400">${webSettingsData?.logisticprice_csv}</div>
            )}
          </div>
          <RadioGroupItem value="FAMIC2C" id="FAMIC2C" />
        </div>
        <Separator />
        <Button
          className="mx-auto flex items-center justify-center text-red-400"
          variant="ghost"
          disabled={deliveryType !== 'FAMIC2C'}
          onClick={handleClick}
        >
          ＋新增 全家門市
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2 p-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20">7-11</div>
            {webSettingsData?.logisticprice_csv && (
              <div className="text-red-400">${webSettingsData?.logisticprice_csv}</div>
            )}
          </div>
          <RadioGroupItem value="UNIMARTC2C" id="UNIMARTC2C" />
        </div>
        <Separator />
        <Button
          className="mx-auto flex items-center justify-center text-red-400"
          variant="ghost"
          disabled={deliveryType !== 'UNIMARTC2C'}
          onClick={handleClick}
        >
          ＋新增 7-11門市
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2 p-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20">萊爾富</div>
            {webSettingsData?.logisticprice_csv && (
              <div className="text-red-400">${webSettingsData?.logisticprice_csv}</div>
            )}
          </div>
          <RadioGroupItem value="HILIFEC2C" id="HILIFEC2C" />
        </div>
        <Separator />
        <Button
          className="mx-auto flex items-center justify-center text-red-400"
          variant="ghost"
          disabled={deliveryType !== 'HILIFEC2C'}
          onClick={handleClick}
        >
          ＋新增 萊爾富門市
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </RadioGroup>
  )
}

export default ChooseDelivery
