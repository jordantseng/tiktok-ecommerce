'use client'

import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

function ForgetPasswordButton() {
  const router = useRouter()

  return (
    <div className="flex items-center">
      <span
        onClick={() => router.push('forget-password')}
        className="flex cursor-pointer items-center text-gray-500 transition-all hover:text-gray-400"
      >
        忘記密碼
        <ChevronRight className="h-4 w-4" />
      </span>
    </div>
  )
}

export default ForgetPasswordButton
