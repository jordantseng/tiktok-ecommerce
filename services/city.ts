import Config from '@/lib/configs'
import { ApiRes } from '@/types/common'

type CityRes = ApiRes<CityData[]>

type CityData = {
  city1title: string
  city2title?: string
  postal?: string
}

export const getCities = async (): Promise<CityRes> => {
  const res = await fetch(`${Config.api}/api/city1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}

export const getDistrict = async (city: string): Promise<CityRes> => {
  const res = await fetch(`${Config.api}/api/city2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      city1title: city,
    }),
    next: { revalidate: 60 * 5 },
  })

  const data = await res.json()

  return data
}
