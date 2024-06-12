'use client'

import { useState } from 'react'

import PrevButton from '@/components/PrevButton'
import ResetPasswordSuccess from '@/app/reset-password/ResetPasswordSuccess'
import ResetPasswordContent from '@/app/reset-password/ResetPasswordContent'

function ResetPasswordPage() {
  const [reseted, setReseted] = useState(false)

  function handleReseted() {
    setReseted(true)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        {reseted ? <ResetPasswordSuccess /> : <ResetPasswordContent callback={handleReseted} />}
      </div>
    </main>
  )
}

export default ResetPasswordPage
