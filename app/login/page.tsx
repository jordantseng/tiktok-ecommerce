'use client'

import { useState } from 'react'
import { ChevronRight, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import PrevButton from '@/components/PrevButton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/AuthContext'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { useCartContext } from '@/context/CartContext'

const formSchema = z.object({
  email: z.string().email({
    message: '請輸入正確的 Email 格式',
  }),
  password: z.string().min(8, {
    message: '密碼長度至少 8 個字元',
  }),
})

const LoginPage = () => {
  const { toast } = useToast()
  const router = useRouter()
  const { handleGetMyCart } = useCartContext()
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    handleLogin(values)
      .catch((error: string) => {
        toast({
          variant: 'destructive',
          description: error.toString(),
        })
      })
      .finally(() => {
        handleGetMyCart()
        setIsSubmitting(false)
      })
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton redirectUrl="/info" />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">登入</span>

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
                        placeholder="請輸入 Email"
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
          </Form>

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
