import axiosInstance from '@/lib/axios'
import { ApiRes } from '@/types/common'

type getPagesRes = ApiRes<{
  current_page: number
  data: PageData[]
}>

type getPageRes = ApiRes<PageData & { body: string }>

export type PageData = { id: number; title: string }

export const getPages = async (baseURL: string, page = 1, pageSize = 10, search = '') => {
  const { data: res } = await axiosInstance<getPagesRes>({
    method: 'POST',
    baseURL,
    url: '/api/page',
    data: {
      page,
      pagesize: pageSize,
      search,
    },
  })

  return res.data
}

export const getPage = async (baseURL: string, id: number) => {
  const { data: res } = await axiosInstance<getPageRes>({
    method: 'POST',
    baseURL,
    url: '/api/page/show',
    data: {
      id,
    },
  })

  return res
}
