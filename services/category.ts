import axiosInstance from '@/lib/axios'
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
  const response = await fetch('https://test.tkshop.live/api/kindhead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page: 1,
      pagesize: 10000,
    }),
    cache: 'no-store',
  })

  const result = await response.json()

  return result

  // const { data } = await axiosInstance.post('/api/kindhead', {
  //   page: 1,
  //   pagesize: 10000,
  // })

  // return data
}

export const getSubCategories = async (categoryId: number): Promise<getSubCategories> => {
  const { data } = await axiosInstance.post('/api/kindmain', {
    kindhead_id: categoryId,
    page: 1,
    pagesize: 10,
    search: '',
  })

  return data
}
