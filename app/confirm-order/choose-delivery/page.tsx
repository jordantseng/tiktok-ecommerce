'use client'

import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Delivery, useAddressContext } from '@/context/AddressContext'
import { getBaseURL } from '@/lib/utils'
import { getAddress, getLogistic } from '@/services/address'
import { AddressData } from '@/types/common'
import { CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { Separator } from '@radix-ui/react-select'
import { Check, ChevronRight, ChevronsUpDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'

const ChooseDeliveryPage = () => {
  const router = useRouter()
  const { selectedAddress, handleSelectDeliveryType, deliveryType, handleSelectAddress } =
    useAddressContext()
  const pathname = usePathname()
  const [addresses, setAddresses] = useImmer<AddressData[]>([])

  useEffect(() => {
    const baseURL = getBaseURL(window.location.host)

    if (pathname === '/confirm-order/choose-delivery') {
      getAddress(baseURL).then(({ data }) => {
        if (data.data && data.data.length > 0 && !selectedAddress) {
          handleSelectAddress(data.data[0])
        }
        setAddresses(data?.data || [])
      })
    }
  }, [handleSelectAddress, pathname, selectedAddress, setAddresses])

  const handleClick = (type: string) => {
    const baseURL = getBaseURL(window.location.host)
    type !== 'HOME_DELIVERY'
      ? getLogistic(baseURL, type)
      : router.push('/confirm-order/upsert-receipt')
  }

  const renderItem = (address: AddressData) => (
    <div key={address.id} className="flex items-center justify-between space-x-2 p-4">
      <div className="flex w-full flex-col justify-between">
        {address?.name && (
          <div className="flex w-full items-center p-2">
            <span className="font-semibold">
              取貨人： {address?.name} {address?.tel}
            </span>
          </div>
        )}
        {address?.CVSStoreName && <span className="flex gap-x-2 px-2">{address.CVSStoreName}</span>}
        <div className="flex items-center px-2">
          <div className="flex items-center justify-between">
            <span className="font-light">{address?.CVSAddress || address?.address}</span>
          </div>
        </div>
      </div>
      <RadioGroupItem value={address.id?.toString() || ''} id={address.id?.toString() || ''} />
    </div>
  )

  return (
    <main className="min-h-screen">
      <Title title="選擇收件方式" goBackUrl="/confirm-order" />
      <div className="flex min-h-screen w-full flex-col items-center bg-background">
        <RadioGroup
          className="w-full bg-white"
          defaultValue={selectedAddress?.id?.toString() || ''}
          onValueChange={(val) => {
            // resetSelectAddress()
            // handleSelectDeliveryType(val as Delivery)
            const tar = addresses.find((opt) => opt.id?.toString() === val)
            if (tar) {
              handleSelectAddress(tar)
              handleSelectDeliveryType((tar.LogisticsSubType || 'HOME_DELIVERY') as Delivery)
            }
          }}
        >
          <div className="flex items-center justify-between space-x-2  p-4">
            <Collapsible className="w-full" defaultOpen={deliveryType === 'HOME_DELIVERY'}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between">
                  <Label className="text-md" htmlFor="HOME_DELIVERY">
                    宅配到府
                  </Label>
                  {deliveryType === 'HOME_DELIVERY' ? (
                    <Check className="text-primary" />
                  ) : (
                    <ChevronsUpDown className="h-4 w-4" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {addresses
                  .filter(
                    (opt) => !opt.LogisticsSubType || opt.LogisticsSubType === 'HOME_DELIVERY',
                  )
                  .map((el) => renderItem(el))}
                <Separator />
                <Button
                  className="mx-auto flex items-center justify-center text-red-400"
                  variant="ghost"
                  onClick={() => handleClick('HOME_DELIVERY')}
                >
                  ＋新增 宅配地址
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="flex items-center justify-between space-x-2  p-4">
            <Collapsible className="w-full" defaultOpen={deliveryType === 'FAMIC2C'}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between">
                  <Label className="text-md" htmlFor="FAMIC2C">
                    全家
                  </Label>
                  {deliveryType === 'FAMIC2C' ? (
                    <Check className="text-primary" />
                  ) : (
                    <ChevronsUpDown className="h-4 w-4" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {addresses
                  .filter((opt) => opt.LogisticsSubType === 'FAMIC2C')
                  .map((el) => renderItem(el))}
                <Separator />
                <Button
                  className="mx-auto flex items-center justify-center text-red-400"
                  variant="ghost"
                  onClick={() => handleClick('FAMIC2C')}
                >
                  ＋新增 全家門市
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="flex items-center justify-between space-x-2  p-4">
            <Collapsible className="w-full" defaultOpen={deliveryType === 'UNIMARTC2C'}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between">
                  <Label className="text-md" htmlFor="UNIMARTC2C">
                    7-11
                  </Label>
                  {deliveryType === 'UNIMARTC2C' ? (
                    <Check className="text-primary" />
                  ) : (
                    <ChevronsUpDown className="h-4 w-4" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {addresses
                  .filter((opt) => opt.LogisticsSubType === 'UNIMARTC2C')
                  .map((el) => renderItem(el))}
                <Separator />
                <Button
                  className="mx-auto flex items-center justify-center text-red-400"
                  variant="ghost"
                  onClick={() => handleClick('UNIMARTC2C')}
                >
                  ＋新增 7-11門市
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="flex items-center justify-between space-x-2  p-4">
            <Collapsible className="w-full" defaultOpen={deliveryType === 'HILIFEC2C'}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between">
                  <Label className="text-md" htmlFor="HILIFEC2C">
                    萊爾富
                  </Label>
                  {deliveryType === 'HILIFEC2C' ? (
                    <Check className="text-primary" />
                  ) : (
                    <ChevronsUpDown className="h-4 w-4" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {addresses
                  .filter((opt) => opt.LogisticsSubType === 'HILIFEC2C')
                  .map((el) => renderItem(el))}
                <Separator />
                <Button
                  className="mx-auto flex items-center justify-center text-red-400"
                  variant="ghost"
                  onClick={() => handleClick('HILIFEC2C')}
                >
                  ＋新增 萊爾富門市
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>
          {/* <div className="flex items-center justify-between space-x-2  p-4">
            <Collapsible className="w-full" defaultOpen>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between">
                  <Label htmlFor="store">超商取貨</Label>
                  <ChevronsUpDown className="h-4 w-4" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex items-center justify-between space-x-2  p-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="FAMIC2C">全家</Label>
                  </div>
                  <RadioGroupItem value="FAMIC2C" id="FAMIC2C" />
                </div>
                <div className="flex items-center justify-between space-x-2 p-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="UNIMARTC2C">7-11</Label>
                  </div>
                  <RadioGroupItem value="UNIMARTC2C" id="UNIMARTC2C" />
                </div>
                <div className="flex items-center justify-between space-x-2 p-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="HILIFEC2C">萊爾富</Label>
                  </div>
                  <RadioGroupItem value="HILIFEC2C" id="HILIFEC2C" />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div> */}
          {/* <div className="flex items-center justify-between space-x-2  p-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="HOME_DELIVERY">宅配到府</Label>
            </div>
            <RadioGroupItem value="HOME_DELIVERY" id="HOME_DELIVERY" />
          </div> */}
        </RadioGroup>
      </div>
    </main>
  )
}

export default ChooseDeliveryPage
