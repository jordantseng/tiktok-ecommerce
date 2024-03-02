import PrevButton from '@/components/PrevButton'
import { ReactNode } from 'react'

type OrderHeaderInfoCardProps = {
  title: ReactNode
  description: ReactNode
}

function OrderHeaderInfoCard({ title, description }: OrderHeaderInfoCardProps) {
  return (
    <section className="relative bg-gradient-to-r from-primary-alt to-primary pb-20 text-white">
      <div className="grid place-items-center gap-10 p-4">
        <div className="relative flex w-full flex-col gap-4">
          <PrevButton />

          <div className="flex w-full items-center justify-center">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex flex-col gap-2">
                <span className="flex items-center justify-center gap-2 text-lg md:text-2xl">
                  {title}
                </span>
                <span className="text-xs md:text-base">{description}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderHeaderInfoCard
