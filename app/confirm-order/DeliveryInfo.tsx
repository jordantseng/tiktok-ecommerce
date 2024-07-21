'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAddressContext } from '@/context/AddressContext'
import { useWebSettingsContext } from '@/context/WebSettingsContext'
import { deliveryMap } from '@/lib/payment'
import { cn } from '@/lib/utils'
import { ChevronRight, MapPinIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  onClick: () => void
}

const DeliveryInfo = ({ onClick }: Props) => {
  const { webSettingsData } = useWebSettingsContext()
  const { selectedAddress, deliveryType } = useAddressContext()

  const renderStoreIcon = () => {
    switch (deliveryType) {
      case 'FAMIC2C':
        return <Image className="object-cover" alt="FAMIC2C" fill src="/family.png" />
      // case 'HILIFEC2C':
      //   return <Image className="object-cover" alt="HILIFEC2C" fill src="/hilife.png" />
      case 'UNIMARTC2C':
        return <Image className="object-cover" alt="FAMIC2C" fill src="/seven.png" />
      default:
        return <MapPinIcon className="object-cover font-semibold text-red-400" />
    }
  }
  return (
    <>
      <div
        className="flex cursor-pointer justify-between rounded-lg bg-white pl-2"
        onClick={onClick}
      >
        <div className="flex items-center space-x-2">
          <div className="relative flex h-[18px] min-w-[18px]">
            <Image alt="info" fill src="/truck.png" />
          </div>
          <span>寄送方式</span>
        </div>
        <div className="flex">
          {deliveryType && (
            <div className="flex items-center">
              <span className="font-light">{deliveryMap[deliveryType]}</span>
              <span className="ml-2 text-red-400">
                $
                {deliveryType === 'HOME_DELIVERY'
                  ? webSettingsData?.logisticprice_home
                  : webSettingsData?.logisticprice_cvs}
              </span>
            </div>
          )}
          <Button className="font-light" variant="ghost">
            <ChevronRight />
          </Button>
        </div>
      </div>
      <Separator />
      {(!deliveryType || !selectedAddress) && (
        <div className="font-lg flex items-center justify-center font-bold text-red-400">
          ⚠️請選擇寄送方式才能確認訂單⚠️
        </div>
      )}
      <div className="w-full cursor-pointer p-4 pb-0" onClick={onClick}>
        {selectedAddress && (
          <div className="flex flex-col items-center rounded-lg bg-white p-2">
            <div className="flex w-full items-center p-2">
              <span className="font-semibold">
                取貨人： {selectedAddress.name} {selectedAddress.tel}
              </span>
            </div>
            <div className="flex w-full items-center p-2">
              <div className="flex w-full flex-col justify-between">
                {selectedAddress.CVSStoreName && (
                  <span className="flex gap-x-2">
                    <MapPinIcon className="font-semibold text-red-400" />
                    {selectedAddress.CVSStoreName}
                  </span>
                )}
                <div className={cn('flex items-center', { 'pt-4': selectedAddress.CVSStoreName })}>
                  <div
                    className={cn('relative', {
                      'min-h-20 w-24': selectedAddress.CVSStoreName,
                      'flex w-10 items-center': !selectedAddress.CVSStoreName,
                    })}
                  >
                    {renderStoreIcon()}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="p-2 font-light">
                      {selectedAddress.CVSAddress || selectedAddress.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* {(
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
            )} */}
      </div>
    </>
  )
}

export default DeliveryInfo
