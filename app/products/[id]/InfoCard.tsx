import { PropsWithChildren } from 'react'

import { Card, CardContent } from '@/components/ui/card'

const InfoCard = ({ children }: PropsWithChildren) => {
  return (
    <Card className="m-2 border-none shadow-none">
      <CardContent className="flex flex-col gap-2 p-3">{children}</CardContent>
    </Card>
  )
}

export default InfoCard
