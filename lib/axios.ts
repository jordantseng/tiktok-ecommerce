import axios from 'axios'
import { redirect } from 'next/navigation'
import config from './configs'
import { ApiRes } from '@/types/common'

const axiosInstance = axios.create({
  baseURL: config.api,
  headers: {
    Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
  },
})

axiosInstance.interceptors.response.use((response) => {
  const data: ApiRes<any> = response.data
  if (data.resultcode === 403) {
    // localStorage.removeItem('token')
    redirect('/login')
  }
  if (400 <= data.resultcode && data.resultcode < 500) {
    throw new Error(data.resultmessage)
  }
  return response
})

export default axiosInstance
