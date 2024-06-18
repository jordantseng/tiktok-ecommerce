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
import { StarIcon } from 'lucide-react'

type Props = CartItem & {
  className?: string
}

const ProductItem = ({
  id,
  className,
  imgUrl,
  title,
  tags = [],
  price,
  originPrice,
  stars = 0,
  sales,
}: Props) => {
  const renderStarIcons = () => {
    const starIcons = []
    for (let i = 0; i < stars; i++) {
      starIcons.push(<StarIcon fill="#eddb21" className="h-4 w-4" strokeWidth={0} />)
    }
    return starIcons
  }

  return (
    <div className="flex w-auto flex-col border-b p-2">
      <div className={cn('flex items-center justify-center max-[320px]:block', className)}>
        <div className="relative mx-2 flex aspect-square h-28 items-center max-[320px]:m-0 max-[320px]:mb-2 max-[320px]:h-full max-[320px]:w-full">
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
          <CardContent className="flex justify-between px-0 pb-0">
            <div className="flex flex-col break-normal">
              <div className="mt-2 flex flex-col gap-2">
                <div>
                  {tags.map((opt) => (
                    <span
                      key={opt}
                      className="mr-2 rounded border border-primary p-0.5 text-xs text-primary"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
                <div className="flex w-full items-center">
                  {renderStarIcons()}
                  <span className="flex break-keep text-xs font-light text-gray-400">
                    已售 {sales}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pb-1 pl-0 pr-1">
            <div className="mr-3 flex space-x-2">
              {price && <span className="text-md font-bold text-red-600">${price}</span>}
              <span
                className={
                  price
                    ? 'flex items-center text-sm  font-light line-through'
                    : 'text-md flex items-center  font-bold'
                }
              >
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
