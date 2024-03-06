'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import PrevButton from '@/components/PrevButton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { useAuthContext } from '@/context/AuthContext'

const formSchema = z.object({
  email: z.string().email({
    message: '請輸入正確的 Email 格式',
  }),
})

const ForgetPasswordPage = () => {
  const { handleForgetPassword } = useAuthContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })
  const email = form.watch('email')
  const errors = form.formState.errors

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    await handleForgetPassword(values.email)
    setIsSubmitting(false)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">忘記密碼</span>

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
              </div>

              <Button
                disabled={!email || isSubmitting}
                type="submit"
                variant="primary"
                className="rounded-full"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : '重新設定密碼'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default ForgetPasswordPage
