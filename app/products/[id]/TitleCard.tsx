import { Card, CardContent } from '@/components/ui/card'

type TitleCardProps = {
  title: string
  price: string
  salePrice: string
  unit: string
  tags: string[]
}

const TitleCard = ({ title, price, salePrice, unit, tags }: TitleCardProps) => {
  return (
    <Card className="m-2 border-none shadow-none">
      <CardContent className="flex flex-col gap-2 p-3">
        <div className="flex justify-between">
          <div className="flex items-end gap-2">
            <div className="flex text-xs leading-none text-red-600">
              <div className="flex items-end">
                <span>$</span>
                <div className="text-xl leading-none">{salePrice}</div>
                <div>/{unit}</div>
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
        <h3 className="line-clamp-2 h-14 text-xl font-semibold tracking-wide">{title}</h3>
      </CardContent>
    </Card>
  )
}

export default TitleCard
