import Config from '@/lib/configs'
import { ApiRes } from '@/types/common'

type CartsRes = ApiRes<{
  current_page: number
  data: CartData[]
  total: number
}>

type CartData = {
  id: number
  title: string
  imgs: string
  company: string
  expertise: string
  info: string
  productitem_title: string
  productitem_id: number
  qty: number
  price: number
  marketprice: number
  domain_id: number
  tags: string
}

export const getMyCart = async (): Promise<CartsRes> => {
  const res = await fetch(`${Config.api}/api/membercenter/mycart`, {
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

export const addToCart = async (id: number, count: number): Promise<CartsRes> => {
  const res = await fetch(`${Config.api}/api/membercenter/mycart/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify([
      {
        productitem_id: id,
        qty: count || 1,
      },
    ]),
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}

export const deleteFromCart = async (id: number): Promise<CartsRes> => {
  const res = await fetch(`${Config.api}/api/membercenter/mycart/destory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify({
      del: id,
    }),
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}
