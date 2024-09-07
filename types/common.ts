export type CartItem = {
  id: number
  unit?: string
  imgUrl?: string
  title: string
  tags?: string[]
  amount?: number
  price?: number
  originPrice: number
  productItemTitle?: string
  productItemId?: number
  product_id?: string
  stars?: number
  sales?: string
  isSelect?: boolean
}

export type ApiRes<Data> = {
  resultcode: number
  resultmessage: string
  data: Data
}

export type AddressData = {
  id?: number
  title?: string
  member_id: number
  LogisticsSubType: string
  city1?: string
  city2?: string
  address?: string
  name: string
  tel: string
  CVSStoreName?: string
  CVSStoreID?: string
  CVSAddress?: string
}

export type WebSettingsData = {
  tel: string
  paykind: Record<string, string>
  paystatus: string
  id: number
  name: string
  domain: string
  title: string
  keyword: string
  description: string
  email: string
  mobile: string
  logisticprice_home?: number
  address: string
  freelogisticprice?: number
  logisticprice_cvs?: number
  api_token?: string
  liffid?: string
  jsonbody: string
  created_at: string
  updated_at: string
  ico: string
  invoice: string
  html: string
  deliverykind?: Record<string, string>
}
//  trigger rebuild
