import React from 'react'
import PrevButton from '@/components/PrevButton'

type Props = {
  title: string
  goBackUrl?: string
}

const Title = ({ title, goBackUrl }: Props) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-4">
      {goBackUrl ? (
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
    </header>
  )
}

export default Title
