import axiosInstance from '@/lib/axios'
import config from '@/lib/configs'
import { getToken } from '@/lib/utils'
import { AddressData, ApiRes } from '@/types/common'

type AddressRes = ApiRes<{
  current_page: number
  data?: AddressData[]
  total: number
}>

export const getAddress = async (): Promise<AddressRes> => {
  const { data } = await axiosInstance.post('/api/membercenter/myaddress', {
    page: 1,
    pagesize: 10000,
  })

  return data
}

export const upsertAddress = async (value: AddressData): Promise<void> => {
  const { data } = await axiosInstance.post('/api/membercenter/myaddress/store', {
    ...value,
  })

  return data
}

export const deleteAddress = async (id: number): Promise<void> => {
  const { data } = await axiosInstance.post('/api/membercenter/myaddress/destroy', {
    del: id,
  })

  return data
}

export const getLogistic = (type: string) => {
  const form = document.createElement('form')
  form.method = 'post'
  form.action = `${config.api}/ecpaylogisticmap`

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
