'use client'

import { useState } from 'react'
import { ChevronRight, Eye, EyeOff, Loader2, XCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import TiktokLoginButton from '@/app/login/TiktokLoginButton'
import PrevButton from '@/components/PrevButton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/AuthContext'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { emailSchema } from '@/lib/schema'

const formSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, {
    message: '密碼長度至少 8 個字元',
  }),
})

const LoginPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const isReset = type === 'reset'

  const { handleLoginEmail } = useAuthContext()

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
    await handleLoginEmail(values, isReset)
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

        <div className="mb-28 flex w-full flex-col items-center gap-2">
          <span className="text-sm text-gray-500">其他登錄方式</span>
          <TiktokLoginButton />
        </div>
      </div>
    </main>
  )
}

export default LoginPage
