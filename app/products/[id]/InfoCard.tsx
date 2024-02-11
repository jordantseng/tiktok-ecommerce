import { Card, CardContent } from '@/components/ui/card'

type InfoCardProps = {
  delivery: string
  service: string
  discount: string
}

const InfoCard = ({ delivery, service, discount }: InfoCardProps) => {
  return (
    <Card className="m-2 border-none shadow-none">
      <CardContent className="flex flex-col gap-2 p-3">
        <div className="flex gap-2 text-sm">
          <h3 className="min-w-fit text-gray-400">配送</h3>
          <h3 className="truncate">{delivery}</h3>
        </div>
        <div className="flex gap-2 text-sm">
          <h3 className="min-w-fit text-sm text-gray-400">服務</h3>
          <h3 className="truncate">{service}</h3>
        </div>
        <div className="flex gap-2 text-sm">
          <h3 className="min-w-fit text-sm text-gray-400">優惠</h3>
          <h3 className="truncate">{discount}</h3>
        </div>
      </CardContent>
    </Card>
  )
}

export default InfoCard
