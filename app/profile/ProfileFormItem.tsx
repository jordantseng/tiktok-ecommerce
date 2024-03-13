'use client'

import { HTMLInputTypeAttribute } from 'react'
import { z } from 'zod'
import { ControllerRenderProps } from 'react-hook-form'
import { ExternalLink } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { FormControl, FormMessage } from '@/components/ui/form'
import { useAuthContext } from '@/context/AuthContext'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export const formSchema = z.object({
  id: z.string(),
  mobile: z
    .string()
    .min(10, { message: '手機號碼至少 10 碼' })
    .max(10, { message: '手機號碼最多 10 碼' })
    .regex(/^\d+$/, { message: '手機號碼格式錯誤' }),
  email: z.string(),
  password: z.string(),
})

type FormKeys = keyof typeof formSchema.shape

type ProfileFormItemProps<T extends FormKeys> = {
  label: string
  disabled?: boolean
  field?: ControllerRenderProps<z.infer<typeof formSchema>, T>
  type?: HTMLInputTypeAttribute
}

export default function ProfileFormItem<T extends FormKeys>({
  label,
  field,
  disabled,
  type = 'text',
}: ProfileFormItemProps<T>) {
  const { isLoadingUser } = useAuthContext()
  return (
    <div className="flex min-h-12 items-center justify-between bg-white p-4 py-0 md:min-h-14">
      <span className="flex items-center gap-2">{label}</span>

      <div className="flex flex-col items-end gap-1 py-2">
        <FormControl className="max-w-48 flex-[1] md:max-w-60">
          {isLoadingUser ? (
            <div className="flex justify-end">
              <Skeleton className="h-6 w-36" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Input
                className={cn('appearance-none bg-white text-right md:text-base', {
                  'border-none p-0 outline-none': disabled,
                })}
                disabled={disabled}
                type={type}
                {...field}
              />
              {type === 'password' && <ExternalLink className="cursor-pointer text-gray-500" />}
            </div>
          )}
        </FormControl>
        <FormMessage />
      </div>
    </div>
  )
}
