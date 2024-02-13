'use client'

import { ChevronRight } from 'lucide-react'

import PrevButton from '@/components/PrevButton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Register = () => {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton redirectUrl="/info" />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">註冊</span>

          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
            className="flex flex-col gap-6"
          >
            <div>
              <Input
                className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                placeholder="請輸入用戶名稱"
              />
              <Input
                className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                placeholder="請輸入手機號碼"
              />
              <div className="relative flex items-center">
                <Input
                  className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                  placeholder="請輸入手機驗證碼"
                />
                <span className="absolute right-0 cursor-pointer bg-white text-gray-500 transition-all hover:text-primary">
                  獲取驗證碼
                </span>
              </div>
            </div>
            <Button type="submit" variant="primary" className="rounded-full">
              註冊
            </Button>
          </form>

          <div className="flex w-full">
            <div
              className="m-auto flex cursor-pointer items-center text-gray-500 transition-all hover:text-gray-400"
              onClick={() => router.push('/login')}
            >
              已註冊，去登入
              <ChevronRight />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Register
