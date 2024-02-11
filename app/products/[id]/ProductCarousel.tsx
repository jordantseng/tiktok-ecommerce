'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'

const ProductCarousel = () => {
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

  return (
    <Carousel setApi={setApi} className="relative w-full bg-white">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem className="flex h-full w-full items-center justify-center" key={index}>
            <div className="relative min-h-72 w-full min-w-72">
              <Image
                className="object-cover"
                src="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
                alt=""
                fill
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <Badge className="absolute bottom-3 right-4 rounded-3xl bg-gray-500 px-3 py-1">
        {current}/5
      </Badge>
    </Carousel>
  )
}

export default ProductCarousel
