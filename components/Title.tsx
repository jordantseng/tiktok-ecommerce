import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  title: string
  goBackUrl?: string
}

const Title = ({ title, goBackUrl }: Props) => {
  return (
    <header className="flex items-center justify-between bg-white px-4 pb-4 pt-6">
      {goBackUrl ? (
        <>
          <div className="flex w-1/4 justify-start">
            <Link href={goBackUrl}>
              <ChevronLeft />
            </Link>
          </div>
          <h4 className="w-1/2 text-center text-xl font-normal tracking-tight">{title}</h4>
          <div className="w-1/4"></div> {/* Placeholder to balance the layout */}
        </>
      ) : (
        <h4 className="w-full text-center text-xl font-normal tracking-tight">{title}</h4>
      )}
    </header>
  )
}

export default Title
