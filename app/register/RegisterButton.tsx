'use client'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type EmailLoginFormProps = {
  disabled?: boolean
  isLoading?: boolean
  label: string
}

function RegisterButton({ disabled, isLoading, label }: EmailLoginFormProps) {
  return (
    <Button disabled={disabled} type="submit" variant="primary" className="rounded-full">
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : label}
    </Button>
  )
}

export default RegisterButton
