import config from '@/lib/configs'
import { ApiRes } from '@/types/common'

export type ProductData = {
  title: string
  id: number
  price: number
  sortnum: string
  hits: number
  marketprice: number
  location: string
  tags: string
  star: number
  imgs: string
  number: string
  kindmain_id: number
  kindhead_id: number
  created_at: string
  closedate: string
  begindate: string
  updated_at: string
  buycount: number
}

type GetProductsRes = ApiRes<{
  current_page: number
  data: ProductData[]
  total: number
}>

type getProductsArgs = {
  page: number
  pageSize: number
  search?: string
  sortName?: string
  sortType?: string
}

export const getProducts = async ({
  page,
  pageSize,
  search = '',
  sortName = 'hits',
  sortType = 'desc',
}: getProductsArgs): Promise<GetProductsRes> => {
  const res = await fetch(`${config.api}/api/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify({
      page,
      pagesize: pageSize,
      search,
      sortname: sortName,
      sorttype: sortType,
      searchstartdate: '2021-01-01',
      searchenddate: '2099-12-31',
    }),
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}
