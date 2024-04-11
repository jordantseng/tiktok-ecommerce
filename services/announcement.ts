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

export const getAnnouncements = async (baseURL: string, page = 1, pageSize = 10000) => {
  const { data: res } = await axiosInstance<getAnnouncementsRes>({
    method: 'POST',
    baseURL,
    url: '/api/news',
    data: {
      page,
      pagesize: pageSize,
    },
  })

  return res.data
}

export const getAnnouncement = async (baseURL: string, id: number) => {
  const { data: res } = await axiosInstance<getAnnouncementRes>({
    method: 'POST',
    baseURL,
    url: '/api/news/show',
    data: {
      id,
    },
  })

  return res.data
}
