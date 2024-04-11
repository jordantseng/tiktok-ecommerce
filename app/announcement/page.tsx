import Title from '@/components/Title'
import AnnounceTab from '@/app/announcement/AnnouonceTab'
import { getAnnouncements } from '@/services/announcement'
import { headers } from 'next/headers'
import { getBaseURL } from '@/lib/utils'

const AnnouncementPage = async () => {
  const headerList = headers()
  const baseURL = getBaseURL(headerList.get('host')!)
  const { data } = await getAnnouncements(baseURL)

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Title title="最新消息" />
      <div className="flex flex-col justify-between gap-4 p-4 text-sm">
        {data.map((opt) => (
          <AnnounceTab key={opt.id} title={opt.title} id={opt.id} />
        ))}
      </div>
    </main>
  )
}

export default AnnouncementPage
