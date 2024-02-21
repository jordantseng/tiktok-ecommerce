import axios from 'axios'
import config from './configs'
import { ApiRes } from '@/types/common'

const axiosInterceptorInstance = axios.create({
  baseURL: config.api,
  headers: {
    Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
  },
})

axiosInterceptorInstance.interceptors.response.use((response) => {
  const data: ApiRes<any> = response.data
  if (data.resultcode === 403) {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  if (400 <= data.resultcode && data.resultcode < 500) {
    throw new Error(data.resultmessage)
  }
  return response
})

export default axiosInterceptorInstance
