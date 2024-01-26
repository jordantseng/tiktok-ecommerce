import * as React from 'react'

import { Button } from '@/components/ui/button'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  clasName?: string
  buttonClassName?: string
  value: number
  onChange: (value: number) => void
}

const Counter = ({ value: propsValue, onChange, clasName, buttonClassName }: Props) => {
  const [value, setValue] = React.useState(propsValue)

  return (
    <div className={cn('flex', clasName)}>
      <Button
        className={buttonClassName}
        variant="ghost"
        size="icon"
        disabled={value === 1}
        onClick={() => {
          setValue(value - 1)
          onChange(value - 1)
        }}
      >
        <MinusCircleIcon />
      </Button>
      <span className="mx-2">{value}</span>
      <Button
        className={buttonClassName}
        variant="ghost"
        size="icon"
        onClick={() => {
          setValue(value + 1)
          onChange(value + 1)
        }}
      >
        <PlusCircleIcon />
      </Button>
    </div>
  )
}

export default Counter
