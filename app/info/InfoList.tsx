import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'

import { getPages } from '@/services/page'
import LoginTab from '@/app/info/LoginTab'

const InfoList = async () => {
  const { data: pages } = await getPages()

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
      <LoginTab />
    </div>
  )
}

export default InfoList
