import * as React from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MinusCircleIcon, PlusCircleIcon, ShoppingCartIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Counter from './Counter'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'

type Props = {
  editable?: boolean
  className?: string
  imgUrl?: string
  title: string
  tags?: string[]
  unit?: string
  amount: number
  prize: number
  specialPrize?: number
  onChange?: (value: number) => void
  onSelect?: (value: boolean) => void
}

const CartItem = ({
  editable,
  className,
  imgUrl,
  title,
  tags = [],
  unit,
  amount,
  prize,
  specialPrize,
  onSelect,
  onChange,
}: Props) => {
  return (
    <div className="flex w-auto flex-col p-2">
      {!editable && (
        <div className="ml-auto">
          {tags.map((opt) => (
            <span key={opt} className="mx-1 text-red-400">
              {opt}
            </span>
          ))}
        </div>
      )}
      <div className={cn('flex items-center justify-center', className)}>
        {editable && <Checkbox className="rounded-full" onCheckedChange={onSelect} />}
        <div
          className={cn('m-2 flex h-[80px] items-center lg:h-auto', { 'bg-slate-50': !editable })}
        >
          <img className="max-w-[100px] lg:max-h-[200px] lg:max-w-[250px]" src={imgUrl} />
        </div>

        <Card className="w-44 border-0 shadow-none lg:w-60 lg:w-auto">
          <CardHeader className={cn('px-0', { 'flex-row': !editable })}>
            <div>
              <CardTitle className="flex items-center text-base">{title}</CardTitle>
              <CardDescription className="mt-2">
                {editable ? (
                  tags.map((opt) => (
                    <span
                      key={opt}
                      className="mr-2 rounded border border-primary p-0.5 text-xs text-primary"
                    >
                      {opt}
                    </span>
                  ))
                ) : (
                  <span className="flex flex-col">
                    <span className="text-sm font-light">規格：{unit}</span>
                    <span className="text-sm font-light">數量：{amount}</span>
                  </span>
                )}
              </CardDescription>
            </div>
            {!editable && (
              <div className="ml-auto text-lg font-bold" style={{ marginTop: 0 }}>
                ${amount * prize}
              </div>
            )}
          </CardHeader>
          <CardContent className="flex justify-between px-0">
            {editable && (
              <div className="flex">
                <div className="mr-4 flex flex-col">
                  <span
                    className={
                      specialPrize ? 'text-sm font-light line-through' : 'text-lg font-bold'
                    }
                  >
                    ${prize}
                  </span>
                  {specialPrize && (
                    <span className="text-lg font-bold text-red-600">${specialPrize}</span>
                  )}
                </div>
                <Counter
                  clasName="items-end"
                  buttonClassName="items-end hover:bg-inherit"
                  value={amount}
                  onChange={(val) => onChange && onChange(val)}
                />
              </div>
            )}
          </CardContent>
        </Card>
        {editable && <ConfirmDeleteDialog onConfirm={() => {}} />}
      </div>
    </div>
  )
}

export default CartItem
