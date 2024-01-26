import * as React from 'react'

import { Button } from '@/components/ui/button'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  buttonClassName?: string
  value: number
  onChange: (value: number) => void
}

const Counter = ({ value, onChange, className, buttonClassName }: Props) => {
  return (
    <div className={cn('flex', className)}>
      <Button
        className={buttonClassName}
        variant="ghost"
        size="icon"
        disabled={value === 1}
        onClick={() => onChange(value - 1)}
      >
        <MinusCircleIcon />
      </Button>
      <span className="mx-2">{value}</span>
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
