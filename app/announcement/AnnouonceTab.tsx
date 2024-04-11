'use client'
import { useEffect } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { AnnouncementData, getAnnouncement } from '@/services/announcement'
import { useImmer } from 'use-immer'
import { getBaseURL } from '@/lib/utils'

type AnnounceTabProps = {
  title: string
  id: number
}

const AnnounceTab = ({ title, id }: AnnounceTabProps) => {
  const [isOpen, setIsOpen] = useImmer(false)
  const [data, setData] = useImmer<AnnouncementData | null>(null)
  useEffect(() => {
    const getAnnounce = async () => {
      const baseURL = getBaseURL(window.location.host)
      const data = await getAnnouncement(baseURL, id)
      setData(data)
    }
    getAnnounce()
  }, [id, setData])

  return (
    <div
      className="flex cursor-pointer flex-col justify-between rounded-lg bg-white p-4"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-1 items-center justify-between">
        <span className="font-semibold">{title}</span>
        {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
      </div>
      {isOpen && data && (
        <div className="mt-2 flex-1" dangerouslySetInnerHTML={{ __html: data.body }} />
      )}
    </div>
  )
}

export default AnnounceTab
