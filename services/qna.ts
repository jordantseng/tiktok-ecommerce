import axiosInstance from '@/lib/axios'
import { ApiRes } from '@/types/common'

type getQNAsRes = ApiRes<{
  current_page: number
  data: QNAData[]
}>

export type QNAData = { id: number; title: string; body: string }

export const getQNAs = async (page = 1, pageSize = 10) => {
  const { data: res } = await axiosInstance.post<getQNAsRes>('/api/qa', {
    page,
    pagesize: pageSize,
  })

  return res.data
}
