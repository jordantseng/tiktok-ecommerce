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
  username: string
}

type UserRes = ApiRes<User>

type SuccessRes = ApiRes<{
  id: string
}>

export const loginEmail = async (
  baseURL: string,
  { email, password }: LoginInfo,
): Promise<LoginRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/member/login/store',
    data: {
      email,
      password,
    },
  })

  return data
}

export const loginTiktok = async (
  baseURL: string,
  callbackURL: string,
  token?: string,
): Promise<void> => {
  const form = document.createElement('form')

  form.method = 'post'
  form.action = `${baseURL}/sso/tiktok`

  const fields = {
    client_gobackurl: callbackURL,

    // email login and want to bind tiktokid too
    ...(token && { token }),
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

export const register = async (
  baseURL: string,
  { email, password, code }: RegisterInfo,
): Promise<LoginRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/member/create/store',
    data: {
      email,
      password,
      code,
    },
  })

  return data
}

export const getEmailCode = async (baseURL: string, email: string): Promise<ApiRes<{}>> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/member/emailcode/send',
    data: {
      email,
    },
  })

  return data
}

export const getUser = async (baseURL: string): Promise<UserRes> => {
  const { data } = await axiosInstance({
    method: 'GET',
    baseURL,
    url: '/api/membercenter/show',
  })

  return data
}

export const updateUser = async (
  baseURL: string,
  user: Partial<Omit<User, 'id'>>,
): Promise<UserRes> => {
  const { mobile, email, name } = user

  const body: typeof user = {
    email,
  }

  if (mobile) body.mobile = mobile
  if (name) body.name = name

  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/membercenter/edit/store',
    data: body,
  })

  return data
}

export const forgetPassword = async (baseURL: string, email: string): Promise<ApiRes<{}>> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/member/forgetpwd/store',
    data: {
      email,
    },
  })

  return data
}

export const changePassword = async (baseURL: string, password: string): Promise<SuccessRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/membercenter/changepassword/store',
    data: {
      password,
    },
  })

  return data
}

export const checkEmailExist = async (
  baseURL: string,
  email: string,
  dict: string,
): Promise<SuccessRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/member/tiktok/emailcheck',
    data: {
      email,
      dict,
    },
  })

  return data
}

type RegisterTiktokInfo = {
  dict: string
  email: string
  name: string
  password: string
}

type RegisterTiktokRes = ApiRes<{
  token: string
}>

export const registerTiktok = async (
  baseURL: string,
  tiktokInfo: RegisterTiktokInfo,
): Promise<RegisterTiktokRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/member/tiktok/store',
    data: tiktokInfo,
  })

  return data
}
