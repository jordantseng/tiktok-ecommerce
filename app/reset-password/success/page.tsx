'use client'

import { CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import PrevButton from '@/components/PrevButton'
import { Button } from '@/components/ui/button'

const ResetPasswordSuccess = () => {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="m-auto flex w-full flex-col gap-4">
          <span className="text-center text-2xl font-extrabold">已更新密碼</span>

          <CheckCircle2 className="m-auto h-52 w-52 text-white" fill="#67b82b" />

          <Button
            type="submit"
            variant="primary"
            className="rounded-full p-6 text-lg"
            onClick={() => router.push('/login')}
          >
            重新登錄
          </Button>
        </div>
      </div>
    </main>
  )
}

export default ResetPasswordSuccess
