import * as React from 'react'
import Image from 'next/image'

import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Counter from '@/components/Counter'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import { CartItem } from '@/types/common'
import { Select } from './ui/select'
import { ChevronDown } from 'lucide-react'
import { Button } from './ui/button'

type Props = CartItem & {
  isChecked?: boolean
  editable?: boolean
  className?: string
  onChange?: (value: number) => void
  onSelect?: (value: boolean) => void
  onDelete?: (value: number) => void
  onChangeProductItem?: () => void
}

const CartItem = ({
  id,
  isChecked,
  editable,
  className,
  imgUrl,
  title,
  tags = [],
  amount,
  price,
  originPrice,
  productItemTitle,
  onSelect,
  onChange,
  onDelete,
  onChangeProductItem,
}: Props) => {
  return (
    <div className="flex w-auto flex-col border-b p-2">
      {/* {!editable && (
        <div className="ml-auto">
          {tags.map((opt) => (
            <span key={opt} className="mx-1 text-red-400">
              {opt}
            </span>
          ))}
        </div>
      )} */}
      <div className={cn('flex items-center justify-center', className)}>
        {editable && (
          <Checkbox
            className="h-6 w-6 rounded-full"
            checked={isChecked}
            onCheckedChange={onSelect}
          />
        )}
        <div
          className={cn('relative m-2 flex  w-full max-w-[130px] items-center', {
            'h-[80px] max-w-[80px] bg-slate-50': !editable,
            'h-[130px]': editable,
          })}
        >
          <Image
            className="rounded-lg object-cover"
            fill
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
          <CardHeader className={cn('px-0 pb-0', { 'flex-row justify-between pt-2': !editable })}>
            <div className="max-w-[150px] max-[320px]:max-w-[80px]">
              <CardTitle className="truncate text-base max-[320px]:text-sm">{title}</CardTitle>
              <div className="mt-2">
                <div className="flex flex-col">
                  <div className="truncate pb-1 max-[320px]:pl-2">
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
                        <span className="text-sm font-light"> 規格：{productItemTitle}</span>
                        <span className="text-sm font-light">數量：{amount}</span>
                      </span>
                    )}
                  </div>
                  {editable && (
                    <div className="mt-1 flex items-center justify-between bg-background">
                      <Button
                        className="h-8 truncate p-1 font-normal"
                        variant="ghost"
                        onClick={() => onChangeProductItem && onChangeProductItem()}
                      >
                        規格：{productItemTitle} <ChevronDown />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!editable && (
              <div className="text-lg font-bold" style={{ marginTop: 0 }}>
                ${(amount || 1) * (price || originPrice)}
              </div>
            )}
            {editable && (
              <div className="flex max-[350px]:flex-col">
                <div className="ml-2 flex w-full items-center space-x-2">
                  {price && (
                    <span className="max-[320px]:text-md text-lg font-bold text-red-600">
                      ${price}
                    </span>
                  )}
                  <span
                    className={
                      price
                        ? 'text-sm font-light line-through'
                        : 'max-[320px]:text-md flex h-full items-center text-lg font-bold'
                    }
                  >
                    ${originPrice}
                  </span>
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex w-full justify-end p-0">
            {editable && (
              <Counter
                buttonClassName="hover:bg-inherit max-[320px]:w-auto max-[320px]:h-auto"
                value={amount || 1}
                isLeftCounterDisabled={amount === 1}
                onChange={(val) => onChange && onChange(val)}
              />
            )}
          </CardContent>
        </Card>
        {editable && onDelete && <ConfirmDeleteDialog onConfirm={() => onDelete && onDelete(id)} />}
      </div>
    </div>
  )
}

export default CartItem
