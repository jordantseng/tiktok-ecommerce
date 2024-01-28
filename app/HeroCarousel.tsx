'use client'

import { useState, useEffect, useCallback } from 'react'
import Autoplay from 'embla-carousel-autoplay'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const scrollTo = useCallback((index: number) => api && api.scrollTo(index), [api])

  return (
    <Carousel
      className="relative h-auto w-full"
      setApi={setApi}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => scrollTo(index)}
            className={cn('h-2 w-2 rounded-full bg-gray-300', {
              'bg-secondary': index === current - 1,
            })}
          />
        ))}
      </div>
    </Carousel>
  )
}

export default HeroCarousel
