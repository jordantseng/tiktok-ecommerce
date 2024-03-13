'use client'
import { AddressData } from '@/types/common'

import { ReactNode, createContext, useCallback, useContext } from 'react'
import { useImmer } from 'use-immer'

export enum Delivery {
  'HOME_DELIVERY' = 'HOME_DELIVERY',
  'FAMIC2C' = 'FAMIC2C',
  'UNIMARTC2C' = 'UNIMARTC2C',
  'HILIFEC2C' = 'HILIFEC2C',
}

type AddressContextType = {
  //   addresses: AddressData[],
  selectedAddress: AddressData | null
  deliveryType: Delivery | null
  handleSelectAddress: (val: AddressData) => void
  handleSelectDeliveryType: (val: Delivery) => void
  resetSelectAddress: () => void
  //   updateAddress: (val: AddressData[]) => void;
}

const AddressContext = createContext<AddressContextType | null>(null)

type AddressProviderProps = {
  children: ReactNode
}

export const AddressProvider = ({ children }: AddressProviderProps) => {
  const [selectedAddress, setSelectedAddress] = useImmer<AddressData | null>(null)
  const [deliveryType, setDeliveryType] = useImmer<Delivery | null>(null)

  const handleSelectAddress = useCallback(
    (val: AddressData) => setSelectedAddress(val),
    [setSelectedAddress],
  )
  const handleSelectDeliveryType = (val: Delivery) => setDeliveryType(Delivery[val])
  const resetSelectAddress = () => setSelectedAddress(null)
  //   const updateAddress = () => {}

  return (
    <AddressContext.Provider
      value={{
        selectedAddress,
        deliveryType,
        handleSelectAddress,
        handleSelectDeliveryType,
        resetSelectAddress,
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
