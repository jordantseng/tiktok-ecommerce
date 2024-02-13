'use client'

import { ChevronRight } from 'lucide-react'

import PrevButton from '@/components/PrevButton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

function AvatarDemo() {
  return (
    <Avatar className="h-12 w-12 cursor-pointer transition-all hover:border md:h-20 md:w-20">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

const LoginPage = () => {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton redirectUrl="/info" />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">手機號碼登入</span>

          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
            className="flex flex-col gap-6"
          >
            <div>
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
              登入
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

        <div className="flex w-full flex-col items-center justify-center gap-2 pb-20 text-gray-500">
          <span>其他登入方式</span>
          <AvatarDemo />
        </div>
      </div>
    </main>
  )
}

export default LoginPage
