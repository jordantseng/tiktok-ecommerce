import axiosInstance from '@/lib/axios'
import { ApiRes } from '@/types/common'

export type FeedbackData = {
  id: number
  domain_id: number
  ordergroup_id: number
  name: string
  email: string
  tel: string
  mobile: string
  title: string
  memo: string
  retitle: string
  rebody: string
  redate: string
  member_id: number
  adminuser_id: number
  adminuser_name: string
  created_at: string
  updated_at: string
}

type createFeedbackRes = ApiRes<{ id: number }>

type getFeedbackRes = ApiRes<{
  current_page: number
  total: number
  per_page: number
  data: FeedbackData[]
}>

export const createMemberFeedback = async (baseURL: string, feedback: FeedbackData) => {
  const { data: res } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: 'api/membercenter/feedback/store',
    data: feedback,
  })

  if (res.resultcode !== 0) {
    throw new Error(res.resultmessage)
  }

  return res.data
}

export const getMemberFeedbacks = async (baseURL: string, orderGroupId?: number) => {
  const { data: res } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: 'api/membercenter/feedback',
    data: {
      ordergroup_id: orderGroupId,
      page: 1,
      pagesize: 10,
      search: '',
    },
  })

  return res.data
}
