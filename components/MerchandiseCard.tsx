import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ShoppingCartIcon } from 'lucide-react'

type Props = {
  className?: string
  imgUrl?: string
  title: string
  tags?: string[]
  prize: number
  specialPrize?: number
  unit: string
  onAddtoCart: () => void
}

const MerchandiseCard = ({
  className,
  imgUrl,
  title,
  tags = [],
  prize,
  specialPrize,
  unit,
  onAddtoCart,
}: Props) => {
  return (
    <Card className={className}>
      <CardHeader>
        {imgUrl && (
          <img
            className="max-h-[100px] max-w-[200px] lg:max-h-[150px] lg:max-w-[250px]"
            src={imgUrl}
          />
        )}
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
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
              className={specialPrize ? 'text-sm font-light line-through' : 'text-lg font-bold'}
            >
              ${prize}
            </span>
            {specialPrize && (
              <span className="text-lg font-bold text-red-600">${specialPrize}</span>
            )}
          </div>
          <span className="font-light">/{unit}</span>
        </div>

        <Button className="rounded-full" variant="outline" size="icon">
          <ShoppingCartIcon className="h-4 w-4" onClick={onAddtoCart} />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default MerchandiseCard
