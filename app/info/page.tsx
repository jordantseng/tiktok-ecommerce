import { ChevronRightIcon } from 'lucide-react'

import Title from '@/components/Title'
import { getQNAs } from '@/services/qna'
import { getPage, getPages } from '@/services/page'
import CollapsibleTab from '@/app/info/CollapsibleTab'
import LoginTab from '@/app/info/LoginTab'
import Link from 'next/link'

type InfoPageProps = {
  searchParams: {
    type: string
    typeId: string
  }
}

const InfoPage = async ({ searchParams }: InfoPageProps) => {
  const { type, typeId } = searchParams

  const { data: pages } = await getPages()
  const { data: details } = type === '常見問題' ? await getQNAs() : await getPage(Number(typeId))

  return (
    <main className="flex min-h-screen flex-col bg-default">
      <Title title={type || '服務中心'} />
      <div className="flex flex-col justify-between gap-4 p-4 text-sm">
        {!type ? (
          <div className="flex flex-col gap-4">
            <Link
              href="/info?type=常見問題"
              className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-4"
            >
              <span className="font-semibold">常見問題</span>
              <ChevronRightIcon />
            </Link>
            {pages.map((page) => (
              <Link
                href={`/info?type=${page.title}&typeId=${page.id}`}
                key={page.id}
                className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-4"
              >
                <span className="font-semibold">{page.title}</span>
                <ChevronRightIcon />
              </Link>
            ))}
            <LoginTab />
          </div>
        ) : (
          <>
            {Array.isArray(details) && type === '常見問題' ? (
              details.map((detail) => (
                <CollapsibleTab key={detail.id} title={detail.title} body={detail.body} />
              ))
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: (!Array.isArray(details) && details?.body) || '',
                }}
              />
            )}
          </>
        )}
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
