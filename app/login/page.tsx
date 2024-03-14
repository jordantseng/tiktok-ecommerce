'use client'

import { useState } from 'react'
import { ChevronRight, Eye, EyeOff, Loader2, XCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import PrevButton from '@/components/PrevButton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/AuthContext'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

function TiktokLoginButton() {
  function handleLoginTiktok() {}
  return (
    <Avatar
      onClick={handleLoginTiktok}
      className="h-12 w-12 cursor-pointer border-2 bg-black p-2 md:h-16 md:w-16"
    >
      <AvatarImage
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzRweCIgaGVpZ2h0PSIzOXB4IiB2aWV3Qm94PSIwIDAgMzQgMzkiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU3LjEgKDgzMDg4KSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5sb2dvPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0ibG9nbyIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE0LDE1LjU5ODYxMjkgTDE0LDE0LjExMzM3NjggQzEzLjQ0OTIxMzQsMTQuMDQwMzY4IDEyLjg5Mzc2MDEsMTQuMDAyNDg4NCAxMi4zMzc0ODI1LDE0IEM1LjUzNDU4MDMxLDE0IDAsMTkuMTgwNDQ3NyAwLDI1LjU0Njk5MTIgQzAsMjkuNDUyMzg1OSAyLjA4NTYwMjA4LDMyLjkwOTUwNjIgNS4yNjcxMjM3NCwzNSBDMy4xMzY4MjQ0MywzMi44Njc5NDU2IDEuOTUyNDg5MjYsMzAuMDU3NTg1IDEuOTU0MjAzNTUsMjcuMTM4NjI3IEMxLjk1NDIwMzU1LDIwLjg2Mjc4NSA3LjMzMTI5MjAyLDE1Ljc0NTEzMDYgMTQsMTUuNTk4NjEyOSIgaWQ9Iui3r+W+hCIgZmlsbD0iIzAwRjJFQSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTQuMzI3MDEyNCwzMiBDMTcuMjAyNTY0MiwzMiAxOS41NDgzODU5LDI5LjcyNjU2OTggMTkuNjU1MjE0OCwyNi44OTMzMzcgTDE5LjY2NDkyNjUsMS42MDEzMTYxNSBMMjQuMzE0MTkxNCwxLjYwMTMxNjE1IEMyNC4yMTQ5MzY3LDEuMDczMjM2NTkgMjQuMTY0Njk1NiwwLjUzNzIxMzEwMSAyNC4xNjQxMDEyLDAgTDE3LjgxNDQwMjUsMCBMMTcuODAzODA3OSwyNS4yOTI4OTgzIEMxNy42OTc4NjE5LDI4LjEyNTI1MzYgMTUuMzUxMTU3MywzMC4zOTc4MDY0IDEyLjQ3NjQ4ODQsMzAuMzk3ODA2NCBDMTEuNjEzNDI5NiwzMC4zOTgxNDU4IDEwLjc2MzMzMTQsMzAuMTg5MTE2OSAxMCwyOS43ODg4Njc2IEMxMC45OTk5NTQ0LDMxLjE3NTM0MjQgMTIuNjEwNTcwNCwzMS45OTgzNzggMTQuMzI3MDEyNCwzMiBNMzIuOTk5MTE3MSwxMC4xODYxMjU2IEwzMi45OTkxMTcxLDguNzgwNDc3MSBDMzEuMjkwNDg2Miw4Ljc4MjA1NTA5IDI5LjYxODUzMDMsOC4yODgwNDczMSAyOC4xODgyODQ1LDcuMzU5MDM0ODIgQzI5LjQ0MjIyNTUsOC43OTM4OTg0OSAzMS4xMzA1OTU4LDkuNzg1ODg4OTkgMzMsMTAuMTg2MTI1NiIgaWQ9IuW9oueKtiIgZmlsbD0iIzAwRjJFQSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjgsNy43MTc4NDMzNiBDMjYuNjAxNjQ2NSw2LjEzNDUwOTE2IDI1LjgzMTQyNTMsNC4xMDI4MDk3MyAyNS44MzIzNTQ3LDIgTDI0LjEzNTA1NTgsMiBDMjQuNTc5MTUzLDQuMzQ4NzIyMzMgMjUuOTc1ODQ5Nyw2LjQxNTAxMTYzIDI4LDcuNzE3ODQzMzYgTTEyLjMyNTMwODMsMjAuMDY1MjQ3MiBDOS4zODU2MzAyMiwyMC4wNjg2MDk0IDcuMDAzMzk3NjMsMjIuNDI2MDI0IDcsMjUuMzM1MDc2NiBDNy4wMDE5MDk2OCwyNy4yOTM4Njg4IDguMTAwODMyMDEsMjkuMDkwMjE0NCA5Ljg1Mzc4NzQzLDMwIEM5LjE5ODg5ODQsMjkuMTA2MjkxMyA4Ljg0NjIyMjQyLDI4LjAzMDYwOTEgOC44NDYxNTM4NSwyNi45MjY2NTkyIEM4Ljg0OTA2NjE2LDI0LjAxNzI2NjIgMTEuMjMxNDQwNiwyMS42NTkzMjEzIDE0LjE3MTQ2MjEsMjEuNjU1OTU4MiBDMTQuNzIwMTk5NiwyMS42NTU5NTgyIDE1LjI0NjAzNjQsMjEuNzQ1NzM1MyAxNS43NDI4MDY4LDIxLjkwMDAxMjUgTDE1Ljc0MjgwNjgsMTUuNDk5Njg4NyBDMTUuMjIyMjI1NSwxNS40MjY3MjIzIDE0LjY5NzIzMzQsMTUuMzg4ODY0NyAxNC4xNzE0NjIxLDE1LjM4NjM3NzggQzE0LjA3ODk3ODMsMTUuMzg2Mzc3OCAxMy45ODgyNTYsMTUuMzkxNjA3NSAxMy44OTY2NTMsMTUuMzkzMzUwOCBMMTMuODk2NjUzLDIwLjMwOTMwMTUgQzEzLjM4ODQ4OSwyMC4xNDkyMjk1IDEyLjg1ODU5MzUsMjAuMDY2OTI4NSAxMi4zMjUzMDgzLDIwLjA2NTI0NzIiIGlkPSLlvaLnirYiIGZpbGw9IiNGRjAwNEYiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTMyLjE1MzIwODQsMTEuMDAwODczNSBMMzIuMTUzMjA4NCwxNS44ODM4ODM0IEMyOC44NjgyNjIsMTUuODgzODgzNCAyNS44MjU1MDM0LDE0Ljg0MTc2NyAyMy4zNDAyMTY4LDEzLjA3Mjg3NyBMMjMuMzQwMjE2OCwyNS44NDEyMDUzIEMyMy4zNDAyMTY4LDMyLjIxNzk0NDUgMTguMTEwNzIzMSwzNy40MDU4MTQ5IDExLjY4MTczOTUsMzcuNDA1ODE0OSBDOS4xOTczMzM2NiwzNy40MDU4MTQ5IDYuODkzNDY3NzYsMzYuNjI4Mzc2OCA1LDM1LjMwOTM1MjcgQzcuMjAwNjk1NSwzNy42NjMzMDgxIDEwLjI5MTA4ODMsMzkuMDAwNzg2NiAxMy41Mjc2NTA0LDM5IEMxOS45NTY2MzQsMzkgMjUuMTg3MDA4NCwzMy44MTIxMjkyIDI1LjE4NzAwODQsMjcuNDM2MjYzNiBMMjUuMTg3MDA4NCwxNC42Njc5MzUzIEMyNy43NTQ0NDA3LDE2LjQ5OTExNjIgMzAuODM3NzA4MiwxNy40ODI1NjAzIDM0LDE3LjQ3ODk0MTcgTDM0LDExLjE5NDc5NjMgQzMzLjM2NTkwODUsMTEuMTk0Nzk2MyAzMi43NDk0MzA2LDExLjEyNjY2MTMgMzIuMTUzMjA4NCwxMSIgaWQ9Iui3r+W+hCIgZmlsbD0iI0ZGMDA0RiI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjMuOTc4NjU0NywyNS40MTkwNTY4IEwyMy45Nzg2NTQ3LDEyLjYzMjY5OTYgQzI2LjYwNjY3MzksMTQuNDY2NjgwNSAyOS43NjI5MDgyLDE1LjQ1MTUzNjEgMzMsMTUuNDQ3Njc1MiBMMzMsMTAuNTU3NzcwNSBDMzEuMDkxMzc4NywxMC4xNTgzNDIxIDI5LjM2NzcyNzQsOS4xNjkwNzM3NyAyOC4wODc3MDc2LDcuNzM4NDIxMiBDMjYuMDE1OTc1Nyw2LjQzMDkwMDczIDI0LjU4NjQ0NjksNC4zNTcxNzUxIDI0LjEzMTkxMDMsMiBMMTkuMzg0NTkzLDIgTDE5LjM3NDY3NjUsMjcuMjE0OTM3NyBDMTkuMjY1NTk0NiwzMC4wMzg2NjA4IDE2Ljg3MDI5OTgsMzIuMzA1MTYyMiAxMy45MzQxMDMsMzIuMzA1MTYyMiBDMTIuMTgxNDk3NiwzMi4zMDM0MDA3IDEwLjUzNjk3NzgsMzEuNDgyOTA1NCA5LjUxNTgzNDQ3LDMwLjEwMDc2ODcgQzcuNzIxMzIzMiwyOS4xODc5NDU3IDYuNTk2MTkyMTcsMjcuMzg1MDg4NCA2LjU5NDA2MTcxLDI1LjQxOTA1NjggQzYuNTk3NTM5MjEsMjIuNDk5NTM0OCA5LjAzNTc3MDgxLDIwLjEzMzYzNjIgMTIuMDQ0NTUxNywyMC4xMzAyNjE5IEMxMi42MDUyODY5LDIwLjEzMDI2MTkgMTMuMTQzNDg0NSwyMC4yMTk0ODczIDEzLjY1MjgzMzksMjAuMzc1MTk0NSBMMTMuNjUyODMzOSwxNS40NDE1NTE5IEM3LjIwMTY3NTA1LDE1LjU4ODUxMTQgMiwyMC43MjE1OTkyIDIsMjcuMDE2MzY3MyBDMiwzMC4wNjA1Mjk4IDMuMjE4ODMyNywzMi44MzE3NjczIDUuMjA0ODQ0ODUsMzQuOTAxNDQ3OSBDNy4yMDY5NTQzMywzNi4yNjkwNTY0IDkuNTk2MTAyNDEsMzcuMDAyMDkwOCAxMi4wNDQ1NTE3LDM3IEMxOC42MjU1MjcxLDM3IDIzLjk3ODY1NDcsMzEuODA0Nzk5OSAyMy45Nzg2NTQ3LDI1LjQxOTA1NjgiIGlkPSLot6/lvoQiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
        alt="@shadcn"
      />
      <AvatarFallback>
        <Skeleton className="h-12 w-12 md:h-20 md:w-20" />
      </AvatarFallback>
    </Avatar>
  )
}

const formSchema = z.object({
  email: z.string().email({
    message: '請輸入正確的 Email 格式',
  }),
  password: z.string().min(8, {
    message: '密碼長度至少 8 個字元',
  }),
})

const LoginPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const isReset = type === 'reset'

  const { handleLogin } = useAuthContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const email = form.watch('email')
  const password = form.watch('password')
  const errors = form.formState.errors

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    await handleLogin(values, isReset)
    setIsSubmitting(false)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton redirectUrl="/" />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">電子信箱登錄</span>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div>
                      <div className="relative flex">
                        <Input
                          className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                          placeholder="請輸入 Email"
                          {...field}
                        />
                        {email && (
                          <div
                            className="absolute bottom-0 right-0 top-0 flex cursor-pointer items-center"
                            onClick={() => form.setValue('email', '')}
                          >
                            <XCircle className="h-4 w-4 text-white md:h-6 md:w-6" fill="#cccccc" />
                          </div>
                        )}
                      </div>
                      {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div>
                      <div className="relative flex">
                        <Input
                          className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                          placeholder="請輸入密碼"
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                        {password && (
                          <div
                            className="absolute bottom-0 right-0 top-0 flex cursor-pointer items-center"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeOff
                                className="h-4 w-4 md:h-6 md:w-6"
                                fill="#cccccc"
                                stroke="#cccccc"
                              />
                            ) : (
                              <Eye
                                className="-mr-[2px] h-[20px] w-[20px] md:-mr-1 md:h-[32px] md:w-[32px]"
                                fill="#cccccc"
                                stroke="#ffffff"
                              />
                            )}
                          </div>
                        )}
                      </div>
                      {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
                    </div>
                  )}
                />
              </div>

              <div className="flex items-center">
                <span
                  onClick={() => router.push('forget-password')}
                  className="flex cursor-pointer items-center text-gray-500 transition-all hover:text-gray-400"
                >
                  忘記密碼
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>

              <Button
                disabled={!email || !password || isSubmitting}
                type="submit"
                variant="primary"
                className="rounded-full"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : '登錄'}
              </Button>
            </form>
          </Form>

          <div className="flex w-full">
            <div
              className="m-auto flex cursor-pointer items-center text-gray-500 transition-all hover:text-gray-400"
              onClick={() => router.push('/register')}
            >
              新用戶註冊
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-sm text-gray-500">其他登入方式</span>
          <TiktokLoginButton />
        </div>
      </div>
    </main>
  )
}

export default LoginPage
