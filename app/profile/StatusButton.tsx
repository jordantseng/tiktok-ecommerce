import { Loader2 } from 'lucide-react'

import { useAuthContext } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MouseEvent } from 'react'

type StatusButtonProps = {
  title: string
  disabled?: boolean
  onClick?: (e: MouseEvent) => void
}

function StatusButton({ title, disabled, onClick }: StatusButtonProps) {
  const { isLoadingUser } = useAuthContext()
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        'h-full min-w-20 cursor-pointer rounded-lg border border-primary bg-primary-foreground p-2 font-bold text-primary',
        {
          'border-none bg-gray-100 text-gray-800': disabled,
        },
      )}
      disabled={isLoadingUser}
    >
      {isLoadingUser ? <Loader2 className="h-4 w-4 animate-spin" /> : title}
    </Button>
  )
}

export default StatusButton
