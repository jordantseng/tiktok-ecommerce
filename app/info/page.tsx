'use client'

import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Title from '@/components/Title'

const InfoPage = () => {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col bg-default">
      <Title title="消息" goBackUrl="/member" />

      <div className="flex flex-1 flex-col justify-between gap-4 p-4 text-sm">
        <div className="flex flex-col gap-4">
          <div className="flex cursor-pointer justify-between rounded-lg bg-white p-4">
            <span className="font-semibold">常見問題</span>
            <ChevronRight />
          </div>
          <div className="flex cursor-pointer justify-between rounded-lg bg-white p-4">
            <span className="font-semibold">隱私與政策</span>
            <ChevronRight />
          </div>

          <div className="flex cursor-pointer justify-between rounded-lg bg-white p-4">
            <span className="font-semibold">退款規則</span>
            <ChevronRight />
          </div>

          <div className="flex cursor-pointer justify-between rounded-lg bg-white p-4">
            <span className="font-semibold">消費糾紛處理</span>
            <ChevronRight />
          </div>

          <div
            className="flex cursor-pointer justify-between rounded-lg bg-white p-4"
            onClick={() => router.push('/login')}
          >
            <span className="font-semibold">登入/註冊</span>
            <ChevronRight />
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4 text-gray-700">
          <span>公司名稱：天服能量有限公司</span>
          <span>公司地址：台北市中山北路二段 33 號</span>
          <span>聯繫方式：02-23333392</span>
          <span>微信：skychakra888</span>
          <span>信箱：skychakraservice@gmail.com</span>
        </div>
      </div>
    </main>
  )
}

export default InfoPage
