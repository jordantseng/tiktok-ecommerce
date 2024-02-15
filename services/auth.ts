import config from '@/lib/configs'
import { ApiRes } from '@/types/common'

export type LoginRes = ApiRes<{
  api_token: string
}>

export type LoginInfo = {
  email: string
  password: string
}

export const login = async ({ email, password }: LoginInfo): Promise<LoginRes> => {
  const res = await fetch(`${config.api}/api/member/login/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()

  return data
}

export const register = async ({ email, password }: LoginInfo): Promise<LoginRes> => {
  const res = await fetch(`${config.api}/api/member/create/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()

  return data
}
