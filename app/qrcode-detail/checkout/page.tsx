'use client'
import Title from '@/components/Title'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrderDetailContext } from '@/context/OrderDetailContext'
import { getBaseURL } from '@/lib/utils'
import { getPayBarcode } from '@/services/order'
import Image from 'next/image'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'

const QrcodeDetail = () => {
  const [code, setCode] = useImmer<string[]>([])
  const { order } = useOrderDetailContext()
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
      <Title title="付款" goBackUrl="/member/orders" />
      <div className={'flex min-h-screen w-full flex-col items-center bg-background'}>
        <div className="w-full p-2">
          <div className="rounded-lg bg-white">
            <div className="flex w-full flex-col justify-between rounded-lg bg-white p-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex h-[18px] min-w-[18px]">
                  <Image alt="info" fill src="/cash.png" />
                </div>
                <div className="text-lg font-bold">超商代碼</div>
              </div>
              <span className="py-2 text-xs font-light">＊請使用下方付款條碼完成繳款。</span>
              <div className="flex items-center rounded-lg">
                <div className="flex w-full flex-col space-y-2">
                  {!order ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="break-keep">繳款金額</span>
                      <span className="flex">${order.totalprice}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center rounded-lg">
                <div className="flex w-full flex-col space-y-2">
                  {!order ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="break-keep">訂購人</span>
                      <span className="flex">{order.rname}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative mx-auto mt-4 flex h-14 w-[300px]">
                <Image
                  className="object-cover"
                  fill
                  src={`data:image/jpeg;base64,${code[0]}`}
                  alt={'barcode1'}
                />
              </div>
              <span className="flex items-center justify-center text-sm">{order?.barcode1}</span>
              <div className="relative mx-auto mt-4 flex h-14 w-[300px]">
                <Image
                  className="object-cover"
                  fill
                  src={`data:image/jpeg;base64,${code[1]}`}
                  alt={'barcode2'}
                />
              </div>
              <span className="flex items-center justify-center text-sm">{order?.barcode2}</span>
              <div className="relative mx-auto mt-4 flex h-14 w-[300px]">
                <Image
                  className="object-cover"
                  fill
                  src={`data:image/jpeg;base64,${code[2]}`}
                  alt={'barcode3'}
                />
              </div>
              <span className="flex items-center justify-center text-sm">{order?.barcode3}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QrcodeDetail
