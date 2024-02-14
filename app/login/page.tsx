'use client'

import { FormEvent, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import PrevButton from '@/components/PrevButton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'

const LoginPage = () => {
  const router = useRouter()
  const { handleLogin } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)
    await handleLogin({ email, password })
    setIsSubmitting(false)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton redirectUrl="/info" />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">登入</span>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <Input
                className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                placeholder="請輸入 Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                placeholder="請輸入密碼"
                type="password"
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              disabled={!email || !password}
              type="submit"
              variant="primary"
              className="rounded-full"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : '登入'}
            </Button>
          </form>

          <div className="flex w-full">
            <div
              className="m-auto flex cursor-pointer items-center text-gray-500 transition-all hover:text-gray-400"
              onClick={() => router.push('/register')}
            >
              新用戶註冊
              <ChevronRight />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
