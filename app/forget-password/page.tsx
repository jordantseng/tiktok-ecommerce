'use client'

import PrevButton from '@/components/PrevButton'
import ForgetPasswordForm from '@/app/forget-password/ForgetPasswordForm'

const ForgetPasswordPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">忘記密碼</span>

          <ForgetPasswordForm />
        </div>
      </div>
    </main>
  )
}

export default ForgetPasswordPage
