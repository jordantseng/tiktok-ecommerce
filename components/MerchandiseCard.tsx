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
  imgUrl?: string
  title: string
  tags?: string[]
  prize: number
  specialPrize?: number
  unit: string
}

const MerchandiseCard = ({
  id,
  className,
  imgUrl,
  title,
  tags = [],
  prize,
  specialPrize,
  unit,
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
      <CardContent className="max-w-[150px]">
        <CardTitle className="truncate">{title}</CardTitle>
        <CardDescription className="mt-4">
          {tags.map((opt) => (
            <span key={opt} className="mr-2 rounded border border-primary p-1 text-xs text-primary">
              {opt}
            </span>
          ))}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between px-4">
        <div className="flex items-center">
          <div className="mr-3 flex flex-col">
            <span
              className={specialPrize ? 'text-sm font-light line-through' : 'text-md font-bold'}
            >
              ${prize}
            </span>
            {specialPrize && (
              <span className="text-md font-bold text-red-600">${specialPrize}</span>
            )}
          </div>
          <span className="font-light">/{unit}</span>
        </div>
        {sales ? (
          <span className="text-sm font-light text-gray-400">已售 {sales}</span>
        ) : (
          <CartButton />
        )}
      </CardFooter>
    </Card>
  )
}

export default MerchandiseCard
