'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAddressContext } from '@/context/AddressContext'
import { deliveryMap } from '@/lib/payment'
import { cn } from '@/lib/utils'
import { ChevronRight, MapPinIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DeliveryInfo = () => {
  const { selectedAddress, deliveryType } = useAddressContext()

  const renderStoreIcon = () => {
    switch (deliveryType) {
      case 'FAMIC2C':
        return <Image className="object-cover" alt="FAMIC2C" fill src="/family.png" />
      case 'HILIFEC2C':
        return <Image className="object-cover" alt="HILIFEC2C" fill src="/hilife.png" />
      case 'UNIMARTC2C':
        return <Image className="object-cover" alt="FAMIC2C" fill src="/seven.png" />
      default:
        return <MapPinIcon className="object-cover font-semibold text-red-400" />
    }
  }
  return (
    <>
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
                {selectedAddress.CVSStoreName && (
                  <span className="flex gap-x-2">
                    <MapPinIcon className="font-semibold text-red-400" />
                    {selectedAddress.CVSStoreName}
                  </span>
                )}
                <div className={cn('flex items-center', { 'pt-4': selectedAddress.CVSStoreName })}>
                  <div
                    className={cn('relative min-h-24', {
                      'w-28': selectedAddress.CVSStoreName,
                      'flex w-10 items-center': !selectedAddress.CVSStoreName,
                    })}
                  >
                    {renderStoreIcon()}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="p-2 font-light">
                      {selectedAddress.CVSAddress || selectedAddress.address}
                    </span>
                    <Link href="/confirm-order/choose-receipt">
                      <Button className="font-light" variant="ghost">
                        切換
                        <ChevronRight />
                      </Button>
                    </Link>
                  </div>
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
    </>
  )
}

export default DeliveryInfo
