import { StarIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

type TitleCardProps = {
  title: string
  price: string
  salePrice: string
  tags: string[]
  stars: number
  sales: string
  type: string
  subType: string
}

const TitleCard = ({
  title,
  price,
  salePrice,
  tags,
  stars = 0,
  sales,
  type,
  subType,
}: TitleCardProps) => {
  const renderStarIcons = () => {
    const starIcons = []
    for (let i = 0; i < stars; i++) {
      starIcons.push(<StarIcon fill="#eddb21" className="h-4 w-4" strokeWidth={0} />)
    }
    return starIcons
  }

  return (
    <Card className="m-2 border-none shadow-none">
      <CardContent className="flex flex-col gap-1 p-3">
        <div className="flex justify-between">
          <div className="flex items-end gap-2">
            <div className="flex text-xs leading-none text-red-600">
              <div className="flex items-end">
                <span>$</span>
                <div className="text-xl leading-none">{salePrice}</div>
              </div>
            </div>
            <p className="text-sm font-light leading-none text-gray-500 line-through">${price}</p>
          </div>
          <div className="flex gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-gray-400 bg-secondary p-1 text-xs text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="line-clamp-2 text-xl font-semibold tracking-wide">{title}</h3>
        <span className="text-xs font-light text-gray-400">
          {type} | {subType}
        </span>
        <div className="flex w-full items-center ">
          {renderStarIcons()}
          <span className="ml-1 flex break-keep text-xs font-light text-gray-400">
            已售 {sales}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default TitleCard
