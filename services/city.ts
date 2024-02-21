import axiosInstance from '@/lib/axios'
import { ApiRes } from '@/types/common'

type CityRes = ApiRes<CityData[]>

type DistrictRes = ApiRes<{
  current_page: number
  data: CityData[]
  total: number
}>

type CityData = {
  city1title: string
  city2title?: string
  postal?: string
}

export const getCities = async (): Promise<CityRes> => {
  const { data } = await axiosInstance.get('/api/city1')

  return data
}

export const getDistrict = async (city: string): Promise<DistrictRes> => {
  const { data } = await axiosInstance.post('/api/city2', {
    city1title: city,
  })

  return data
}
