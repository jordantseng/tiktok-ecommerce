import Title from '@/components/Title'
import AnnounceTab from '@/app/announcement/AnnouonceTab'
import { getAnnouncements } from '@/services/announcement'

const AnnouncementPage = async () => {
  const { data } = await getAnnouncements()

  return (
    <main className="flex min-h-screen flex-col bg-default">
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
