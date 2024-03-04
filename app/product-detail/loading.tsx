import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'

import PrevButton from '@/components/PrevButton'
import { Button } from '@/components/ui/button'

const ProductLoadingPage = async () => {
  return (
    <main className="mb-14 min-h-screen bg-background">
      <header className="flex items-center justify-between gap-3 bg-white p-4">
        <PrevButton />
        <Link href="/shopping-cart">
          <ShoppingCartIcon className="text-gray-400" />
        </Link>
      </header>
      <nav className="h-22 fixed bottom-0 z-30 flex w-full max-w-md justify-around gap-2 bg-white p-2">
        <Button variant="outline" className="w-full rounded-3xl font-semibold" disabled>
          加入購物車
        </Button>
        <Button className="w-full rounded-3xl font-semibold" disabled>
          立即購買
        </Button>
      </nav>
    </main>
  )
}

export default ProductLoadingPage
