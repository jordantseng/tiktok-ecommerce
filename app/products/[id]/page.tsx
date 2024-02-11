import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import PrevButton from '@/components/PrevButton'
import ProductCarousel from '@/app/products/[id]/ProductCarousel'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import NavBar from '@/components/NavBar'

const ProductPage = () => (
  <main className="mb-16 min-h-screen bg-default">
    <header className="flex items-center justify-between gap-3 bg-white p-4">
      <PrevButton />
      <Link href="/shopping-cart">
        <ShoppingCartIcon className="text-gray-400" />
      </Link>
    </header>
    <ProductCarousel />
    <Card className="m-2 border-none shadow-none">
      <CardContent className="flex flex-col gap-2 p-3">
        <div className="flex justify-between">
          <div className="flex items-end gap-2">
            <div className="flex text-xs leading-none text-red-600">
              <div className="flex items-end">
                <span>$</span>
                <div className="text-xl leading-none">39.8</div>
                <div>/份</div>
              </div>
            </div>
            <p className="text-sm font-light leading-none text-gray-500 line-through">$54.5</p>
          </div>
          <div className="flex gap-2">
            {['入口即化', '好吃不膩'].map((tag) => (
              <span
                key={tag}
                className="rounded border border-gray-400 bg-secondary p-1 text-xs text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="line-clamp-2 h-14 text-xl font-semibold tracking-wide">
          台灣中國可吸葡萄香蕉芭樂檸檬台灣中國可吸葡萄香蕉芭樂檸檬台灣中國可吸葡萄香蕉芭樂檸檬台灣中國可吸葡萄香蕉芭樂檸檬台灣中國可吸葡萄香蕉芭樂檸檬台灣中國可吸葡萄香蕉芭樂檸檬台灣中國可吸葡萄香蕉芭樂檸檬
        </h3>
      </CardContent>
    </Card>
    <Card className="m-2 border-none shadow-none">
      <CardContent className="flex flex-col gap-2 p-3">
        <div className="flex gap-2 text-sm">
          <h3 className="min-w-fit text-gray-400">配送</h3>
          <h3 className="truncate">上架24hr</h3>
        </div>
        <div className="flex gap-2 text-sm">
          <h3 className="min-w-fit text-sm text-gray-400">服務</h3>
          <h3 className="truncate">品質保證</h3>
        </div>
        <div className="flex gap-2 text-sm">
          <h3 className="min-w-fit text-sm text-gray-400">優惠</h3>
          <h3 className="truncate">限購兩份</h3>
        </div>
      </CardContent>
    </Card>
    <Card className="m-2 border-none shadow-none">
      <CardTitle className="p-3 text-sm font-semibold">規格信息</CardTitle>
      <CardContent className="flex flex-col gap-2 px-3">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="inline-block min-w-full p-1.5 align-middle">
              <div className="overflow-hidden rounded-lg border dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="flex">
                      <th className="flex flex-1 whitespace-nowrap border-r bg-secondary px-6 py-4 text-sm font-medium text-gray-800">
                        產地
                      </th>
                      <td className="flex flex-1 whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                        安徽
                      </td>
                    </tr>

                    <tr className="flex">
                      <th className="flex flex-1 whitespace-nowrap border-r bg-secondary px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                        規格
                      </th>
                      <td className="flex flex-1 whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                        180+/份
                      </td>
                    </tr>

                    <tr className="flex">
                      <th className="flex flex-1 whitespace-nowrap border-r bg-secondary px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                        有效日期
                      </th>
                      <td className="flex flex-1 whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                        30天
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card className="m-2 border-none shadow-none">
      <div className="relative h-screen w-full">
        <Image
          src="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
          alt=""
          className="object-cover"
          fill
        />
      </div>
    </Card>
    <NavBar />
  </main>
)

export default ProductPage
