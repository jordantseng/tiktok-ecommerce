'use client'

import MerchandiseCard from '@/components/MerchandiseCard'
import React from 'react'

const ShoppingCartPage = () => {
  return (
    <div className="flex gap-x-1.5">
      <MerchandiseCard
        imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
        title="PS5"
        tags={['game', 'tv']}
        prize={18800}
        unit="台"
        onAddtoCart={() => console.log('hi')}
      />
      <MerchandiseCard
        imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
        title="PS5"
        tags={['game', 'tv']}
        prize={18800}
        unit="台"
        onAddtoCart={() => console.log('hi')}
      />
      <MerchandiseCard
        imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
        title="PS5"
        tags={['game', 'tv']}
        prize={18800}
        unit="台"
        onAddtoCart={() => console.log('hi')}
      />
    </div>
  )
}

export default ShoppingCartPage
