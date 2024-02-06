'use client'

import PrevButton from '@/components/PrevButton'
import ReceiptForm from '@/components/ReceiptForm'
import { Delivery, useAddressContext } from '@/context/AddressContext'
import { useAuth } from '@/context/AuthContext'
import { useCity } from '@/hooks/useCity'
<<<<<<< HEAD
import React from 'react'
=======
import { addAddress } from '@/services/address'
import { AddressData } from '@/types/common'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { format } from 'date-fns'
import Title from '@/components/Title'
>>>>>>> e9f0076 (feat(add-receipt): temp finish ui)

const AddReceiptPage = () => {
  const { cities, districts, handleGetDistrict } = useCity()
  const { handleSelectDeliveryType } = useAddressContext()
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const [value, setValue] = useImmer<AddressData>({
    title: format(new Date(), 'yyyymmddHHMMSSS') + user?.name,
    member_id: user?.id || 0,
    name: '',
    tel: '',
    LogisticsSubType: 'home-delivery',
  })
  const router = useRouter()

  const CVSStoreID = searchParams.get('CVSStoreID')
  const CVSStoreName = searchParams.get('CVSStoreName')
  const CVSAddress = searchParams.get('CVSAddress')
  const LogisticsSubType = searchParams.get('LogisticsSubType') as Delivery

  useEffect(() => {
    if (CVSStoreID && CVSStoreName && CVSAddress && LogisticsSubType) {
      handleSelectDeliveryType(Delivery[LogisticsSubType])
      setValue((draft) => {
        draft['LogisticsSubType'] = Delivery[LogisticsSubType]
        draft['CVSStoreID'] = CVSStoreID
        draft['CVSStoreName'] = CVSStoreName
        draft['CVSAddress'] = CVSAddress
      })
    }
  }, [])

  const handleSubmit = (val: AddressData) => {
    console.log(val)
    // const addressToSubmit =
    //   val.LogisticsSubType === 'home-delivery' ? { ...val, LogisticsSubType: '' } : val
    addAddress(val).then(() => router.push('/confirm-bill/choose-receipt'))
  }

  return (
    <main className="min-h-screen">
<<<<<<< HEAD
      <header className="flex items-center justify-between bg-white px-4 pb-4 pt-6">
        <PrevButton />
        <h4 className="mb-2 ml-auto mr-auto flex scroll-m-20 text-xl font-normal tracking-tight">
          新增收件人資訊
        </h4>
      </header>
=======
      <Title title="新增收件人資訊" goBackUrl="/confirm-bill/choose-receipt" />
>>>>>>> e9f0076 (feat(add-receipt): temp finish ui)
      <div className="flex min-h-screen w-full flex-col items-center bg-default">
        <div className="min-h-screen w-full bg-white p-4">
          <ReceiptForm
            value={value}
            cities={cities}
            districts={districts}
            onGetDistrict={handleGetDistrict}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  )
}

export default AddReceiptPage
