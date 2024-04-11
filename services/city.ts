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

export const getCities = async (baseURL: string): Promise<CityRes> => {
  const { data } = await axiosInstance({
    method: 'GET',
    baseURL,
    url: '/api/city1',
  })

  return data
}

export const getDistrict = async (baseURL: string, city: string): Promise<DistrictRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/city2',
    data: { city1title: city },
  })

  return data
}
