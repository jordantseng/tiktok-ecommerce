'use client'

import CartItem from '@/components/CartItem'
import MerchandiseCard from '@/components/MerchandiseCard'
import React from 'react'
import { useImmer } from 'use-immer'

const ShoppingCartPage = () => {
  const [count, setCount] = useImmer([1, 1])
  return (
    <div className="flex flex-col items-center justify-center overflow-x-hidden">
      <CartItem
        amount={count[0]}
        editable={true}
        imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
        title="PS5 新春大禮包"
        prize={18888}
        specialPrize={13000}
        tags={['快速出貨', '24hr']}
        onSelect={(res) => console.log(res)}
        onChange={(val) =>
          setCount((draft) => {
            draft[0] = val
          })
        }
      />
      <CartItem
        amount={count[1]}
        editable={true}
        imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
        title="PS5 新春大禮包"
        prize={18888}
        specialPrize={13000}
        tags={['快速出貨', '24hr']}
        onSelect={(res) => console.log(res)}
        onChange={(val) =>
          setCount((draft) => {
            draft[1] = val
          })
        }
      />
      <div className="font-lg mb-2 flex items-center justify-center font-semibold">
        ✨推薦商品✨
      </div>
      <div className="flex w-full items-center justify-center gap-x-1.5 overflow-x-auto p-2">
        <MerchandiseCard
          imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
          title="PS5"
          tags={['game', 'tv']}
          prize={18800}
          specialPrize={13000}
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

      <CartItem
        imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
        tags={['第三方物流', '快速出貨']}
        title="PS5 新春大禮包"
        amount={2}
        prize={18888}
        unit="台"
      />
      <CartItem
        imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
        tags={['第三方物流', '快速出貨']}
        title="PS5 新春大禮包"
        amount={2}
        prize={18888}
        unit="台"
      />
      <CartItem
        imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
        tags={['第三方物流', '快速出貨']}
        title="PS5 新春大禮包"
        amount={2}
        prize={18888}
        unit="台"
      />
    </div>
  )
}

export default ShoppingCartPage
