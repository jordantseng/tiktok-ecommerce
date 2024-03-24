'use client'

import { SquarePen } from 'lucide-react'
import { AddressData } from '@/types/common'

type AddressCardProps = {
  address: AddressData
  onClick: () => void
}

function AddressCard({ address, onClick }: AddressCardProps) {
  return (
    <section
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4"
    >
      <div className="flex flex-col">
        <span className="flex items-center gap-2">
          <span className="grid h-8 w-auto place-items-center rounded-xl bg-primary-foreground text-primary">
            {address.CVSStoreName || '取貨地點'}
          </span>
          <p>{address.name}</p>
          <p>{address.tel}</p>
        </span>
        <span className="text-gray-500">{address.CVSAddress || address.address}</span>
      </div>
      <SquarePen className="text-gray-500" />
    </section>
  )
}

export default AddressCard
