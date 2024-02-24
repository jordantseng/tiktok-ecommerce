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

export const createMemberFeedback = async () => {
  const { data: res } = await axiosInstance.post<createFeedbackRes>(
    'api/membercenter/feedback/store',
    {
      id: 1,
      domain_id: 1,
      ordergroup_id: 10001,
      name: 'test',
      email: 'test@gmail.com',
      tel: '0212345678',
      mobile: '0912345678',
      title: 'test',
      memo: 'test',
      retitle: 'test',
      rebody: 'test',
      redate: '2021-08-01',
      member_id: 1,
      adminuser_id: 1,
      adminuser_name: 'admin',
      created_at: '2021-08-12',
      updated_at: '2021-08-01',
    },
  )

  return res.data
}

export const getMemberFeedbacks = async (orderGroupId?: number) => {
  const { data: res } = await axiosInstance.post<getFeedbackRes>('api/membercenter/feedback', {
    ordergroup_id: orderGroupId,
    page: 1,
    pagesize: 10,
    search: '',
  })

  return res.data
}
