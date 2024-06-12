'use client'

import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

function RegisterLink() {
  const router = useRouter()

  return (
    <div
      className="m-auto flex cursor-pointer items-center text-gray-500 transition-all hover:text-gray-400"
      onClick={() => router.push('/register')}
    >
      新用戶註冊
      <ChevronRight className="h-4 w-4" />
    </div>
  )
}

export default RegisterLink
