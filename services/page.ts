import axiosInstance from '@/lib/axios'
import { ApiRes } from '@/types/common'

type getPagesRes = ApiRes<{
  current_page: number
  data: PageData[]
}>

type getPageRes = ApiRes<PageData & { body: string }>

export type PageData = { id: number; title: string }

export const getPages = async (page = 1, pageSize = 10, search = '') => {
  const { data: res } = await axiosInstance.post<getPagesRes>('/api/page', {
    page,
    pagesize: pageSize,
    search,
  })

  return res.data
}

export const getPage = async (id: number) => {
  const { data: res } = await axiosInstance.post<getPageRes>('/api/page/show', { id })

  return res
}
