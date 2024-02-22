import { createInstance } from '@/lib/axios'
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

export const getBanners = async (): Promise<GetBannersRes> => {
  const axiosInstance = createInstance()
  const { data } = await axiosInstance.post('/api/banner', {
    page: 1,
    pagesize: 10000,
  })

  return data
}
