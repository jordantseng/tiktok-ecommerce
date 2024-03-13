import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

import ProductCarousel from '@/app/product-detail/ProductCarousel'
import TitleCard from '@/app/product-detail/TitleCard'
import SpecCard from '@/app/product-detail/SpecCard'
import PrevButton from '@/components/PrevButton'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import SubmitButtons from '@/app/product-detail/SubmitButtons'
import { getProduct } from '@/services/product'
import { getProductItems } from '@/services/productItem'
import { getWebSettings } from '@/services/webSettings'
import { deliveryMap } from '@/lib/payment'

type ProductPageProps = {
  searchParams: {
    id: string
  }
}

const ProductDetailPage = async ({ searchParams }: ProductPageProps) => {
  const { id } = searchParams
  const { data: product } = await getProduct(Number(id))
  const { data: productItems } = await getProductItems({ productId: id })
  const { data: webSettings } = await getWebSettings()

  if (!product) {
    notFound()
  }

  const showDeliveryMethods = () => {
    return Object.values(deliveryMap).map((method, index) => {
      if (index + 1 === Object.values(deliveryMap).length) {
        return method
      }

      return `${method} / `
    })
  }

  const showPaymentMethods = () => {
    return Object.values(webSettings.paykind).map((method, index) => {
      if (index + 1 === Object.values(webSettings.paykind).length) {
        return method
      }

      return `${method} / `
    })
  }

  return (
    <main className="mb-14 min-h-screen bg-background">
      <header className="flex items-center justify-between gap-3 bg-white p-4">
        <PrevButton />
        <Link href="/shopping-cart">
          <ShoppingCartIcon className="text-gray-400" />
        </Link>
      </header>
      <ProductCarousel imgs={product.imgs} />
      <TitleCard
        title={product.title}
        price={String(product.marketprice)}
        salePrice={String(product.price)}
        tags={product.tags?.split(',') || []}
        stars={product.star}
        sales={String(product.buycount)}
        type={product.kindhead_title}
        subType={product.kindmain_title}
      />
      <Card className="m-2 border-none shadow-none">
        <CardContent className="flex flex-col gap-2 p-3">
          <h3 className="line-clamp-2 text-lg font-semibold tracking-wide">運送付款方式</h3>
          <div className="flex">
            <div className="flex items-start">
              <Image
                src="/truck.png"
                className="mr-1 mt-[2px] size-4"
                width={16}
                height={16}
                alt="truck"
              />
              <h4 className="text-sm text-gray-400">運送方式：</h4>
            </div>
            <h4 className="flex-1 text-sm text-gray-400">{showDeliveryMethods()}</h4>
          </div>
          <div className="flex">
            <div className="flex items-start">
              <Image
                src="/money.png"
                className="mr-1 mt-[2px] size-4"
                width={16}
                height={16}
                alt="money"
              />
              <h4 className="text-sm text-gray-400">付款方式：</h4>
            </div>
            <h4 className="flex-1 text-sm text-gray-400">{showPaymentMethods()}</h4>
          </div>
        </CardContent>
      </Card>
      {/* <Card className="m-2 border-none shadow-none">
        <div className="relative h-screen w-full">
          <Image
            src="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
            alt=""
            className="object-cover"
            fill
          />
        </div>
      </Card> */}
      <SubmitButtons product={product} specs={productItems.data} />
      {product.specs.length > 0 && (
        <SpecCard
          specs={product.specs.map(({ title, body }) => ({
            key: title,
            value: body,
          }))}
        />
      )}
      <Card className="m-2 border-none shadow-none">
        <CardTitle className="p-3 pb-0 text-sm font-semibold">商品詳情</CardTitle>
        <CardContent className="flex flex-col gap-2 p-3">
          <div dangerouslySetInnerHTML={{ __html: product.body }} />
        </CardContent>
      </Card>
      <div className="h-2 w-full bg-background" />
    </main>
  )
}

export default ProductDetailPage
