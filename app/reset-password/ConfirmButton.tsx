'use client'

import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

type ConfirmButtonProps = {
  disabled?: boolean
  isLoading?: boolean
}

function ConfirmButton({ disabled, isLoading }: ConfirmButtonProps) {
  return (
    <Button disabled={disabled} type="submit" variant="primary" className="rounded-full">
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : '確定'}
    </Button>
  )
}

export default ConfirmButton
