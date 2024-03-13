export type CartItem = {
  id: number
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
  logisticprice: number
  address: string
  freelogisticprice?: number
  logisticprice_csv?: number
  jsonbody: string
  created_at: string
  updated_at: string
}
