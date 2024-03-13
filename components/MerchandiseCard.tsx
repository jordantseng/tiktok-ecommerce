import * as React from 'react'
import Image from 'next/image'
import { StarIcon } from 'lucide-react'
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
import CartButton from '@/components/CartButton'

type Props = CartItem & {
  className?: string
  sales?: string
  stars?: number
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
  stars,
}: Props) => {
  const starIcons = []
  for (let i = 0; i < (stars || 0); i++) {
    starIcons.push(<StarIcon fill="#eddb21" className="h-4 w-4" strokeWidth={0} />)
  }

  return (
    <Card className={className}>
      <CardHeader className="p-0 pb-2">
        {imgUrl && (
          <div className="relative aspect-square">
            <Image className="rounded-t-lg object-cover" fill src={imgUrl} alt={`product-${id}`} />
          </div>
        )}
      </CardHeader>
      <CardContent className="px-2">
        <CardTitle className="text-md line-clamp-2">{title}</CardTitle>
        <CardDescription className="mt-4 truncate py-1">
          {tags.length > 0 ? (
            tags.map((opt) => (
              <span
                key={opt}
                className="mr-2 rounded border border-primary p-1 text-xs text-primary"
              >
                {opt}
              </span>
            ))
          ) : (
            <span className="inline-block h-full text-transparent">{'\u00A0'}</span>
          )}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between px-2">
        {sales ? (
          <div className="flex flex-col items-center">
            <div className="ml-2 flex w-full space-x-2">
              {price && <span className="text-md font-bold text-red-600">${price}</span>}
              <span
                className={
                  price ? 'flex items-center text-xs font-light line-through' : 'text-md font-bold'
                }
              >
                ${originPrice}
              </span>
            </div>
            <div className="mt-1 flex w-full items-center ">
              {starIcons}
              <span className="ml-1 flex break-keep text-xs font-light text-gray-400">
                已售 {sales}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center">
              <div className="ml-2 flex w-full space-x-2">
                {price && <span className="text-md font-bold text-red-600">${price}</span>}
                <span
                  className={
                    price
                      ? 'flex items-center text-sm font-light line-through'
                      : 'text-md flex items-center font-bold'
                  }
                >
                  ${originPrice}
                </span>
              </div>
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
          </>
        )}
      </CardFooter>
    </Card>
  )
}

export { MerchandiseSkeleton }
export default MerchandiseCard
