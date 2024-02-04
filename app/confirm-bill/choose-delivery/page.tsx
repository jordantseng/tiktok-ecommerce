'use client'

import PrevButton from '@/components/PrevButton'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React from 'react'

const ChooseReceiptPage = () => {
  return (
    <main className="min-h-screen">
      <header className="flex items-center justify-between bg-white px-4 pb-4 pt-6">
        <PrevButton />
        <h4 className="mb-2 ml-auto mr-auto flex scroll-m-20 text-xl font-normal tracking-tight">
          選擇收件方式
        </h4>
      </header>
      <div className="flex min-h-screen w-full flex-col items-center bg-default">
        <RadioGroup className="w-full bg-white">
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
        </RadioGroup>
      </div>
    </main>
  )
}

export default ChooseReceiptPage
