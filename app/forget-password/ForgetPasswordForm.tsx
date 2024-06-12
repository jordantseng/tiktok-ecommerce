'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { useAuthContext } from '@/context/AuthContext'
import { emailSchema } from '@/lib/schema'
import ResetPasswordButton from '@/app/forget-password/ResetPasswordButton'

const formSchema = z.object({
  email: emailSchema,
})

function ForgetPasswordForm() {
  const { handleForgetPassword } = useAuthContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const email = form.watch('email')
  const errors = form.formState.errors

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    await handleForgetPassword(values.email)
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

        <ResetPasswordButton disabled={!email || isSubmitting} isLoading={isSubmitting} />
      </form>
    </Form>
  )
}

export default ForgetPasswordForm
