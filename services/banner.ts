import config from '@/lib/configs'
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
  const res = await fetch(`${config.api}/api/banner`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify({
      page: 1,
      pagesize: 10000,
    }),
    next: { revalidate: 0 },
  })

  const data = await res.json()

  return data
}
