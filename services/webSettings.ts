import axiosInstance from '@/lib/axios'
import { ApiRes, WebSettingsData } from '@/types/common'

type WebSettingsRes = ApiRes<WebSettingsData>

export const getWebSettings = async (baseURL: string) => {
  const { data } = await axiosInstance<WebSettingsRes>({
    method: 'GET',
    baseURL,
    url: '/api/web/show',
  })

  return data
}
