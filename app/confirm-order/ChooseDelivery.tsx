'use client'

import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Delivery, useAddressContext } from '@/context/AddressContext'
import { useWebSettingsContext } from '@/context/WebSettingsContext'
import { getBaseURL } from '@/lib/utils'
import { getLogistic } from '@/services/address'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  onConfirm: () => void
}

const ChooseDelivery = ({ onConfirm }: Props) => {
  const { webSettingsData } = useWebSettingsContext()
  const router = useRouter()
  const { handleSelectDeliveryType, deliveryType, resetSelectAddress, selectedAddress } =
    useAddressContext()
  const handleClick = (type: string) => {
    const baseURL = getBaseURL(window.location.host)
    type !== 'HOME_DELIVERY'
      ? getLogistic(baseURL, type)
      : router.push('/confirm-order/upsert-receipt')
  }
  const renderReceipt = () => (
    <div className="flex w-full flex-col justify-between">
      {selectedAddress?.name && (
        <div className="flex w-full items-center p-2">
          <span className="font-semibold">
            取貨人： {selectedAddress?.name} {selectedAddress?.tel}
          </span>
        </div>
      )}
      {selectedAddress?.CVSStoreName && (
        <span className="flex gap-x-2 px-2">{selectedAddress.CVSStoreName}</span>
      )}
      <div className="flex items-center px-2">
        <div className="flex items-center justify-between">
          <span className="font-light">
            {selectedAddress?.CVSAddress || selectedAddress?.address}
          </span>
        </div>
      </div>
    </div>
  )
  return (
    <>
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
              {webSettingsData?.logisticprice_home && (
                <div className="text-red-400">${webSettingsData?.logisticprice_home}</div>
              )}
            </div>
            <RadioGroupItem value="HOME_DELIVERY" id="HOME_DELIVERY" />
          </div>
          <Separator />
          <Button
            className="mx-auto flex items-center justify-center text-red-400"
            variant="ghost"
            onClick={() => handleClick('HOME_DELIVERY')}
          >
            ＋新增 宅配地址
            <ChevronRight className="h-4 w-4" />
          </Button>
          {deliveryType === 'HOME_DELIVERY' && renderReceipt()}
        </div>
        <div className="space-y-2 p-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20">全家</div>
              {webSettingsData?.logisticprice_cvs && (
                <div className="text-red-400">${webSettingsData?.logisticprice_cvs}</div>
              )}
            </div>
            <RadioGroupItem value="FAMIC2C" id="FAMIC2C" />
          </div>
          <Separator />
          <Button
            className="mx-auto flex items-center justify-center text-red-400"
            variant="ghost"
            onClick={() => handleClick('FAMIC2C')}
          >
            ＋新增 全家門市
            <ChevronRight className="h-4 w-4" />
          </Button>
          {deliveryType === 'FAMIC2C' && renderReceipt()}
        </div>
        <div className="space-y-2 p-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20">7-11</div>
              {webSettingsData?.logisticprice_cvs && (
                <div className="text-red-400">${webSettingsData?.logisticprice_cvs}</div>
              )}
            </div>
            <RadioGroupItem value="UNIMARTC2C" id="UNIMARTC2C" />
          </div>
          <Separator />
          <Button
            className="mx-auto flex items-center justify-center text-red-400"
            variant="ghost"
            onClick={() => handleClick('UNIMARTC2C')}
          >
            ＋新增 7-11門市
            <ChevronRight className="h-4 w-4" />
          </Button>
          {deliveryType === 'UNIMARTC2C' && renderReceipt()}
        </div>
        {/* <div className="space-y-2 p-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20">萊爾富</div>
              {webSettingsData?.logisticprice_cvs && (
                <div className="text-red-400">${webSettingsData?.logisticprice_cvs}</div>
              )}
            </div>
            <RadioGroupItem value="HILIFEC2C" id="HILIFEC2C" />
          </div>
          <Separator />
          <Button
            className="mx-auto flex items-center justify-center text-red-400"
            variant="ghost"
            onClick={() => handleClick('HILIFEC2C')}
          >
            ＋新增 萊爾富門市
            <ChevronRight className="h-4 w-4" />
          </Button>
          {deliveryType === 'HILIFEC2C' && renderReceipt()}
        </div> */}
      </RadioGroup>
      <Button
        className="w-full rounded-full"
        variant="primary"
        disabled={!deliveryType || !selectedAddress}
        onClick={onConfirm}
      >
        確認
      </Button>
    </>
  )
}

export default ChooseDelivery
