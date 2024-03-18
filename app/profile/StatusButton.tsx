import { Loader2 } from 'lucide-react'

import { useAuthContext } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function StatusButton({ title, disabled }: { title: string; disabled?: boolean }) {
  const { isLoadingUser } = useAuthContext()
  return (
    <Button
      onClick={(e) => e.preventDefault()}
      variant="ghost"
      className={cn(
        'h-full min-w-20 cursor-default rounded-lg border border-primary bg-primary-foreground p-2 font-bold text-primary',
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
