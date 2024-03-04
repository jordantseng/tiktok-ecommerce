'use client'

import { useRouter } from 'next/navigation'
import { ChevronRightIcon } from 'lucide-react'

import { useAuthContext } from '@/context/AuthContext'

const ResetPasswordTab = () => {
  const router = useRouter()
  const { isLogin } = useAuthContext()

  if (!isLogin) {
    return null
  }

  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-4"
      onClick={() => router.push('/reset-password')}
    >
      <span className="font-semibold">重新設定密碼</span>
      <ChevronRightIcon />
    </div>
  )
}

export default ResetPasswordTab
