'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { redirect } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { useAuthContext } from '@/context/AuthContext'
import { passwordSchema } from '@/lib/schema'
import ConfirmButton from '@/app/reset-password/ConfirmButton'

const formSchema = z
  .object({
    password: passwordSchema,
    passwordAgain: passwordSchema,
  })
  .refine((data) => data.password === data.passwordAgain, {
    message: '兩次密碼輸入不一致',
    path: ['passwordAgain'],
  })

function ResetPasswordContent({ callback }: { callback: () => void }) {
  const { token, handleChangePassword } = useAuthContext()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordAgain: '',
    },
  })

  if (!token) {
    redirect('/')
  }

  const password = form.watch('password')
  const passwordAgain = form.watch('passwordAgain')
  const errors = form.formState.errors

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    await handleChangePassword(values.password)
    setIsSubmitting(false)
    callback()
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl font-bold">重新設定密碼</span>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
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

            <FormField
              control={form.control}
              name="passwordAgain"
              render={({ field }) => (
                <div>
                  <div className="relative flex">
                    <Input
                      className="rounded-none border-b border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-6 outline-none"
                      placeholder="再輸入一次新密碼"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                    {passwordAgain && (
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
                  {errors.passwordAgain && (
                    <FormMessage>{errors.passwordAgain.message}</FormMessage>
                  )}
                </div>
              )}
            />
          </div>

          <ConfirmButton
            disabled={!passwordAgain || !password || isSubmitting}
            isLoading={isSubmitting}
          />
        </form>
      </Form>
    </div>
  )
}

export default ResetPasswordContent
