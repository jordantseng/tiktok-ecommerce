'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'

type CollapsibleTabProps = {
  title: string
  body: string
}

const CollapsibleTab = ({ title, body }: CollapsibleTabProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="flex cursor-pointer flex-col justify-between rounded-lg bg-white p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-1 items-center justify-between">
          <span className="font-semibold">{title}</span>
          {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </div>
        {isOpen && <div className="mt-2 flex-1" dangerouslySetInnerHTML={{ __html: body }} />}
      </div>
    </>
  )
}

export default CollapsibleTab
