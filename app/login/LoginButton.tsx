'use client'

import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

type EmailLoginFormProps = {
  disabled?: boolean
  isLoading?: boolean
}

function LoginButton({ disabled, isLoading }: EmailLoginFormProps) {
  return (
    <Button disabled={disabled} type="submit" variant="primary" className="rounded-full">
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : '登錄'}
    </Button>
  )
}
export default LoginButton
