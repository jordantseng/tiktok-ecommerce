export type CartItem = {
  id: number
  imgUrl?: string
  title: string
  tags?: string[]
  unit?: string
  amount?: number
  prize: number
  specialPrize?: number
  sales?: number
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
