'use client'

import { Button } from '@/components/ui/button'
import { Check, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ChooseReceiptPage = () => {
  return (
    <main className="min-h-screen">
      <header className="flex items-center justify-between bg-white px-4 pb-4 pt-6">
        <Link href="/confirm-bill">
          <ChevronLeft />
        </Link>

        <h4 className="mb-2 ml-auto mr-auto flex scroll-m-20 text-xl font-normal tracking-tight">
          選擇收件人資訊
        </h4>
      </header>
      <div className="bg-default flex min-h-screen w-full flex-col items-center">
        <div className="w-full px-4 py-2">
          <div className="flex items-center justify-between space-x-2 rounded-lg bg-white p-4">
            <div className="flex flex-col">
              <span className="font-semibold">取貨人： 蓋瑞 0912344355</span>
              <span>台北市萬華區塔城街123號12樓9-1房</span>
            </div>
            <Check className="text-primary" />
          </div>
        </div>
        <div className="w-full px-4 py-2">
          <div className="flex items-center justify-between space-x-2 rounded-lg bg-white p-4">
            <div className="flex flex-col">
              <span className="font-semibold">取貨人： 蓋瑞 0912344355</span>
              <span>台北市萬華區塔城街123號12樓9-1房</span>
            </div>
            <Check className="text-primary" />
          </div>
        </div>
        <div className="w-full px-4 py-2">
          <div className="flex items-center justify-between space-x-2 rounded-lg bg-white p-4">
            <div className="flex flex-col">
              <span className="font-semibold">取貨人： 蓋瑞 0912344355</span>
              <span>台北市萬華區塔城街123號12樓9-1房</span>
            </div>
            <Check className="text-primary" />
          </div>
        </div>
        <div className="w-full px-4 py-2">
          <div className="flex items-center justify-between space-x-2 rounded-lg bg-white p-4">
            <div className="flex flex-col">
              <span className="font-semibold">取貨人： 蓋瑞 0912344355</span>
              <span>台北市萬華區塔城街123號12樓9-1房</span>
            </div>
            <Check className="text-primary" />
          </div>
        </div>
        <Link href="/confirm-bill/add-receipt">
          <Button className="m-4 w-[90%] rounded-3xl bg-primary p-4">新增收件人資訊</Button>
        </Link>
      </div>
    </main>
  )
}

export default ChooseReceiptPage
