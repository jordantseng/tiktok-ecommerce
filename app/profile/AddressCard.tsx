'use client'

import { SquarePen, Trash2Icon } from 'lucide-react'
import { AddressData } from '@/types/common'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'

type AddressCardProps = {
  address: AddressData
  onClick: () => void
  onDelete: () => void
}

function AddressCard({ address, onClick, onDelete }: AddressCardProps) {
  return (
    <section className="flex items-center justify-between rounded-xl bg-white p-4">
      <div className="flex cursor-pointer flex-col" onClick={onClick}>
        <span className="flex items-center gap-2">
          <span className="grid h-8 w-auto place-items-center rounded-xl bg-primary-foreground px-2 text-primary">
            {address.CVSStoreName || '取貨地點'}
          </span>
          <p>{address.name}</p>
          <p>{address.tel}</p>
        </span>
        <span className="text-gray-500">{address.CVSAddress || address.address}</span>
      </div>
      <div className="flex space-x-2">
        <SquarePen className="mt-2 cursor-pointer text-gray-500" onClick={onClick} />
        <ConfirmDeleteDialog onConfirm={onDelete} />
      </div>
    </section>
  )
}

export default AddressCard
