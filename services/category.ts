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


export type subCategory = {
  id: number
  kindhead_id: number
  title: string
  sortnum: number
  created_at: string
  updated_at: string
  kindhead_title: string
}

type getSubCategories = ApiRes<
  subCategory[]
>

export const getCategories = async (baseURL: string): Promise<getCategoriesRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: '/api/kindhead',
    baseURL,
    data: {
      page: 1,
      pagesize: 10000,
    },
  })

  return data
}

export const getSubCategories = async (
  baseURL: string,
  categoryId: number,
): Promise<getSubCategories> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/kindmain',
    data: {
      kindhead_id: categoryId,
      page: 1,
      pagesize: 10,
      search: '',
    },
  })

  return data
}
