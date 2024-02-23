import * as React from 'react'
import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CartItem } from '@/types/common'
import CartButton from '@/components/CartButton'

type Props = CartItem & {
  className?: string
}

const ProductItem = ({ id, className, imgUrl, title, tags = [], price, originPrice }: Props) => {
  return (
    <div className="flex w-auto flex-col border-b p-2">
      <div className={cn('flex items-center justify-center max-[320px]:block', className)}>
        <div className="relative mx-2 flex h-24 w-[35%] items-center max-[320px]:m-0 max-[320px]:w-full">
          <Image
            className="rounded-lg object-cover"
            fill
            src={imgUrl || ''}
            alt={`product-${id}`}
          />
        </div>
        <Card className={'w-[65%] border-0 shadow-none max-[320px]:w-full'}>
          <CardHeader className="flex p-0">
            <CardTitle className="break-normal text-base max-[320px]:text-sm">{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between px-0">
            <div>
              <CardDescription className="mt-2">
                <div className="flex flex-col">
                  <div className="break-normal pb-1">
                    {tags.map((opt) => (
                      <span
                        key={opt}
                        className="mr-2 rounded border border-primary p-0.5 text-xs text-primary"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              </CardDescription>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between px-2 pb-1">
            <div className="mr-3 flex space-x-2">
              {price && <span className="text-md font-bold text-red-600">${price}</span>}
              <span className={price ? 'text-sm font-light line-through' : 'text-md font-bold'}>
                ${originPrice}
              </span>
            </div>
            <CartButton
              item={{
                id,
                imgUrl,
                title,
                tags,
                price,
                originPrice,
              }}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ProductItem
