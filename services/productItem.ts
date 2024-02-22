import { createInstance } from '@/lib/axios'
import { ApiRes } from '@/types/common'

type GetProductItems = ApiRes<{
  current_page: number
  data: { id: number; title: string }[]
}>

export const getProductItems = async ({
  page = 1,
  pageSize = 10,
  productId,
}: any): Promise<GetProductItems> => {
  const axiosInstance = createInstance()
  const { data } = await axiosInstance.post('/api/productitem', {
    page,
    pagesize: pageSize,
    product_id: productId,
  })

  return data
}
