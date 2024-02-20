import config from '@/lib/configs'
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
  const res = await fetch(`${config.api}/api/productitem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify({
      page,
      pagesize: pageSize,
      product_id: productId,
    }),
  })

  const data = await res.json()

  return data
}
