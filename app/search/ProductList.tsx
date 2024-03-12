import Link from 'next/link'

import MerchandiseCard from '@/components/MerchandiseCard'
import { ProductData } from '@/services/product'
import ProductNotFound from '@/components/ProductNotFound'

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
    return <ProductNotFound />
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.data.map((product) => (
        <Link key={product.id} href={`/product-detail?id=${product.id}`}>
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
            stars={product.star}
          />
        </Link>
      ))}
    </div>
  )
}

export default ProductList
