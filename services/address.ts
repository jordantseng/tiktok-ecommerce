import axiosInstance from '@/lib/axios'
import { getToken } from '@/lib/utils'
import { AddressData, ApiRes } from '@/types/common'

type AddressRes = ApiRes<{
  current_page: number
  data?: AddressData[]
  total: number
}>

export const getAddress = async (baseURL: string): Promise<AddressRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/membercenter/myaddress',
    data: {
      page: 1,
      pagesize: 10000,
    },
  })

  return data
}

export const upsertAddress = async (baseURL: string, value: AddressData): Promise<void> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/membercenter/myaddress/store',
    data: {
      ...value,
    },
  })

  return data
}

export const deleteAddress = async (baseURL: string, id: number): Promise<void> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/membercenter/myaddress/destroy',
    data: {
      del: id,
    },
  })

  return data
}

export const getLogistic = (baseURL: string, type: string) => {
  const form = document.createElement('form')
  form.method = 'post'
  form.action = `${baseURL}/ecpaylogisticmap`

  const fields = {
    logisticssubtype: type,
    token: getToken(),
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
