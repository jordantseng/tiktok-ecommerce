import axiosInstance from '@/lib/axios'
import { ApiRes, WebSettingsData } from '@/types/common'

type WebSettingsRes = ApiRes<WebSettingsData>

export const getWebSettings = async (): Promise<WebSettingsRes> => {
  const { data } = await axiosInstance.get('/api/web/show')

  return data
}
