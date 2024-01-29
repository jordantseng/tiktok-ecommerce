export interface CartItems {
  id: number
  imgUrl?: string
  title: string
  tags?: string[]
  unit?: string
  amount?: number
  prize: number
  specialPrize?: number
}

export type ApiRes<Data> = {
  resultcode: number
  resultmessage: string
  data: Data
}
