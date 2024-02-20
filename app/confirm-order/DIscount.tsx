'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { previewDiscont } from '@/services/order'
import React from 'react'
import { useImmer } from 'use-immer'

type Props = {
  onDiscount: (code: string, discount: number) => void
}

const Discount = ({ onDiscount }: Props) => {
  const [code, setCode] = useImmer('')
  const { toast } = useToast()
  const handleDiscount = () => {
    previewDiscont(code).then(({ data }) => {
      toast({
        variant: 'destructive',
        description: '兌換成功',
      })
      onDiscount(data.discount_code || '', data.discount || 0)
    })
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
