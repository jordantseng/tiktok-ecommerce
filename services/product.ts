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
  imgs: string[]
  number: string
  kindmain_id: number
  kindhead_id: number
  created_at: string
  closedate: string
  begindate: string
  updated_at: string
  buycount: number
  body: string
  specs: { title: string }[]
}

type GetProductsRes = ApiRes<{
  current_page: number
  data: ProductData[]
  total: number
  last_page: number
}>

type GetProductRes = ApiRes<ProductData>

type getProductsArgs = {
  page: number
  pageSize: number
  search?: string
  sortName?: string
  sortType?: string
  kindheadId?: string
  kindmainId?: string
}

export const getProducts = async ({
  page,
  pageSize,
  search = '',
  sortName = 'hits',
  sortType = 'desc',
  kindheadId,
  kindmainId,
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
      ...(kindheadId && { kindhead_id: kindheadId }),
      ...(kindmainId && { kindmain_id: kindmainId }),
    }),
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}

export const getProduct = async (id: number): Promise<GetProductRes> => {
  const res = await fetch(`${config.api}/api/product/show`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify({
      id,
    }),
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}
