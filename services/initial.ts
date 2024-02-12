import config from '@/lib/configs'
import { ApiRes, InitialData } from '@/types/common'

type InitialRes = ApiRes<InitialData>

export const getInitial = async (): Promise<InitialRes> => {
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
