import axiosInterceptorInstance from '@/lib/axios'
import { ApiRes, WebSettingsData } from '@/types/common'

type WebSettingsRes = ApiRes<WebSettingsData>

export const getWebSettings = async (): Promise<WebSettingsRes> => {
  const { data } = await axiosInterceptorInstance.get('/api/web/show')

  return data
}
