'use client'

import ReceiptInfo from '@/app/confirm-order/choose-receipt/ReceiptInfo'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { useAddressContext } from '@/context/AddressContext'
import { getAddress, getLogistic } from '@/services/address'
import { AddressData } from '@/types/common'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ChooseReceiptPage = () => {
  const router = useRouter()
  const { deliveryType, selectedAddress, handleSelectAddress } = useAddressContext()
  const [addresses, setAddresses] = useState<AddressData[]>([])

  useEffect(() => {
    if (location.pathname === '/confirm-order/choose-receipt') {
      getAddress().then(({ data }) => {
        setAddresses(data?.data || [])
      })
    }
  }, [location.pathname])

  return (
    <main className="min-h-screen">
      <Title title="選擇收件人資訊" goBackUrl="/confirm-bill" />
      <div className="flex min-h-screen w-full flex-col items-center bg-default">
        {addresses
          .filter((opt) =>
            deliveryType === 'home-delivery'
              ? opt.LogisticsSubType === 'home-delivery'
              : opt.LogisticsSubType !== 'home-delivery',
          )
          .map((opt) => (
            <ReceiptInfo
              receiver={opt.name}
              phone={opt.tel}
              address={
                (opt.LogisticsSubType === 'home-delivery'
                  ? opt.address
                  : `${opt.CVSStoreName}(${opt.CVSAddress})`) || ''
              }
              isSelected={selectedAddress?.id === opt.id}
              onClick={() => handleSelectAddress(opt)}
            />
          ))}

        <Button
          className="m-4 w-[90%] rounded-3xl bg-primary p-4"
          onClick={() => {
            deliveryType !== 'home-delivery'
              ? getLogistic(deliveryType)
              : router.push('/confirm-order/add-receipt')
          }}
        >
          新增收件人資訊
        </Button>
      </div>
    </main>
  )
}

export default ChooseReceiptPage
