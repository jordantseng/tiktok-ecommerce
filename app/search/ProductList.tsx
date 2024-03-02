import Link from 'next/link'
import Image from 'next/image'

import MerchandiseCard from '@/components/MerchandiseCard'
import { ProductData } from '@/services/product'

type ProductListProps = {
  products: {
    current_page: number
    data: ProductData[]
    total: number
    last_page: number
  }
}

const ProductList = ({ products }: ProductListProps) => {
  if (products.data.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center gap-4">
        <Image src="/not-found.svg" className="size-32" height={40} width={40} alt="" />
        <h5 className="text-gray-500">抱歉，没有找到商品哦</h5>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.data.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <MerchandiseCard
            id={product.id}
            key={product.id}
            className="w-full"
            imgUrl={product.imgs[0]}
            title={product.title}
            tags={product.tags?.split(',')}
            price={product.price}
            originPrice={product.marketprice}
            sales={String(product.buycount)}
          />
        </Link>
      ))}
    </div>
  )
}

export default ProductList
