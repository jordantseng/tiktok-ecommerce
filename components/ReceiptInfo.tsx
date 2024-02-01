'use client'

import { Check } from 'lucide-react'
import React from 'react'

type Props = {
  receiver: string
  phone: string
  address: string
  isSelected: boolean
  onClick: () => void
}

const ReceiptInfo = ({ receiver, phone, address, isSelected, onClick }: Props) => {
  return (
    <div className="w-full px-4 py-2" onClick={onClick}>
      <div className="flex items-center justify-between space-x-2 rounded-lg bg-white p-4">
        <div className="flex flex-col">
          <pre className="font-semibold">
            取貨人： {receiver} {phone}
          </pre>
          <span>{address}</span>
        </div>
        {isSelected && <Check className="text-primary" />}
      </div>
    </div>
  )
}

export default ReceiptInfo
