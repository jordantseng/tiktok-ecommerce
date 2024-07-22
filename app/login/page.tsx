'use client'

import Link from 'next/link'

import TiktokLoginButton from '@/app/login/TiktokLoginButton'
import LineLoginButton from '@/app/login/LineLoginButton'
import EmailLoginForm from '@/app/login/EmailLoginForm'
import RegisterLink from '@/app/login/RegisterLink'
import PrevButton from '@/components/PrevButton'
import { useWebSettingsContext } from '@/context/WebSettingsContext'

const LoginPage = () => {
  const { webSettingsData } = useWebSettingsContext()
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton redirectUrl="/" />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">電子信箱登錄</span>
          <EmailLoginForm />

          <div className="flex items-center">
            <RegisterLink />
          </div>
        </div>

        <div className="mb-28 flex w-full flex-col items-center gap-2">
          <span className="text-sm text-gray-500">其他登錄方式</span>
          <span className="flex gap-2">
            {webSettingsData?.api_token && <TiktokLoginButton />}
            {webSettingsData?.liffid && <LineLoginButton />}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-center space-x-2">
          <Link href={`/privacy`}>
            <div className="pointer text-sm font-light">隱私權政策</div>
          </Link>
          <Link href={`/tos`}>
            <div className="pointer text-sm font-light">服務條款</div>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
