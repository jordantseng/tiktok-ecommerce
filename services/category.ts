import config from '@/lib/configs'
import { ApiRes } from '@/types/common'

type getCategoriesRes = ApiRes<{
  current_page: number
  data: {
    id: number
    title: string
    imgs: string
  }[]
  total: number
}>

type getSubCategories = ApiRes<
  {
    id: number
    kindhead_id: number
    title: string
    sortnum: number
    created_at: string
    updated_at: string
    kindhead_title: string
  }[]
>

export const getCategories = async (): Promise<getCategoriesRes> => {
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
    next: { revalidate: 0 },
  })

  const data = await res.json()

  return data
}

export const getSubCategories = async (categoryId: number): Promise<getSubCategories> => {
  const res = await fetch(`${config.api}/api/kindmain`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify({
      kindhead_id: categoryId,
      page: 1,
      pagesize: 10,
      search: '',
    }),
    next: { revalidate: 0 },
  })

  const data = await res.json()

  return data
}
