import React, { ReactNode } from 'react'
import PrevButton from '@/components/PrevButton'

type Props = {
  title: string
  goBackUrl?: string
  hasPrevButton?: boolean
  rightComponent?: ReactNode
}

const Title = ({ title, goBackUrl, rightComponent, hasPrevButton = true }: Props) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
      {hasPrevButton ? (
        <>
          <div className="flex w-1/4 justify-start">
            <PrevButton redirectUrl={goBackUrl} />
          </div>
          <h4 className="w-1/2 text-center text-xl font-normal tracking-tight">{title}</h4>
          <div className="w-1/4" /> {/* Placeholder to balance the layout */}
        </>
      ) : (
        <h4 className="w-full text-center text-xl font-normal tracking-tight">{title}</h4>
      )}
      {rightComponent && <div className="absolute right-4">{rightComponent}</div>}
    </header>
  )
}

export default Title
