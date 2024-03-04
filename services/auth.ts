import axiosInstance from '@/lib/axios'
import { ApiRes } from '@/types/common'

export type LoginRes = ApiRes<{
  api_token: string
}>

export type LoginInfo = {
  email: string
  password: string
}

export type RegisterInfo = LoginInfo & {
  code: string
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

type EmailCodeRes = ApiRes<{}>

export const login = async ({ email, password }: LoginInfo): Promise<LoginRes> => {
  const { data } = await axiosInstance.post('/api/member/login/store', {
    email,
    password,
  })

  return data
}

export const register = async ({ email, password, code }: RegisterInfo): Promise<LoginRes> => {
  const { data } = await axiosInstance.post('/api/member/create/store', {
    email,
    password,
    code,
  })

  return data
}

export const getEmailCode = async (email: string): Promise<ApiRes<EmailCodeRes>> => {
  const { data } = await axiosInstance.post('/api/member/emailcode/send', {
    email,
  })

  return data
}

export const getUser = async (): Promise<UserRes> => {
  const { data } = await axiosInstance.get('/api/membercenter/show')

  return data
}

export const updateUser = async (user: Partial<Omit<User, 'id'>>): Promise<UserRes> => {
  const { mobile, name, email } = user

  const { data } = await axiosInstance.post('/api/membercenter/edit/store', {
    mobile,
    name,
    email,
  })

  return data
}
