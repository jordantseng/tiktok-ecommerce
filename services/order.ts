import { format, parse } from 'date-fns'

import axiosInstance from '@/lib/axios'
import config from '@/lib/configs'
import { getToken } from '@/lib/utils'
import { ApiRes } from '@/types/common'

type OrderRes = ApiRes<OrderData>

type OrdersRes = ApiRes<{
  current_page: number
  data: OrderData[]
  total: number
}>

export type OrderStatus = 'checkout' | 'shipping' | 'receipt' | 'receipted' | 'refunded'

export type OrderStatusTitle = '待付款' | '待發貨' | '待收貨' | '已收貨' | '已退款'

export enum PaymentMethodEnum {
  homepay = '貨到付款',
  atm = '匯款',
  'ecpay-csv' = '超商取貨付款(綠界)',
  'ecpay-atm' = '轉帳(綠界)',
  'ecpay-credit' = '信用卡付款(綠界)',
  'ecpay-credit3' = '信用卡分3期(綠界)',
  'ecpay-credit6' = '信用卡分6期(綠界)',
  'ecpay-credit12' = '信用卡分12期(綠界)',
  'newbpay-atm' = '轉帳(藍新)',
  'newbpay-credit' = '信用卡(藍新)',
  'newbpay-credit3' = '信用卡分3期(藍新)',
  'newbpay-credit6' = '信用卡分6期(藍新)',
  'newbpay-credit12' = '信用卡分12期(藍新)',
  'wanpay-credit' = '信用卡(快點付)',
  'wanpay-credit3' = '信用卡分3期(快點付)',
  'wanpay-credit6' = '信用卡分6期(快點付)',
  'wanpay-credit12' = '信用卡分12期(快點付)',
  'wanpay-credit24' = '信用卡分24期(快點付)',
}

export type PayStatus = keyof typeof PaymentMethodEnum

export type OrderDetail = {
  imgs: string[]
  product_title: string
  productitem_title: string
  price: number
  qty?: number
  id: number
  ordergroup_id: number
  product_imgs: string
  product_id: number
  productitem_id: number
  created_at: string | null
  updated_at: string | null
}

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

  // 付款方式 //貨到付款[homepay],匯款[atm],超商取貨付款(綠界)[ecpay-csv],轉帳(綠界)[ecpay-atm],信用卡付款(綠界)[ecpay-credit],信用卡分3期(綠界)[ecpay-credit3],信用卡分6期(綠界)[ecpay-credit6],信用卡分12期(綠界)[ecpay-credit12],轉帳(藍新)[newbpay-atm],信用卡(藍新)[newbpay-credit],信用卡分3期(藍新)[newbpay-credit3],信用卡分6期(藍新)[newbpay-credit6],信用卡分12期(藍新)[newbpay-credit12],信用卡(快點付)[wanpay-credit],信用卡分3期(快點付)[wanpay-credit3],信用卡分6期(快點付)[wanpay-credit6],信用卡分12期(快點付)[wanpay-credit12],信用卡分24期(快點付)[wanpay-credit24],
  paystatus?: PayStatus

  paynumber?: string
  paynotifynumber?: string

  // 付款狀態 //尚未收到款項[0],付款成功[1],付款金額錯誤[3],付款失敗[2],已退款[4],
  moneystatus?: number

  // 訂單處理情況 //訂單通知[0],訂單處理中[1],取消訂購通知[2],貨品寄出通知[3],訂單結案[4],
  orderstatus?: number

  updated_at?: string
  product_id?: number | null
  product_title?: string | null
  productitem_title?: string | null
  product_imgs?: string[] | null
  orderdetail?: OrderDetail[]
  paybranch?: string
  payaccount?: string
  payexpiredate?: string
}

export const getOrder = async (id: number): Promise<OrderRes> => {
  const { data } = await axiosInstance.post('/api/membercenter/ordergroup/show', { id })

  return data
}

export const getOrders = async (): Promise<OrdersRes> => {
  const { data } = await axiosInstance.post('/api/membercenter/ordergroup', {
    page: 1,
    pagesize: 10000,
  })

  return data
}

export const addOrder = async (order: OrderData): Promise<void> => {
  const form = document.createElement('form')
  form.method = 'post'
  form.action = `${config.api}/membercenter/ordergroup/store`

  const fields = {
    id: Date.now(),
    token: getToken(),
    domain_title: order.domain_title || location.hostname,
    member_id: order.member_id || '',
    domain_id: 1,
    member_name: order.member_name || '無',
    LogisticsSubType:
      (order.LogisticsSubType !== 'HOME_DELIVERY' ? order.LogisticsSubType : '') || '',
    deliverystatus: order.CVSStoreName
      ? 'CSV'
      : order.raddress && !order.CVSAddress
        ? 'HOME'
        : 'store',
    CVSStoreName: order.CVSStoreName || '',
    discount: order.discount || '',
    discount_title: order.discount_title || '',
    discount_code: order.discount_code || '',
    gobackurl: order.paystatus?.includes('atm')
      ? `https://${location.host}/member/orders/atm-detail/checkout`
      : `https://${location.host}/confirm-order/success`,
    CVSAddress: order.CVSAddress || '',
    CVSStoreID: order.CVSStoreID || '',
    paystatus: order.paystatus || '',
    remail: order.remail || 'test@mail.com',
    rname: order.rname || '',
    rtel: order.rtel || '',
    rcity1: order.rcity1 || '無',
    rcity2: order.rcity2 || '無',
    raddress: order.raddress || '無',
  }

  // Append input elements to the form
  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input')
    input.type = 'text'
    input.name = name
    input.value = value.toString()
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

export const previewDiscont = async (code: string): Promise<OrderRes> => {
  const { data } = await axiosInstance.post('/api/membercenter/ordergroup/review', {
    discount: code || '',
  })

  return data
}

export function filterOrderByStatus(key: OrderStatus, orders: OrderData[]) {
  switch (key) {
    case 'checkout':
      return orders.filter((order) => order.moneystatus === 0)
    case 'shipping':
      return orders.filter((order) => order.orderstatus === 1)
    case 'receipt':
      return orders.filter((order) => order.orderstatus === 3)
    case 'receipted':
      return orders.filter((order) => order.orderstatus === 4 && order.moneystatus !== 4)
    case 'refunded':
      return orders.filter((order) => order.moneystatus === 4)
  }
}

export function getOrderStatusTitle(order: OrderData): OrderStatusTitle | null {
  if (order.moneystatus === 0) return '待付款'
  if (order.orderstatus === 1) return '待發貨'
  if (order.orderstatus === 3) return '待收貨'
  if (order.orderstatus === 4 && order.moneystatus !== 4) return '已收貨'
  if (order.moneystatus === 4) return '已退款'
  return null
}

export function getOrderStatus(order: OrderData): OrderStatus | null {
  if (order.moneystatus === 0) return 'checkout'
  if (order.orderstatus === 1) return 'shipping'
  if (order.orderstatus === 3) return 'receipt'
  if (order.orderstatus === 4 && order.moneystatus !== 4) return 'receipted'
  if (order.moneystatus === 4) return 'refunded'
  return null
}

export function getFormatDate(date: string) {
  const parseDate = parse(date, 'yyyy-MM-dd HH:mm:ss', new Date())
  return format(parseDate, 'yyyy.MM.dd HH:mm:ss')
}
