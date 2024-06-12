'use client'

import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

type ResetPasswordButtonProps = {
  disabled?: boolean
  isLoading?: boolean
}

function ResetPasswordButton({ disabled, isLoading }: ResetPasswordButtonProps) {
  return (
    <Button disabled={disabled} type="submit" variant="primary" className="rounded-full">
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : '重新設定密碼'}
    </Button>
  )
}

export default ResetPasswordButton
