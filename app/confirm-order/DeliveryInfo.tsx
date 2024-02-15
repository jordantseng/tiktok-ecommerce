'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAddressContext } from '@/context/AddressContext'
import { ChevronRight, MapPinIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DeliveryInfo = () => {
  const { selectedAddress, deliveryType } = useAddressContext()
  const deliveryMap = {
    'home-delivery': '宅配到府',
    FAMIC2C: '超商取貨-全家',
    UNIMARTC2C: '超商取貨-7-11',
    HILIFEC2C: '超商取貨-萊爾富',
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
                <span className="flex gap-x-2">
                  <MapPinIcon className="font-semibold text-red-400" />{' '}
                  {selectedAddress.CVSStoreName}
                </span>
                <div className="flex justify-between">
                  <span className="p-2 font-light">
                    {selectedAddress.CVSAddress || selectedAddress.address}
                  </span>
                  <Link href="/confirm-order/choose-receipt">
                    <Button variant="ghost">
                      <ChevronRight />
                    </Button>
                  </Link>
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
