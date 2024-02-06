import Config from '@/lib/configs'
import { ApiRes } from '@/types/common'

type CartRes = ApiRes<CartData>

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
}

export const getMyCart = async (): Promise<CartRes> => {
  const res = await fetch(`${Config.api}/api/membercenter/mycart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
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

export const addToCart = async (id: number): Promise<CartsRes> => {
  const res = await fetch(`${Config.api}/api/membercenter/mycart/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify({
      productitem_id: id,
    }),
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
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify({
      del: id,
    }),
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}
