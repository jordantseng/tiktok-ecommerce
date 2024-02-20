'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { previewDiscont } from '@/services/order'
import React from 'react'
import { useImmer } from 'use-immer'

type Props = {
  onDiscount: (val: string) => void
}

const Discount = ({ onDiscount }: Props) => {
  const [code, setCode] = useImmer('')
  const handleDiscount = () => {
    previewDiscont(code).then((res) => console.log(res))
    onDiscount(code)
  }

  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-2">
      <span>優惠券：</span>
      <Input
        className="w-[40%]"
        placeholder="請輸入優惠代碼"
        onChange={(val) => setCode(val.target.value)}
      />
      <Button disabled={!code} className="w-[30%]" onClick={handleDiscount}>
        確認兌換
      </Button>
    </div>
  )
}

export default Discount
