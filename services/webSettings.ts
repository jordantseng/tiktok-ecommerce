import config from '@/lib/configs'
import { ApiRes, webSettingsData } from '@/types/common'

type WebSettingsRes = ApiRes<webSettingsData>

export const getWebSettings = async (): Promise<WebSettingsRes> => {
  const res = await fetch(`${config.api}/api/web/show`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}
