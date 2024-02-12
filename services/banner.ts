import config from '@/lib/configs'
import { ApiRes } from '@/types/common'

type AddressRes = ApiRes<{
  current_page: number
  data: {
    id: number
    img: string
    title: string
  }[]
  total: number
}>

export const getBanners = async (): Promise<AddressRes> => {
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
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}
