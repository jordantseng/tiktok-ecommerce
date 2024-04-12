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
    <main className="h-full min-h-screen">
      <Title title="最新消息" />
      <div className={'flex min-h-screen w-full flex-col items-center space-y-4 bg-background p-4'}>
        {data.map((opt) => (
          <AnnounceTab key={opt.id} title={opt.title} id={opt.id} />
        ))}
      </div>
    </main>
  )
}

export default AnnouncementPage
