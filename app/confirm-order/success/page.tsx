'use client'

import Title from '@/components/Title'
import { CheckIcon } from 'lucide-react'
import React from 'react'

const SuccessPage = () => {
  return (
    <main className="min-h-screen">
      <Title title="付款" goBackUrl="/" />
      <div className="flex min-h-screen w-full flex-col items-center bg-default">
        <div className="flex flex-col items-center justify-center p-20">
          <CheckIcon className="h-[100px] w-[100px] rounded-full bg-primary text-white" />
          <div className="my-4 text-lg">付款完成</div>
        </div>
        <div className="w-full p-4">
          <div className="rounded-lg bg-white p-4">
            <div className="flex items-center border-b-2 p-4">
              <div className="text-md w-[20%]">訂單編號</div>
              <div className="text-md flex w-[80%] justify-end">234832534534</div>
            </div>
            <div className="flex items-center border-b-2 p-4">
              <div className="text-md w-[20%]">運送方式</div>
              <div className="text-md flex w-[80%] justify-end">超商取貨</div>
            </div>
            <div className="flex items-center border-b-2 p-4">
              <div className="text-md w-[20%]">付款方式</div>
              <div className="text-md flex w-[80%] justify-end">信用卡一次付清</div>
            </div>
            <div className="flex items-center border-b-2 p-4">
              <div className="text-md w-[20%]">地址</div>
              <div className="text-md flex w-[80%] flex-col justify-end">
                <div className="flex justify-end">台北市中山區中山北路七段222號</div>
                <div className="flex justify-end">中山北門市</div>
              </div>
            </div>
            <div className="flex items-center p-4">
              <div className="text-md w-[20%]">金額</div>
              <div className="text-md flex w-[80%] justify-end">$18888</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SuccessPage
