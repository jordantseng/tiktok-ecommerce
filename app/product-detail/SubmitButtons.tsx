'use client'

import { useState } from 'react'
import { useImmer } from 'use-immer'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

import SpecDialog from '@/components/SpecDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRightIcon } from 'lucide-react'
import { ProductData } from '@/services/product'
import { useCartContext } from '@/context/CartContext'

type SubmitButtonsProps = {
  product: ProductData
  specs: { id: number; title: string }[]
}

const SubmitButtons = ({ product, specs }: SubmitButtonsProps) => {
  const defaultSelectedSize = { id: String(specs[0].id), size: specs[0].title }

  const { handleAddToCart, items } = useCartContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<{ id: string; size: string } | null>(
    specs.length === 1 ? defaultSelectedSize : null,
  )
  const [selectedButtonType, setSeleectedButtonType] = useState<'addToCart' | 'buyProduct' | ''>('')
  const [confirmedItem, updateConfirmedItem] = useImmer<{
    id: string
    size: string
    count: number
  }>({
    id: '',
    size: '',
    count: 0,
  })
  const [count, setCount] = useState(
    selectedSize?.size === confirmedItem.size ? confirmedItem.count : 1,
  )
  const router = useRouter()
  const { toast } = useToast()

  const nowAmount = items.find((opt) => opt.id === product.id)?.amount || 0
  const item = {
    id: product.id,
    productItemId: Number(selectedSize?.id),
    amount: nowAmount + count,
    imgUrl: product.imgs[0],
    title: product.title,
    price: product.price,
    originPrice: product.marketprice,
    tags: product.tags?.split(','),
  }

  const handleSpecSelect = ({ id, size }: { id: string; size: string }) => {
    setSelectedSize({ id, size })
    setCount(1)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setCount(1)
    setSelectedSize(
      specs.length === 1 ? defaultSelectedSize : { id: confirmedItem.id, size: confirmedItem.size },
    )
  }

  const handleConfirm = () => {
    if (!selectedSize?.id || !selectedSize?.size) {
      return
    }

    updateConfirmedItem((draft) => {
      draft.id = selectedSize.id
      draft.size = selectedSize.size
      draft.count = count
    })

    if (selectedButtonType === 'addToCart') {
      handleAddToCart(item)
      setIsDialogOpen(false)
      toast({
        variant: 'destructive',
        title: '成功加入購物車！',
      })
      return
    }

    if (selectedButtonType === 'buyProduct') {
      handleAddToCart(item)
      router.push('/shopping-cart')
      return
    }

    setIsDialogOpen(false)
  }

  const handleBuyProductClick = () => {
    if (!confirmedItem.id || !confirmedItem.size || confirmedItem.count <= 0) {
      setSeleectedButtonType('buyProduct')
      setIsDialogOpen(true)
      return
    }

    handleAddToCart(item)
    router.push('/shopping-cart')
  }

  const handleAddToCartClick = () => {
    if (!confirmedItem.id || !confirmedItem.size || confirmedItem.count <= 0) {
      setSeleectedButtonType('addToCart')
      setIsDialogOpen(true)
      return
    }

    handleAddToCart(item)
    setIsDialogOpen(false)
    toast({
      variant: 'destructive',
      title: '成功加入購物車！',
    })
  }

  return (
    <>
      <Card
        className="m-2 cursor-pointer border-none shadow-none"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardContent className="flex justify-between gap-2 p-3">
          <h4 className="text-sm font-semibold">
            已選
            {confirmedItem.count !== 0 && (
              <>
                {confirmedItem.size} - x{confirmedItem.count}
              </>
            )}
          </h4>
          <ChevronRightIcon />
        </CardContent>
      </Card>
      <SpecDialog
        unitTitle={product.unit}
        specs={specs}
        confirmedItem={confirmedItem}
        open={isDialogOpen}
        selectedSize={selectedSize}
        count={count}
        onSpecSelect={handleSpecSelect}
        onCountChange={(count) => setCount(count)}
        onClose={handleDialogClose}
        Actions={
          <div className="flex">
            <Button
              className="flex-grow rounded-full text-white hover:bg-red-600"
              type="button"
              onClick={handleConfirm}
            >
              確認
            </Button>
          </div>
        }
      />
      <nav className="h-22 fixed bottom-0 z-30 flex w-full max-w-md justify-around gap-2 bg-white p-2">
        <Button
          variant="outline"
          className="w-full rounded-3xl font-semibold"
          onClick={handleAddToCartClick}
        >
          加入購物車
        </Button>
        <Button className="w-full rounded-3xl font-semibold" onClick={handleBuyProductClick}>
          立即購買
        </Button>
      </nav>
    </>
  )
}

export default SubmitButtons
