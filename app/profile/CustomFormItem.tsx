'use client'

import { z } from 'zod'
import { ControllerRenderProps } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { FormControl, FormMessage } from '@/components/ui/form'
import { useAuthContext } from '@/context/AuthContext'
import { Skeleton } from '@/components/ui/skeleton'

export const formSchema = z.object({
  name: z.string().min(1, { message: '姓名為必填' }),
  id: z.string().min(1, { message: '身分證字號為必填' }),
  mobile: z.string().min(1, { message: '電話為必填' }).max(10, { message: '電話格式錯誤' }),
  email: z.string().email({ message: 'E-mail格式錯誤' }),
})

type FormKeys = keyof typeof formSchema.shape

type CustomFormItemProps<T extends FormKeys> = {
  label: string
  disabled?: boolean
  field: ControllerRenderProps<z.infer<typeof formSchema>, T>
}

export default function CustomFormItem<T extends FormKeys>({
  label,
  field,
  disabled,
}: CustomFormItemProps<T>) {
  const { isLoadingUser } = useAuthContext()
  return (
    <div className="flex min-h-12 items-center justify-between bg-white p-4 py-0 md:min-h-14">
      <span className="flex items-center gap-2">
        {label}
        <FormMessage />
      </span>
      <FormControl className="flex-1">
        {isLoadingUser ? (
          <div className="flex justify-end">
            <Skeleton className="h-6 w-36" />
          </div>
        ) : (
          <Input
            className="rounded-none border-none bg-white p-0 text-right outline-none md:text-base"
            disabled={disabled}
            {...field}
          />
        )}
      </FormControl>
    </div>
  )
}
