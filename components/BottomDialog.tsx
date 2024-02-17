'use client'

import React, { PropsWithChildren } from 'react'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type BottomDialogProps = PropsWithChildren<{
  title: string
  className?: string
  onClose: () => void
}>

const BottomDialog = ({ title, children, className = '', onClose }: BottomDialogProps) => {
  return (
    <div className="relative z-40">
      <div className="fixed bottom-0 h-screen w-full bg-black/80" onClick={onClose} />
      <form
        className={cn(
          'fixed bottom-0 mx-auto h-[280px] w-full max-w-md rounded-t-xl bg-white p-4',
          className,
        )}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center">
          <h4 className="mb-2 flex flex-1 scroll-m-20 justify-center text-lg font-normal tracking-tight">
            {title}
          </h4>
          <button onClick={onClose}>
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        {children}
      </form>
    </div>
  )
}

export default BottomDialog
