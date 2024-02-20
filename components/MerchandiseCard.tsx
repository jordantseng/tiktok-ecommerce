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
import { Skeleton } from '@/components/ui/skeleton'
import { CartItem } from '@/types/common'
import CartButton from './CartButton'

type Props = CartItem & {
  className?: string
  sales?: string
}

const MerchandiseSkeleton = () => (
  <Card className="h-full w-full">
    <CardHeader>
      <Skeleton className="h-20 w-full md:h-28" />
    </CardHeader>
    <CardContent>
      <CardTitle className="truncate pb-2">
        <Skeleton className="h-6 w-3/4" />
      </CardTitle>
    </CardContent>
    <CardFooter>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-12" />
      </div>
    </CardFooter>
  </Card>
)

const MerchandiseCard = ({
  id,
  className,
  imgUrl,
  title,
  tags = [],
  price,
  originPrice,
  sales,
}: Props) => {
  return (
    <Card className={className}>
      <CardHeader>
        {imgUrl && (
          <div className="relative aspect-square p-6">
            <Image className="object-cover" fill src={imgUrl} alt={`product-${id}`} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <CardTitle className="truncate pb-2">{title}</CardTitle>
        <CardDescription className="mt-4 truncate py-1">
          {tags.map((opt) => (
            <span key={opt} className="mr-2 rounded border border-primary p-1 text-xs text-primary">
              {opt}
            </span>
          ))}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <div className="mr-3 flex flex-col">
            <span className={price ? 'text-sm font-light line-through' : 'text-md font-bold'}>
              ${originPrice}
            </span>
            {price && <span className="text-md font-bold text-red-600">${price}</span>}
          </div>
        </div>
        {sales ? (
          <span className="text-sm font-light text-gray-400">已售 {sales}</span>
        ) : (
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
        )}
      </CardFooter>
    </Card>
  )
}

export { MerchandiseSkeleton }
export default MerchandiseCard
