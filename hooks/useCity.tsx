'use client'
import { getCities, getDistrict } from '@/services/city'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'

export const useCity = () => {
  const [cities, setCities] = useImmer<string[]>([])
  const [districts, setDistricts] = useImmer<string[]>([])

  useEffect(() => {
    getCities().then(({ data }) => {
      const res = data.map((opt) => opt.city1title)
      setCities(res)
    })
  }, [])

  const handleGetDistrict = (city: string) => {
    getDistrict(city).then(({ data }) => {
      const res = data.map((opt) => opt.city2title || '')
      setDistricts(res)
    })
  }

  return {
    cities,
    districts,
    handleGetDistrict,
  }
}
