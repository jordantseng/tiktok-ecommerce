'use client'

import PrevButton from '@/components/PrevButton'
import EmailRegisterForm from '@/app/register/EmailRegisterForm'
import LoginLink from '@/app/register/LoginLink'

const RegisterPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">註冊</span>

          <EmailRegisterForm />

          <div className="flex w-full">
            <LoginLink />
          </div>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
