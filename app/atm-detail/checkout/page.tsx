'use client'
import Image from 'next/image'

import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { useContactContext } from '@/context/ContactContext'
import { useOrderDetailContext } from '@/context/OrderDetailContext'

const AtmDetailPage = () => {
  const { order } = useOrderDetailContext()
  const { handleContactMessageChange, contactMessage, handleContactSubmit } = useContactContext()
  return (
    <>
      <Title title="付款" goBackUrl="/member/orders" />
      <div className={'flex min-h-screen w-full flex-col items-center bg-background'}>
        <div className="w-full p-2">
          <div className="rounded-lg bg-white">
            <div className="flex w-full flex-col justify-between rounded-lg bg-white p-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex h-[18px] min-w-[18px]">
                  <Image alt="info" fill src="/group.png" />
                </div>
                <div className="text-lg font-bold">轉帳資訊</div>
              </div>
              <span className="py-2 text-xs font-light">＊請使用下方付款帳號完成繳款。</span>
              <div className="mt-2 flex items-center rounded-lg bg-background p-2">
                <div className="flex w-full flex-col space-y-2">
                  {!order ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="break-keep">繳款金額</span>
                      <span className="flex">${order?.totalprice}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center rounded-lg bg-background p-2">
                <div className="flex w-full flex-col space-y-2">
                  {!order ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="break-keep">銀行代號</span>
                      <span className="flex">{order?.paybranch}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center rounded-lg bg-background p-2">
                <div className="flex w-full flex-col space-y-2">
                  {!order ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="break-keep">銀行帳號</span>
                      <span className="flex">{order?.payaccount}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center rounded-lg bg-background p-2">
                <div className="flex w-full flex-col space-y-2">
                  {!order ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="break-keep">繳款到期日</span>
                      <span className="flex">{order?.payexpiredate}</span>
                    </div>
                  )}
                </div>
              </div>
              <span className="py-2 text-xs font-light">
                ＊請將款項匯入此帳號內，請務必於期限內進行繳款
              </span>
              <Textarea
                className="flex-1 bg-white text-base outline-none"
                placeholder="*匯款完後請輸入帳號後五碼告知賣家"
                onChange={handleContactMessageChange}
              />
              <Button
                disabled={!contactMessage}
                className="ml-auto mt-2 w-[25%] rounded-lg"
                variant="primary"
                onClick={handleContactSubmit}
              >
                送出
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AtmDetailPage
