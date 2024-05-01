'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type HeroCarouselProps = {
  items: { id: number; img: string; title: string; url: string; target: string }[]
}

const HeroCarousel = ({ items }: HeroCarouselProps) => {
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
        {items.map((item) => (
          <CarouselItem key={item.id}>
            {item.target === '_blank' ? (
              <a target="_blank" href={item.url}>
                <Card>
                  <CardContent className="relative flex aspect-video items-center justify-center p-6">
                    <Image className="rounded-lg" alt={item.title} src={item.img} fill />
                  </CardContent>
                </Card>
              </a>
            ) : (
              <Link href={item.url}>
                <Card>
                  <CardContent className="relative flex aspect-video items-center justify-center p-6">
                    <Image className="rounded-lg" alt={item.title} src={item.img} fill />
                  </CardContent>
                </Card>
              </Link>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {items.map((_, index) => (
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
