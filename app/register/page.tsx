'use client'

import { MouseEvent, useState } from 'react'
import { ChevronRight, Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import PrevButton from '@/components/PrevButton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/AuthContext'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  email: z.string().email({
    message: '請輸入正確的 Email 格式',
  }),
  password: z.string().min(8, {
    message: '密碼長度至少 8 個字元',
  }),
  verificationCode: z.string().min(6, {
    message: '驗證碼長度至少 6 個字元',
  }),
})

let countdownInterval: NodeJS.Timeout

const RegisterPage = () => {
  const { toast } = useToast()
  const { handleRegister, handleLogout, handleGetEmailCode } = useAuthContext()

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const email = form.watch('email')
  const password = form.watch('password')
  const verificationCode = form.watch('verificationCode')
  const errors = form.formState.errors

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    handleRegister(values)
      .catch((error: string) => {
        toast({
          variant: 'destructive',
          description: error.toString(),
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleCountDown = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval)
    }

    const ONE_MINUTE = 60
    setCountdown(ONE_MINUTE)

    countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(countdownInterval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleGetVerificationCode = async (e: MouseEvent) => {
    e.preventDefault()
    await handleGetEmailCode(email)
    handleCountDown()
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">註冊</span>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <Input
                        className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                        placeholder="請輸入正確 Email"
                        {...field}
                      />
                      {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <>
                      <Input
                        className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                        placeholder="請輸入密碼"
                        type="password"
                        {...field}
                      />
                      {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="verificationCode"
                  render={({ field }) => (
                    <div className="relative flex items-center">
                      <div className="flex flex-1 flex-col">
                        <Input
                          className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                          placeholder="請輸入 Email 驗證碼"
                          {...field}
                        />
                        {countdown > 0 ? (
                          <span className="absolute right-4 text-gray-500">{countdown} 秒</span>
                        ) : (
                          <Button
                            disabled={!email || isSubmitting || Boolean(errors.email?.message)}
                            onClick={handleGetVerificationCode}
                            className="absolute right-0 top-1 cursor-pointer bg-transparent font-normal text-gray-500 hover:text-gray-400"
                          >
                            獲取驗證碼
                          </Button>
                        )}
                        {errors.verificationCode && (
                          <FormMessage>{errors.verificationCode.message}</FormMessage>
                        )}
                      </div>
                    </div>
                  )}
                />
              </div>
              <Button
                disabled={!email || !password || !verificationCode || isSubmitting}
                type="submit"
                variant="primary"
                className="rounded-full"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : '註冊'}
              </Button>
            </form>
          </Form>

          <div className="flex w-full">
            <div
              className="m-auto flex cursor-pointer items-center text-gray-500 transition-all hover:text-gray-400"
              onClick={handleLogout}
            >
              已註冊，去登錄
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
