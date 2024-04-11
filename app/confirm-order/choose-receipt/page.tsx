'use client'

import ReceiptInfo from '@/app/confirm-order/choose-receipt/ReceiptInfo'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { useAddressContext } from '@/context/AddressContext'
import { getBaseURL } from '@/lib/utils'
import { getAddress, getLogistic } from '@/services/address'
import { AddressData } from '@/types/common'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ChooseReceiptPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { deliveryType, selectedAddress, handleSelectAddress } = useAddressContext()
  const [addresses, setAddresses] = useState<AddressData[]>([])

  useEffect(() => {
    const baseURL = getBaseURL(window.location.host)

    if (pathname === '/confirm-order/choose-receipt') {
      getAddress(baseURL).then(({ data }) => {
        setAddresses(data?.data || [])
      })
    }
  }, [pathname])

  return (
    <main className="min-h-screen">
      <Title title="選擇收件人資訊" goBackUrl="/confirm-order" />
      <div className="flex min-h-screen w-full flex-col items-center bg-background">
        {addresses
          .filter(
            (opt) =>
              opt.LogisticsSubType === deliveryType ||
              (deliveryType === 'HOME_DELIVERY' && !opt.LogisticsSubType && opt.address),
          )
          .map((opt) => (
            <ReceiptInfo
              key={opt.id}
              receiver={opt.name}
              phone={opt.tel}
              address={opt.address || `${opt.CVSStoreName}(${opt.CVSAddress})` || ''}
              isSelected={selectedAddress?.id === opt.id}
              onClick={() => handleSelectAddress(opt)}
            />
          ))}

        <Button
          className="m-4 w-[90%] rounded-3xl bg-primary p-4"
          onClick={() => {
            const baseURL = getBaseURL(window.location.host)

            deliveryType && deliveryType !== 'HOME_DELIVERY'
              ? getLogistic(baseURL, deliveryType)
              : router.push('/confirm-order/upsert-receipt')
          }}
        >
          新增收件人資訊
        </Button>
      </div>
    </main>
  )
}

export default ChooseReceiptPage
