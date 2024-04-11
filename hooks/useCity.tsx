'use client'
import { getBaseURL } from '@/lib/utils'
import { getCities, getDistrict } from '@/services/city'
import { useCallback, useEffect } from 'react'
import { useImmer } from 'use-immer'

export const useCity = () => {
  const [cities, setCities] = useImmer<string[]>([])
  const [districts, setDistricts] = useImmer<string[]>([])

  useEffect(() => {
    const baseURL = getBaseURL(window.location.host)

    getCities(baseURL).then(({ data }) => {
      const res = data.map((opt) => opt.city1title)
      setCities(res)
    })
  }, [setCities])

  const handleGetDistrict = useCallback(
    (city: string) => {
      const baseURL = getBaseURL(window.location.host)

      if (city) {
        getDistrict(baseURL, city).then(({ data }) => {
          const res = data.data.map((opt) => `${opt.postal}${opt.city2title}` || '')
          setDistricts(res)
        })
      }
    },
    [setDistricts],
  )

  return {
    cities,
    districts,
    handleGetDistrict,
  }
}
