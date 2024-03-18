'use client'

import { HTMLInputTypeAttribute, PropsWithChildren, ReactNode } from 'react'
import { z } from 'zod'
import { ControllerRenderProps } from 'react-hook-form'
import { ExternalLink } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { FormControl, FormMessage } from '@/components/ui/form'
import { useAuthContext } from '@/context/AuthContext'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function ProfileFormItemLayout({
  children,
  label,
}: PropsWithChildren<{
  label: ReactNode
}>) {
  const { isLoadingUser } = useAuthContext()
  return (
    <div className="flex min-h-12 items-center justify-between bg-white p-4 py-0 md:min-h-14">
      <span className="flex items-center gap-2 text-gray-500">{label}</span>

      <div className="flex flex-col items-end gap-1">
        <FormControl className="max-w-48 flex-[1] md:max-w-60">
          {isLoadingUser ? (
            <div className="flex justify-end">
              <Skeleton className="h-6 w-36" />
            </div>
          ) : (
            children
          )}
        </FormControl>
        <FormMessage />
      </div>
    </div>
  )
}

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
  readOnly?: boolean
  field?: ControllerRenderProps<z.infer<typeof formSchema>, T>
  type?: HTMLInputTypeAttribute
  onClick?: () => void
}

export default function ProfileFormItem<T extends FormKeys>({
  label,
  field,
  disabled,
  readOnly,
  type = 'text',
  onClick,
}: ProfileFormItemProps<T>) {
  return (
    <ProfileFormItemLayout label={label}>
      <div
        onClick={onClick}
        className={cn('flex items-center gap-2', {
          'cursor-pointer': readOnly,
        })}
      >
        <Input
          className={cn('appearance-none bg-white text-right md:text-base', {
            'border-none p-0 outline-none': disabled || readOnly,
            'cursor-pointer text-gray-400': readOnly,
          })}
          disabled={disabled}
          readOnly={readOnly}
          type={type}
          {...field}
        />
        {type === 'password' && <ExternalLink className="cursor-pointer text-gray-400" />}
      </div>
    </ProfileFormItemLayout>
  )
}
