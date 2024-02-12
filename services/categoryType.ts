import config from '@/lib/configs'
import { ApiRes } from '@/types/common'

type GetCategoryTypesRes = ApiRes<{
  current_page: number
  data: {
    id: number
    title: string
    imgs: string
  }[]
  total: number
}>

export const getCategoryTypes = async (): Promise<GetCategoryTypesRes> => {
  const res = await fetch(`${config.api}/api/kindhead`, {
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
