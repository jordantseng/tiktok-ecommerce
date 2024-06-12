'use client'

import { useState } from 'react'
import { Eye, EyeOff, XCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import ForgetPasswordButton from '@/app/login/ForgetPasswordButton'
import EmailLoginButton from '@/app/login/EmailLoginButton'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/context/AuthContext'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { emailSchema } from '@/lib/schema'

const formSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, {
    message: '密碼長度至少 8 個字元',
  }),
})

function EmailLoginForm() {
  const { handleLoginEmail } = useAuthContext()

  const searchParams = useSearchParams()
  const type = searchParams.get('type')

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
    await handleLoginEmail(values, type === 'reset')
    setIsSubmitting(false)
  }

  return (
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
                        <EyeOff className="h-4 w-4 md:h-6 md:w-6" fill="#cccccc" stroke="#cccccc" />
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
        <ForgetPasswordButton />
        <EmailLoginButton disabled={!email || !password || isSubmitting} isLoading={isSubmitting} />
      </form>
    </Form>
  )
}

export default EmailLoginForm
