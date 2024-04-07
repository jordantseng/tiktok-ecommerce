import axiosInstance from '@/lib/axios'
import { ApiRes } from '@/types/common'

type GetBannersRes = ApiRes<{
  current_page: number
  data: {
    id: number
    img: string
    title: string
  }[]
  total: number
}>

export const getBanners = async (baseURL: string): Promise<GetBannersRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/banner',
    data: {
      page: 1,
      pagesize: 10000,
    },
  })

  return data
}
