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
  productitem_title: string
  productitem_id: number
  qty: number
  price: number
  marketprice: number
  domain_id: number
  tags: string
  online: number
}

export type CartReq = {
  productitem_id: number
  qty: number
  online: number
}

export const getMyCart = async (): Promise<CartsRes> => {
  const { data } = await axiosInstance.post('/api/membercenter/mycart', {
    page: 1,
    pagesize: 10000,
  })

  return data
}

export const addToCart = async (id: number, count: number): Promise<CartsRes> => {
  const { data } = await axiosInstance.post('/api/membercenter/mycart/store', {
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
  qty: number
  online: number
}

export const addToCarts = async (carts: CartBodyItem[]): Promise<CartsRes> => {
  const { data } = await axiosInstance.post('/api/membercenter/mycart/store', {
    data: carts,
  })

  return data
}

export const updatePurchase = async (req: CartReq[]): Promise<CartsRes> => {
  const { data } = await axiosInstance.post('/api/membercenter/mycart/store', {
    data: req.map((opt) => opt),
  })

  return data
}

export const deleteFromCart = async (id: number): Promise<CartsRes> => {
  const { data } = await axiosInstance.post('/api/membercenter/mycart/destroy', {
    del: id,
  })

  return data
}
