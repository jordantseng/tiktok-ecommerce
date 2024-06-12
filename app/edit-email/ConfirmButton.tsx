'use client'

import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ConfirmButtonProps = {
  disabled?: boolean
  isLoading?: boolean
  couldEditPassword?: boolean
}

function ConfirmButton({ disabled, isLoading, couldEditPassword }: ConfirmButtonProps) {
  return (
    <Button
      disabled={disabled}
      type="submit"
      className={cn('rounded-xl', { hidden: !couldEditPassword })}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : '確認'}
    </Button>
  )
}

export default ConfirmButton
