'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const PrevButton = () => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <button onClick={handleClick}>
      <ChevronLeft />
    </button>
  )
}

export default PrevButton
