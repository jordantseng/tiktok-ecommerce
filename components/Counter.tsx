import * as React from 'react'

import { Button } from '@/components/ui/button'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  buttonClassName?: string
  value: number
  onChange: (value: number) => void
  isLeftCounterDisabled: boolean
}

const Counter = ({ value, onChange, className, buttonClassName, isLeftCounterDisabled }: Props) => {
  return (
    <div className={cn('flex items-center', className)}>
      <Button
        className={buttonClassName}
        variant="ghost"
        size="icon"
        disabled={isLeftCounterDisabled}
        onClick={() => onChange(value - 1)}
      >
        <MinusCircleIcon />
      </Button>
      <span className="min-w-5 text-center md:min-w-6">{value}</span>
      <Button
        className={buttonClassName}
        variant="ghost"
        size="icon"
        onClick={() => onChange(value + 1)}
      >
        <PlusCircleIcon />
      </Button>
    </div>
  )
}

export default Counter
