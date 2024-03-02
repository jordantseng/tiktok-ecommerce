'use client'

import { useState } from 'react'
import { useImmer } from 'use-immer'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

import SpecDialog from '@/components/SpecDialog'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/services/cart'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRightIcon } from 'lucide-react'
import { ProductData } from '@/services/product'
import { Item, useCartContext } from '@/context/CartContext'

type SubmitButtonsProps = {
  product: ProductData
  specs: { id: number; title: string }[]
}

const SubmitButtons = ({ product, specs }: SubmitButtonsProps) => {
  const { handleAddToCart } = useCartContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<{ id: string; size: string } | null>(null)
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

  const handleSpecSelect = ({ id, size }: { id: string; size: string }) => {
    setSelectedSize({ id, size })
    setCount(1)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setCount(1)
    setSelectedSize({ id: confirmedItem.id, size: confirmedItem.size })
  }

  const handleConfirm = async () => {
    if (!selectedSize?.id || !selectedSize?.size) {
      return
    }

    setIsDialogOpen(false)
    updateConfirmedItem((draft) => {
      draft.id = selectedSize.id
      draft.size = selectedSize.size
      draft.count = count
    })
  }

  const handleBuyProduct = async () => {
    try {
      const item: Item = {
        id: product.id,
        productItemId: Number(confirmedItem?.id),
        amount: confirmedItem.count,
        imgUrl: product.imgs[0],
        title: product.title,
        price: product.price,
        originPrice: product.marketprice,
        tags: product.tags?.split(','),
        isSelect: false,
      }
      await handleAddToCart(item)
      router.push('/shopping-cart')
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddToCard = async () => {
    try {
      const item: Item = {
        id: product.id,
        productItemId: Number(confirmedItem?.id),
        amount: confirmedItem.count,
        imgUrl: product.imgs[0],
        title: product.title,
        price: product.price,
        originPrice: product.marketprice,
        tags: product.tags?.split(','),
        isSelect: false,
      }
      await handleAddToCart(item)
      toast({
        variant: 'destructive',
        title: '成功加入購物車！',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Card
        className="m-2 cursor-pointer border-none shadow-none"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardContent className="flex justify-between gap-2 p-3">
          <div>
            已選
            {confirmedItem.count !== 0 && (
              <>
                {confirmedItem.size} - x{confirmedItem.count}
              </>
            )}
          </div>
          <ChevronRightIcon />
        </CardContent>
      </Card>
      <SpecDialog
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
          disabled={!confirmedItem.id || !confirmedItem.size || confirmedItem.count <= 0}
          onClick={handleAddToCard}
        >
          加入購物車
        </Button>
        <Button
          className="w-full rounded-3xl font-semibold"
          disabled={!confirmedItem.id || !confirmedItem.size || confirmedItem.count <= 0}
          onClick={handleBuyProduct}
        >
          立即購買
        </Button>
      </nav>
    </>
  )
}

export default SubmitButtons
