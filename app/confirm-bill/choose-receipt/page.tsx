'use client'

import PrevButton from '@/components/PrevButton'
import ReceiptInfo from '@/components/ReceiptInfo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ChooseReceiptPage = () => {
  return (
    <main className="min-h-screen">
      <header className="flex items-center justify-between bg-white px-4 pb-4 pt-6">
        <PrevButton />

        <h4 className="mb-2 ml-auto mr-auto flex scroll-m-20 text-xl font-normal tracking-tight">
          選擇收件人資訊
        </h4>
      </header>
      <div className="flex min-h-screen w-full flex-col items-center bg-default">
        <ReceiptInfo
          receiver="蓋瑞"
          phone="0912344355"
          address="台北市萬華區塔城街123號12樓9-1房"
          isSelected={true}
          onClick={() => {}}
        />
        <ReceiptInfo
          receiver="蓋瑞"
          phone="0912344355"
          address="台北市萬華區塔城街123號12樓9-1房"
          isSelected={true}
          onClick={() => {}}
        />
        <ReceiptInfo
          receiver="蓋瑞"
          phone="0912344355"
          address="台北市萬華區塔城街123號12樓9-1房"
          isSelected={true}
          onClick={() => {}}
        />
        <ReceiptInfo
          receiver="蓋瑞"
          phone="0912344355"
          address="台北市萬華區塔城街123號12樓9-1房"
          isSelected={true}
          onClick={() => {}}
        />
        <Link href="/confirm-bill/add-receipt">
          <Button className="m-4 w-[90%] rounded-3xl bg-primary p-4">新增收件人資訊</Button>
        </Link>
      </div>
    </main>
  )
}

export default ChooseReceiptPage
