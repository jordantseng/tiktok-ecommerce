'use client'

import { useImmer } from 'use-immer'
import { Button } from '@/components/ui/button'
import { Item, useCartContext } from '@/context/CartContext'
import SpecDialog from '@/components/SpecDialog'
import Image from 'next/image'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  open: boolean
  specs: { id: number; title: string }[]
  selectProductItem: Item | null
  onAmountChange: (val: number) => void
  onSpecSelect: ({ id, size }: { id: string; size: string }) => void
  onClose: () => void
}

const CartSpecDialog = ({
  open,
  specs,
  selectProductItem,
  onAmountChange,
  onSpecSelect,
  onClose,
}: Props) => {
  const { handleAddToCart, handleRemoveFromCart } = useCartContext()
  const handleConfirmSpec = async () => {
    if (selectProductItem) {
      await handleRemoveFromCart(selectProductItem?.id)
      await handleAddToCart(selectProductItem)
      onClose()
    }
  }

  return (
    <SpecDialog
      specs={specs}
      confirmedItem={{
        id: selectProductItem?.productItemId?.toString() || '',
        size: selectProductItem?.productItemTitle || '',
        count: selectProductItem?.amount || 0,
      }}
      open={open}
      selectedSize={{
        id: selectProductItem?.productItemId?.toString() || '',
        size: selectProductItem?.productItemTitle || '',
      }}
      count={selectProductItem?.amount || 0}
      onSpecSelect={onSpecSelect}
      onCountChange={onAmountChange}
      onClose={onClose}
      unitTitle={selectProductItem?.unit}
      Image={
        <div className="flex">
          {selectProductItem && (
            <>
              <div className="relative m-2 flex h-[120px] w-full max-w-[100px] items-center max-[320px]:m-0">
                <Image
                  className="rounded-lg object-cover"
                  fill
                  src={selectProductItem?.imgUrl || ''}
                  alt={`product-${selectProductItem?.id}`}
                />
              </div>
              <Card className="border-0 shadow-none lg:w-full">
                <CardHeader className={'px-0 pb-0'}>
                  <div className="max-w-[150px] max-[320px]:max-w-[80px]">
                    <CardTitle className="truncate text-base max-[320px]:text-sm">
                      {selectProductItem?.title}
                    </CardTitle>
                  </div>
                  <div className="flex max-[350px]:flex-col">
                    <div className="ml-2 flex w-full items-center space-x-2">
                      {selectProductItem.price && (
                        <span className="max-[320px]:text-md text-lg font-bold text-red-600">
                          ${selectProductItem.price}
                        </span>
                      )}
                      <span
                        className={
                          selectProductItem.price
                            ? 'text-sm font-light line-through'
                            : 'max-[320px]:text-md flex h-full items-center text-lg font-bold'
                        }
                      >
                        ${selectProductItem.originPrice}
                      </span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </>
          )}
        </div>
      }
      Actions={
        <div className="mb-[65px] flex">
          <Button
            className="flex-grow rounded-full text-white hover:bg-red-600"
            type="button"
            onClick={handleConfirmSpec}
          >
            確認
          </Button>
        </div>
      }
    />
  )
}

export default CartSpecDialog
