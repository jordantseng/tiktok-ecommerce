import config from '@/lib/configs'
import { ApiRes } from '@/types/common'

export type LoginRes = ApiRes<{
  api_token: string
}>

export type LoginInfo = {
  email: string
  password: string
}

export type User = {
  id: number
  domain_id: number
  email: string
  mobile: string | null
  name: string | null
  tel: string | null
  memo: string | null
  img: string | null
  lastlogin_ip: string
  lastlogin_dt: string
  logincount: number | null
  online: number
  lineid: string | null
  fbid: string | null
  googleid: string | null
  tiktokid: string | null
  adminuser_account: string | null
  created_at: string
  updated_at: string
}

type UserRes = ApiRes<User>

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

export const getUser = async (): Promise<UserRes> => {
  const res = await fetch(`${config.api}/api/membercenter/show`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${(typeof window !== 'undefined' && localStorage.getItem('token')) || ''}`,
    },
  })

  const data = await res.json()

  return data
}
