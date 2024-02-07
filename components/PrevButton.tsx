'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type PrevButtonProps = {
  redirectUrl?: string
}

const PrevButton = ({ redirectUrl = '' }: PrevButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    if (redirectUrl) {
      router.push(redirectUrl)
      return
    }
    router.back()
  }

  return (
    <button onClick={handleClick}>
      <ChevronLeft />
    </button>
  )
}

export default PrevButton
