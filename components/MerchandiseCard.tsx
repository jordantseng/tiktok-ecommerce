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
import CartButton from './CartButton'
import { CartItem } from '@/types/common'

type Props = CartItem & {
  className?: string
  sales?: string
}

const MerchandiseCard = ({
  id,
  className,
  imgUrl,
  title,
  tags = [],
  price,
  specialPrice,
  sales,
}: Props) => {
  return (
    <Card className={className}>
      <CardHeader>
        {imgUrl && (
          <Image
            width={300}
            height={300}
            className="lg:max-h-[200px] lg:max-w-[250px]"
            src={imgUrl}
            alt={`product-${id}`}
          />
        )}
      </CardHeader>
      <CardContent>
        <CardTitle className="truncate">{title}</CardTitle>
        <CardDescription className="mt-4">
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
            <span
              className={specialPrice ? 'text-sm font-light line-through' : 'text-md font-bold'}
            >
              ${price}
            </span>
            {specialPrice && (
              <span className="text-md font-bold text-red-600">${specialPrice}</span>
            )}
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
              specialPrice,
            }}
          />
        )}
      </CardFooter>
    </Card>
  )
}

export default MerchandiseCard
