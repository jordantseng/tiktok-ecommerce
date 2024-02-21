'use client'

import Title from '@/components/Title'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Delivery, useAddressContext } from '@/context/AddressContext'
import { CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { ChevronsUpDown } from 'lucide-react'
import React from 'react'

const ChooseReceiptPage = () => {
  const { handleSelectDeliveryType, deliveryType, resetSelectAddress } = useAddressContext()
  return (
    <main className="min-h-screen">
      <Title title="選擇收件方式" goBackUrl="/confirm-order" />
      <div className="flex min-h-screen w-full flex-col items-center bg-default">
        <RadioGroup
          className="w-full bg-white"
          defaultValue={deliveryType}
          onValueChange={(val) => {
            resetSelectAddress()
            handleSelectDeliveryType(val as Delivery)
          }}
        >
          <div className="flex items-center justify-between space-x-2  p-4">
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
          </div>
          <div className="flex items-center justify-between space-x-2  p-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="HOME_DELIVERY">宅配到府</Label>
            </div>
            <RadioGroupItem value="HOME_DELIVERY" id="HOME_DELIVERY" />
          </div>
        </RadioGroup>
      </div>
    </main>
  )
}

export default ChooseReceiptPage
