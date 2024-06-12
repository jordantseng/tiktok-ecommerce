'use client'

import { CheckCircle2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/AuthContext'

function ResetPasswordSuccess() {
  const { handleLogout } = useAuthContext()
  return (
    <div className="m-auto flex w-full flex-col gap-4">
      <span className="text-center text-2xl font-extrabold">已更新密碼</span>

      <CheckCircle2 className="m-auto h-52 w-52 text-white" fill="#67b82b" />

      <Button
        type="submit"
        variant="primary"
        className="rounded-full p-6 text-lg"
        onClick={handleLogout}
      >
        重新登錄
      </Button>
    </div>
  )
}

export default ResetPasswordSuccess
