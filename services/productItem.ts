import axiosInstance from '@/lib/axios'
import { ApiRes } from '@/types/common'

type GetProductItems = ApiRes<{
  current_page: number
  data: { id: number; title: string }[]
}>

export const getProductItems = async (
  baseURL: string,
  { page = 1, pageSize = 10, productId }: any,
): Promise<GetProductItems> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/productitem',
    data: {
      page,
      pagesize: pageSize,
      product_id: productId,
    },
  })

  return data
}
