import axiosInstance from '@/lib/axios'
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
  product_id: string
  productitem_title: string
  productitem_id: number
  qty: number
  price: number
  marketprice: number
  domain_id: number
  tags: string
  online: number
  unit: string
}

export type CartReq = {
  productitem_id: number
  qty: number
  online: number
}

export const getMyCart = async (baseURL: string): Promise<CartsRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/membercenter/mycart',
    data: {
      page: 1,
      pagesize: 10000,
    },
  })

  return data
}

export const addToCart = async (baseURL: string, id: number, count: number): Promise<CartsRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/membercenter/mycart/store',
    data: [
      {
        productitem_id: id,
        qty: count || 1,
        online: 0,
      },
    ],
  })

  return data
}

export type CartBodyItem = {
  productitem_id: number
  qty?: number
  online: number
}

export const addToCarts = async (baseURL: string, carts: CartBodyItem[]): Promise<CartsRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/membercenter/mycart/store',
    data: carts,
  })

  return data
}

export const updatePurchase = async (baseURL: string, req: CartReq[]): Promise<CartsRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/membercenter/mycart/store',
    data: req.map((opt) => opt),
  })

  return data
}

export const deleteFromCart = async (baseURL: string, id: number): Promise<CartsRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/membercenter/mycart/destroy',
    data: {
      del: id,
    },
  })

  return data
}
