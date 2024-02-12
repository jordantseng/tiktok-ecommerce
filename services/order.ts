import config from '@/lib/configs'
import { ApiRes } from '@/types/common'

type OrderRes = ApiRes<OrderData>

type OrdersRes = ApiRes<{
  current_page: number
  data: OrderData[]
  total: number
}>

type OrderData = {
  domain_title?: string
  member_name: string
  id: number
  totalprice: number
  LogisticsSubType?: string
  AllPayLogisticsID?: string
  CVSRtnMsg?: string
  CVSPaymentNo?: string
  CVSValidationNo?: string
  CVSmsg?: string
  clientip?: string
  totalportage?: number
  CVSStoreName?: string
  discount?: number
  discount_title?: string
  discount_code?: string
  gobackurl?: string
  paymsg?: string
  adminuser_account?: string
  created_at?: string
  CVSAddress?: string
  CVSStoreID?: string
  ordergroupnumber?: string
  rcity2?: string
  member_id?: number
  domain_id?: number
  rsex?: string
  remail?: string
  rname?: string
  rtel?: string
  rcity1?: string
  raddress?: string
  deliverystatus?: string
  rmemo?: string
  invoicekind?: string
  paystatus?: string
  paynumber?: string
  paynotifynumber?: string
  moneystatus?: number
  orderstatus?: number
  updated_at?: string
}

export const getOrder = async (id: number): Promise<OrderRes> => {
  const res = await fetch(`${config.api}/api/membercenter/ordergroup/show`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify(id),
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}

export const getOrders = async (): Promise<OrdersRes> => {
  const res = await fetch(`${config.api}/api/membercenter/ordergroup`, {
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

export const addOrder = async (order: OrderData): Promise<void> => {
  const form = document.createElement('form')
  form.method = 'post'
  form.action = `${config.api}/api/membercenter/ordergroup/store`

  const fields = {
    domain_title: location.hostname,
    member_name: order.member_name,
    LogisticsSubType: order.LogisticsSubType || '',
    CVSStoreName: order.CVSStoreName || '',
    discount: order.discount || '',
    discount_title: order.discount_title || '',
    discount_code: order.discount_code || '',
    gobackurl: `http://${location.host}/confirm-order/add-receipt`,
    CVSAddress: order.CVSAddress || '',
    CVSStoreID: order.CVSStoreID || '',
    paystatus: order.paystatus || '',
  }

  // Append input elements to the form
  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value.toString()
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

export const previewDiscont = async (order: OrderData): Promise<void> => {
  const res = await fetch(`${config.api}/api/membercenter/ordergroup/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify({ discount: order.discount || '' }),
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}
