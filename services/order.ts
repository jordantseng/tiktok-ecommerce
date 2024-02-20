import config from '@/lib/configs'
import { ApiRes } from '@/types/common'

type OrderRes = ApiRes<OrderData>

type OrdersRes = ApiRes<{
  current_page: number
  data: OrderData[]
  total: number
}>

export type OrderData = {
  domain_title?: string
  member_name: string
  id?: number
  totalprice?: number
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
  // 付款狀態: 尚未收到款項[0],付款成功[1],付款金額錯誤[3],付款失敗[2]
  moneystatus?: number
  // 訂單狀態: 訂單通知[0],訂單處理中[1],取消訂購通知[2],貨品寄出通知[3],訂單結案[4]
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
    domain_title: order.domain_title || location.hostname,
    member_name: order.member_name,
    LogisticsSubType: order.LogisticsSubType || '',
    CVSStoreName: order.CVSStoreName || '',
    discount: order.discount || '',
    discount_title: order.discount_title || '',
    discount_code: order.discount_code || '',
    gobackurl: `http://${location.host}/confirm-order/upsert-receipt`,
    CVSAddress: order.CVSAddress || '',
    CVSStoreID: order.CVSStoreID || '',
    paystatus: order.paystatus || '',
    remail: order.remail || '',
    rname: order.rname || '',
    rtel: order.rtel || '',
    rcity1: order.rcity1 || '',
    rcity2: order.rcity2 || '',
    raddress: order.raddress || '',
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

export const previewDiscont = async (code: string): Promise<void> => {
  const res = await fetch(`${config.api}/api/membercenter/ordergroup/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify({ discount: code || '' }),
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}
