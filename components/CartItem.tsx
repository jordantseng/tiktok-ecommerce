import * as React from 'react'
import Image from 'next/image'

import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Counter from '@/components/Counter'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import { CartItem } from '@/types/common'

type Props = CartItem & {
  isChecked?: boolean
  editable?: boolean
  className?: string
  onChange?: (value: number) => void
  onSelect?: (value: boolean) => void
}

const CartItem = ({
  id,
  isChecked,
  editable,
  className,
  imgUrl,
  title,
  tags = [],
  unit,
  amount,
  price,
  specialPrice,
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
        {editable && (
          <Checkbox className="rounded-full" checked={isChecked} onCheckedChange={onSelect} />
        )}
        <div
          className={cn('m-2 flex h-auto items-center max-[320px]:m-0 max-[320px]:h-[80px]', {
            'bg-slate-50': !editable,
          })}
        >
          <Image
            className="max-h-[200px] max-w-[85px] max-[320px]:max-w-[65px]"
            width={300}
            height={300}
            src={imgUrl || ''}
            alt={`product-${id}`}
          />
        </div>

        <Card
          className={cn('border-0 shadow-none lg:w-full', {
            'w-1/2': editable,
            'w-56': !editable,
          })}
        >
          <CardHeader className={cn('px-0', { 'flex-row': !editable })}>
            <div className="max-w-[150px] max-[320px]:max-w-[80px]">
              <CardTitle className="truncate text-base max-[320px]:text-sm">{title}</CardTitle>
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
              <div className="ml-auto text-lg font-bold md:ml-2" style={{ marginTop: 0 }}>
                ${(amount || 1) * (specialPrice || price)}
              </div>
            )}
          </CardHeader>
          <CardContent className="flex justify-between px-0">
            {editable && (
              <div className="flex">
                <div className="mr-4 flex flex-col">
                  <span
                    className={
                      specialPrice
                        ? 'text-sm font-light line-through'
                        : 'max-[320px]:text-md text-lg font-bold'
                    }
                  >
                    ${price}
                  </span>
                  {specialPrice && (
                    <span className="max-[320px]:text-md text-lg font-bold text-red-600">
                      ${specialPrice}
                    </span>
                  )}
                </div>
                <Counter
                  className={cn({ 'items-end': specialPrice !== undefined })}
                  buttonClassName={cn('hover:bg-inherit max-[320px]:w-auto max-[320px]:h-auto', {
                    'items-end': specialPrice !== undefined,
                    'items-start': specialPrice === undefined,
                  })}
                  value={amount || 1}
                  isLeftCounterDisabled={amount === 1}
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
