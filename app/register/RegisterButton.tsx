'use client'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type EmailLoginFormProps = {
  disabled?: boolean
  isLoading?: boolean
}

function RegisterButton({ disabled, isLoading }: EmailLoginFormProps) {
  return (
    <Button disabled={disabled} type="submit" variant="primary" className="rounded-full">
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : '註冊'}
    </Button>
  )
}

export default RegisterButton
