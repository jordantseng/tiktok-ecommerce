import { createInstance } from '@/lib/axios'
import { ApiRes, WebSettingsData } from '@/types/common'

type WebSettingsRes = ApiRes<WebSettingsData>

export const getWebSettings = async (): Promise<WebSettingsRes> => {
  const axiosInstance = createInstance()
  const { data } = await axiosInstance.get('/api/web/show')

  return data
}
