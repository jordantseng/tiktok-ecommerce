'use client'
import { getCities, getDistrict } from '@/services/city'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

type CityContextType = {
  cities: string[]
  districts: string[]
  handleGetDistrict: (city: string) => void
}

const CityContext = createContext<CityContextType | null>(null)

type CartProviderProps = {
  children: ReactNode
}

export const CityProvider = ({ children }: CartProviderProps) => {
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

  return (
    <CityContext.Provider
      value={{
        cities,
        districts,
        handleGetDistrict,
      }}
    >
      {children}
    </CityContext.Provider>
  )
}

export const useCityContext = () => {
  const value = useContext(CityContext)

  if (value == null) {
    throw new Error('useSidebarContext cannot be used outside of SidebarProvider')
  }

  return value
}
