'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { getBaseURL } from '@/lib/utils'
import { OrderData, getPayBarcode } from '@/services/order'
import Image from 'next/image'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'

type Props = {
  order: OrderData | null
}

const BarcodeDisplay = ({ order }: Props) => {
  const [code, setCode] = useImmer<string[]>([])
  useEffect(() => {
    const baseURL = getBaseURL(window.location.host)

    const getCode = async () => {
      const data = await getPayBarcode(baseURL, Number(order?.barcode1))
      const data2 = await getPayBarcode(baseURL, Number(order?.barcode2))
      const data3 = await getPayBarcode(baseURL, Number(order?.barcode3))
      setCode([data, data2, data3])
    }
    if (order?.id) {
      getCode()
    }
  }, [order, setCode])

  return (
    <>
      <div className="relative mx-auto mt-4 flex h-14 w-[300px]">
        {!code[0] ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Image
            className="object-cover"
            fill
            src={`data:image/jpeg;base64,${code[0]}`}
            alt={'barcode1'}
          />
        )}
      </div>
      <span className="flex items-center justify-center text-sm">{order?.barcode1}</span>
      <div className="relative mx-auto mt-4 flex h-14 w-[300px]">
        {!code[1] ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Image
            className="object-cover"
            fill
            src={`data:image/jpeg;base64,${code[1]}`}
            alt={'barcode2'}
          />
        )}
      </div>
      <span className="flex items-center justify-center text-sm">{order?.barcode2}</span>
      <div className="relative mx-auto mt-4 flex h-14 w-[300px]">
        {!code[2] ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Image
            className="object-cover"
            fill
            src={`data:image/jpeg;base64,${code[2]}`}
            alt={'barcode3'}
          />
        )}
      </div>
      <span className="flex items-center justify-center text-sm">{order?.barcode3}</span>
    </>
  )
}

export default BarcodeDisplay
