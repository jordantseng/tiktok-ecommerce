'use client'

import { ChevronRight } from 'lucide-react'
import { useAuthContext } from '@/context/AuthContext'

const LoginLink = () => {
  const { handleLogout } = useAuthContext()
  return (
    <div
      className="m-auto flex cursor-pointer items-center text-gray-500 transition-all hover:text-gray-400"
      onClick={handleLogout}
    >
      已註冊，去登錄
      <ChevronRight className="h-4 w-4" />
    </div>
  )
}

export default LoginLink
