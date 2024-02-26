import axiosInstance from '@/lib/axios'
import { ApiRes } from '@/types/common'

type getAnnouncementsRes = ApiRes<{
  current_page: number
  data: AnnouncementData[]
}>

type getAnnouncementRes = ApiRes<AnnouncementData>

export type AnnouncementData = {
  id: number
  title: string
  created_at: string
  hits: 0
  body: string
}

export const getAnnouncements = async (page = 1, pageSize = 10000) => {
  const { data: res } = await axiosInstance.post<getAnnouncementsRes>('/api/news', {
    page,
    pagesize: pageSize,
  })

  return res.data
}

export const getAnnouncement = async (id: number) => {
  const { data: res } = await axiosInstance.post<getAnnouncementRes>('/api/news/show', {
    id,
  })

  return res.data
}
