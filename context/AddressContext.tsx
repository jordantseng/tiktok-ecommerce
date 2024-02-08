'use client'
import { AddressData } from '@/types/common'

import { ReactNode, createContext, useContext } from 'react'
import { useImmer } from 'use-immer'

export enum Delivery {
  'home-delivery' = 'home-delivery',
  'FAMIC2C' = 'FAMIC2C',
  'UNIMARTC2C' = 'UNIMARTC2C',
  'HILIFEC2C' = 'HILIFEC2C',
}

type AddressContextType = {
  //   addresses: AddressData[],
  selectedAddress: AddressData | null
  deliveryType: Delivery
  handleSelectAddress: (val: AddressData) => void
  handleSelectDeliveryType: (val: Delivery) => void
  //   updateAddress: (val: AddressData[]) => void;
}

const AddressContext = createContext<AddressContextType | null>(null)

type AddressProviderProps = {
  children: ReactNode
}

export const AddressProvider = ({ children }: AddressProviderProps) => {
  const [selectedAddress, setSelectedAddress] = useImmer<AddressData | null>(null)
  const [deliveryType, setDeliveryType] = useImmer<Delivery>(Delivery['home-delivery'])

  const handleSelectAddress = (val: AddressData) => setSelectedAddress(val)
  const handleSelectDeliveryType = (val: Delivery) => setDeliveryType(Delivery[val])
  //   const updateAddress = () => {}

  return (
    <AddressContext.Provider
      value={{
        selectedAddress,
        deliveryType,
        handleSelectAddress,
        handleSelectDeliveryType,
      }}
    >
      {children}
    </AddressContext.Provider>
  )
}

export const useAddressContext = () => {
  const value = useContext(AddressContext)

  if (value == null) {
    throw new Error('useSidebarContext cannot be used outside of SidebarProvider')
  }

  return value
}
