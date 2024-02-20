import config from '@/lib/configs'
import { AddressData, ApiRes } from '@/types/common'

type AddressRes = ApiRes<{
  current_page: number
  data?: AddressData[]
  total: number
}>

export const getAddress = async (): Promise<AddressRes> => {
  const res = await fetch(`${config.api}/api/membercenter/myaddress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify({
      page: 1,
      pagesize: 10000,
    }),
    next: { revalidate: 0 },
  })

  const data = await res.json()

  return data
}

export const upsertAddress = async (value: AddressData): Promise<void> => {
  const res = await fetch(`${config.api}/api/membercenter/myaddress/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify({
      ...value,
    }),
    next: { revalidate: 0 },
  })

  const data = await res.json()

  return data
}

export const deleteAddress = async (id: number): Promise<void> => {
  const res = await fetch(`${config.api}/api/membercenter/myaddress/destroy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
    body: JSON.stringify({
      del: id,
    }),
    next: { revalidate: 0 },
  })

  const data = await res.json()

  return data
}

export const getLogistic = (type: string) => {
  const form = document.createElement('form')
  form.method = 'post'
  form.action = `${config.api}/ecpaylogisticmap`

  const fields = {
    logisticssubtype: type,
    token: (typeof window !== 'undefined' && localStorage.getItem('token')) || '',
    gobackurl: `https://${location.host}/confirm-order/upsert-receipt`,
  }

  // Append input elements to the form
  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
