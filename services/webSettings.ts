import axiosInstance from '@/lib/axios'
import { ApiRes, WebSettingsData } from '@/types/common'

type WebSettingsRes = ApiRes<WebSettingsData>

export const getWebSettings = async () => {
  const { data } = await axiosInstance.get<WebSettingsRes>('/api/web/show')

  return data
}
