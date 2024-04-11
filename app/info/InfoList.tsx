import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'

import { getPages } from '@/services/page'
import LoginTab from '@/app/info/LoginTab'
import { headers } from 'next/headers'
import { getBaseURL } from '@/lib/utils'
// import ResetPasswordTab from '@/app/info/ResetPasswordTab'

const InfoList = async () => {
  const headerList = headers()
  const baseURL = getBaseURL(headerList.get('host')!)

  const { data: pages } = await getPages(baseURL)

  return (
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
      {/* <ResetPasswordTab /> */}
      <LoginTab />
    </div>
  )
}

export default InfoList
