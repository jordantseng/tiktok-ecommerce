'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { getBaseURL } from '@/lib/utils'
import { previewDiscont } from '@/services/order'
import Image from 'next/image'
import React from 'react'
import { useImmer } from 'use-immer'

type Props = {
  onDiscount: (code: string, discount: number) => void
}

const Discount = ({ onDiscount }: Props) => {
  const [code, setCode] = useImmer('')
  const [isActived, setIsActived] = useImmer(false)
  const { toast } = useToast()
  const handleDiscount = (checked: boolean) => {
    const baseURL = getBaseURL(window.location.host)

    if (checked) {
      previewDiscont(baseURL, code)
        .then(({ data }) => {
          toast({
            className: 'bg-primary text-white',
            description: '兌換成功',
          })
          onDiscount(data.discount_code || '', data.discount || 0)
        })
        .catch(() =>
          toast({
            className: 'bg-primary text-white',
            description: '兌換失敗',
          }),
        )
    } else {
      toast({
        className: 'bg-primary text-white',
        description: '取消兌換',
      })
      onDiscount('', 0)
    }
    setIsActived(checked)
  }

  return (
    <div className="flex items-center justify-between rounded-lg bg-white px-2 py-0">
      <div className="relative flex h-[18px] min-w-[18px]">
        <Image alt="discount" fill src="/tickets.png" />
      </div>
      <Input
        className="m-2 w-full bg-white"
        placeholder="請輸入優惠券"
        onChange={(val) => setCode(val.target.value)}
      />
      {/* <Checkbox className="rounded-lg" disabled={!code} onCheckedChange={handleDiscount} /> */}
      <Button disabled={!code} className="w-[30%]" onClick={() => handleDiscount(!isActived)}>
        {isActived ? '取消' : '兌換'}
      </Button>
    </div>
  )
}

export default Discount
