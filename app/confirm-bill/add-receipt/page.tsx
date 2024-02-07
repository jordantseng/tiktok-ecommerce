'use client'

import PrevButton from '@/components/PrevButton'
import ReceiptForm from '@/components/ReceiptForm'
import { useCity } from '@/hooks/useCity'
import React from 'react'

const AddReceiptPage = () => {
  const { cities, districts, handleGetDistrict } = useCity()

  return (
    <main className="min-h-screen">
      <header className="flex items-center justify-between bg-white px-4 pb-4 pt-6">
        <PrevButton />
        <h4 className="mb-2 ml-auto mr-auto flex scroll-m-20 text-xl font-normal tracking-tight">
          新增收件人資訊
        </h4>
      </header>
      <div className="flex min-h-screen w-full flex-col items-center bg-default">
        <div className="min-h-screen w-full bg-white p-4">
          <ReceiptForm cities={cities} districts={districts} onGetDistrict={handleGetDistrict} />
        </div>
      </div>
    </main>
  )
}

export default AddReceiptPage
