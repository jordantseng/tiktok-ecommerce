'use client'

import { MouseEvent, useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/AuthContext'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { emailSchema, passwordSchema } from '@/lib/schema'
import RegisterButton from '@/app/register/RegisterButton'

const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  verificationCode: z.string().min(6, '驗證碼長度至少 6 個字元'),
})

function EmailRegisterForm() {
  const { handleRegister, handleGetEmailCode } = useAuthContext()

  const countdownInterval = useRef<NodeJS.Timeout | null>(null)

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

  useEffect(() => {
    return () => {
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current)
      }
    }
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    await handleRegister({
      ...values,
      code: verificationCode,
    })
    setIsSubmitting(false)
  }

  const handleCountDown = () => {
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current)
    }

    const ONE_MINUTE = 60
    setCountdown(ONE_MINUTE)

    countdownInterval.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(countdownInterval.current!)
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
        <RegisterButton
          disabled={!email || !password || !verificationCode || isSubmitting}
          isLoading={isSubmitting}
        />
      </form>
    </Form>
  )
}

export default EmailRegisterForm
