'use client'

import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import Link from 'next/link'

import CartItem from '@/components/CartItem'
import MerchandiseCard, { MerchandiseSkeleton } from '@/components/MerchandiseCard'
import NavBar from '@/components/NavBar'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import CartSpecDialog from '@/app/shopping-cart/CartSpecDialog'
import { Item, useCartContext } from '@/context/CartContext'
import { useRecommendsContext } from '@/context/RecommendsContext'
import { getProductItems } from '@/services/productItem'

const ShoppingCartPage = () => {
  const [total, setTotal] = useImmer(0)
  const [isDialogOpen, setIsDialogOpen] = useImmer(false)
  const [specs, setSpecs] = useImmer<{ id: number; title: string }[]>([])
  const [selectProductItem, setSelectProductItem] = useImmer<Item | null>(null)
  const {
    items,
    updateSelected,
    getSelectedCartItems,
    updateItemAmount,
    handleGetMyCart,
    handleRemoveFromCart,
    confirmPurchase,
  } = useCartContext()
  const { recommends, isLoadingRecommends } = useRecommendsContext()

  useEffect(() => {
    handleGetMyCart()
  }, [handleGetMyCart])

  useEffect(() => {
    const arr = getSelectedCartItems()
    const sum = arr.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue.amount || 0) * (currentValue.price || currentValue.originPrice),
      0,
    )
    setTotal(sum)
  }, [getSelectedCartItems, setTotal])

  const handleCheckAll = (res: boolean) => {
    let sum = 0
    items.forEach((opt) => {
      if (res) {
        sum += (opt.amount || 0) * (opt.price || opt.originPrice)
      }
      updateSelected(opt.id, res)
    })
    setTotal(sum)
  }

  const handlePriceChange = (item: Item, val: number) => {
    const isMinus = val < (item.amount || 0)
    const nowItems = getSelectedCartItems()
    updateItemAmount(item.id, val)
    nowItems.forEach((el) => {
      if (item.id === el.id) {
        setTotal(
          isMinus ? total - (el.price || el.originPrice) : total + (el.price || el.originPrice),
        )
      }
    })
  }

  const handleSelect = (item: Item, res: boolean) => {
    const prizeAmount = item.price || item.originPrice
    const updateAmount = (item.amount || 0) * prizeAmount

    setTotal((draft) => draft + (res ? updateAmount : -updateAmount))
    updateSelected(item.id, res)
  }

  const handleChangeProductItem = (item: Item) => {
    getProductItems({ productId: item.product_id }).then(({ data }) => {
      setSpecs(data.data)
      setSelectProductItem(item)
      setIsDialogOpen(true)
    })
  }

  const handleSpecSelect = ({ id, size }: { id: string; size: string }) => {
    setSelectProductItem((draft) => {
      if (draft) {
        draft.productItemId = Number(id)
        draft.productItemTitle = size
      }
    })
  }

  const handleAmountChange = (amount: number) => {
    setSelectProductItem((draft) => {
      if (draft) {
        draft.amount = amount
      }
    })
  }

  const handleClose = () => {
    setSelectProductItem(null)
    setIsDialogOpen(false)
    setSpecs([])
  }

  return (
    <main className="mb-16 h-full min-h-screen">
      <Title title={`購物車(${items.length})`} hasPrevButton={false} />
      <div className="relative flex min-h-screen w-full flex-col items-center bg-background">
        <div className="w-full p-4">
          <div className="rounded-lg bg-white">
            {items.map((opt, index) => (
              <CartItem
                isChecked={opt.isSelect}
                key={opt.id}
                id={opt.id}
                amount={opt.amount}
                editable={true}
                imgUrl={opt.imgUrl}
                title={opt.title}
                price={opt.price}
                tags={opt.tags}
                originPrice={opt.originPrice}
                productItemId={opt.productItemId}
                productItemTitle={opt.productItemTitle}
                onSelect={(res) => handleSelect(opt, res)}
                onChange={(val) => handlePriceChange(opt, val)}
                onDelete={(id) => handleRemoveFromCart(id)}
                onChangeProductItem={() => handleChangeProductItem(opt)}
              />
            ))}
          </div>
        </div>

        <div className="font-lg flex items-center justify-center font-semibold">✨ 為你推薦 ✨</div>
        <div className="mb-32 grid w-full grid-cols-2 place-items-center gap-4 p-4 max-[320px]:grid-cols-1">
          {recommends.map((opt) => (
            <MerchandiseCard
              id={opt.id}
              key={opt.id}
              className="h-full w-full"
              imgUrl={opt.imgs[0]}
              title={opt.title}
              tags={opt.tags?.split(',')}
              price={opt.price}
              originPrice={opt.marketprice}
            />
          ))}

          {isLoadingRecommends &&
            Array.from({ length: 2 }).map((_, index) => <MerchandiseSkeleton key={index} />)}
        </div>

        <div className="fixed bottom-[68px] flex w-full max-w-md justify-between bg-white p-6">
          <div className="text-md flex items-center space-x-2">
            <Checkbox
              id="terms"
              onCheckedChange={handleCheckAll}
              checked={getSelectedCartItems().length === items.length}
            />
            <label htmlFor="terms" className="text-lg font-medium">
              全選
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <div className="felx">
              <span>總計：</span>
              <span className="text-lg font-semibold text-red-400">${total}</span>
            </div>
            <Link
              aria-disabled={total === 0}
              tabIndex={total === 0 ? -1 : undefined}
              style={{
                pointerEvents: total === 0 ? 'none' : 'auto',
              }}
              href="/confirm-order"
            >
              <Button
                className="w-[4/12] rounded-3xl bg-primary"
                disabled={total === 0}
                onClick={() => confirmPurchase()}
              >
                結帳
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <NavBar />
      <CartSpecDialog
        open={isDialogOpen}
        specs={specs}
        selectProductItem={selectProductItem}
        onAmountChange={handleAmountChange}
        onSpecSelect={handleSpecSelect}
        onClose={handleClose}
      />
    </main>
  )
}

export default ShoppingCartPage
