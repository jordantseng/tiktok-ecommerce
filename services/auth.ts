import axiosInstance from '@/lib/axios'
import config from '@/lib/configs'
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

type ChangePasswordRes = ApiRes<{
  id: string
}>

export const loginEmail = async ({ email, password }: LoginInfo): Promise<LoginRes> => {
  const { data } = await axiosInstance.post('/api/member/login/store', {
    email,
    password,
  })

  return data
}

export const loginTiktok = async (callbackURL: string): Promise<void> => {
  const form = document.createElement('form')

  form.method = 'post'
  form.action = `${config.api}/sso/tiktok`

  const fields = {
    client_gobackurl: callbackURL,
  }

  // Append input elements to the form
  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value.toString()
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

export const register = async ({ email, password, code }: RegisterInfo): Promise<LoginRes> => {
  const { data } = await axiosInstance.post('/api/member/create/store', {
    email,
    password,
    code,
  })

  return data
}

export const getEmailCode = async (email: string): Promise<ApiRes<{}>> => {
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
  const { mobile, email, name } = user

  const body: typeof user = {
    email,
  }

  if (mobile) body.mobile = mobile
  if (name) body.name = name

  const { data } = await axiosInstance.post('/api/membercenter/edit/store', body)

  return data
}

export const forgetPassword = async (email: string): Promise<ApiRes<{}>> => {
  const { data } = await axiosInstance.post('/api/member/forgetpwd/store', {
    email,
  })

  return data
}

export const changePassword = async (password: string): Promise<ChangePasswordRes> => {
  const { data } = await axiosInstance.post('/api/membercenter/changepassword/store', {
    password,
  })

  return data
}
