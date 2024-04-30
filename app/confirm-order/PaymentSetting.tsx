'use client'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAddressContext } from '@/context/AddressContext'
import { useCartContext } from '@/context/CartContext'
import { useWebSettingsContext } from '@/context/WebSettingsContext'
import { PayStatus } from '@/services/order'
import { ChevronsUpDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useImmer } from 'use-immer'

type Props = {
  onChange: (val: PayStatus) => void
  value: string | null
}

const PaymentSetting = ({ value, onChange }: Props) => {
  const { webSettingsData } = useWebSettingsContext()
  const { getSelectedCartItems } = useCartContext()
  const handleChange = (val: PayStatus) => setSelected(val)
  const { deliveryType } = useAddressContext()
  const [selected, setSelected] = useImmer<PayStatus | null>(null)
  const creditCount = Object.keys(webSettingsData?.paykind || {}).filter((opt) =>
    opt.includes('credit'),
  )

  const items = getSelectedCartItems()
  const total = items.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.amount || 0) * (currentValue.price || currentValue.originPrice),
    0,
  )

  return (
    // 信用卡付款(綠界)[ecpay-credit],
    // 信用卡分3期(綠界)[ecpay-credit3],
    // 信用卡分6期(綠界)[ecpay-credit6],
    // 信用卡分12期(綠界)[ecpay-credit12],
    // 轉帳(綠界)[ecpay-atm],

    // 信用卡(藍新)[newbpay-credit],
    // 信用卡分3期(藍新)[newbpay-credit3],
    // 信用卡分6期(藍新)[newbpay-credit6],
    // 信用卡分12期(藍新)[newbpay-credit12],
    // 轉帳(藍新)[newbpay-atm],

    // 信用卡(快點付)[wanpay-credit],
    // 轉帳(快點付)[wanpay-atm],
    // 信用卡分3期(快點付)[wanpay-credit3],
    // 信用卡分6期(快點付)[wanpay-credit6],
    // 信用卡分12期(快點付)[wanpay-credit12],
    // 信用卡分24期(快點付)[wanpay-credit24],
    <>
      <RadioGroup
        className="w-full bg-white"
        defaultValue={value || ''}
        onValueChange={handleChange}
      >
        {creditCount.length > 1 ? (
          <div className="flex items-center justify-between space-x-2  p-4">
            <Collapsible className="w-full">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between">
                  <Label htmlFor="credit">
                    {total > 200000 ? (
                      <div className="font-lg flex items-center justify-center font-bold text-red-400">
                        ⚠️20萬以上無法使用信用卡付款⚠️
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <div className="item-center relative flex h-5 w-5 justify-center">
                          <Image alt="credit" fill src="/credit.png" />
                        </div>
                        <span>信用卡付款</span>
                      </div>
                    )}
                  </Label>
                  <ChevronsUpDown className="h-4 w-4" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {Object.keys(webSettingsData?.paykind || {}).map(
                  (opt: string) =>
                    opt.indexOf('credit') > -1 && (
                      <div key={opt} className="ml-4 flex space-x-2 p-4">
                        <RadioGroupItem value={opt} id={opt} disabled={total > 200000} />
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={opt}>{webSettingsData?.paykind[opt]}</Label>
                        </div>
                      </div>
                    ),
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        ) : (
          Object.keys(webSettingsData?.paykind || {}).map(
            (opt: string) =>
              opt.indexOf('credit') > -1 && (
                <div className="flex items-center justify-between space-x-2  p-4" key={opt}>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={opt}>
                      {total > 200000 ? (
                        <div className="font-lg flex items-center justify-center font-bold text-red-400">
                          ⚠️20萬以上無法使用信用卡付款⚠️
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="item-center relative flex h-5 w-5 justify-center">
                            <Image alt="credit" fill src="/credit.png" />
                          </div>
                          <span>信用卡付款</span>
                        </div>
                      )}
                    </Label>
                  </div>
                  <RadioGroupItem value={opt} id={opt} disabled={total > 200000} />
                </div>
              ),
          )
        )}

        {Object.keys(webSettingsData?.paykind || {}).map(
          (opt: string) =>
            opt === 'atm' && (
              <div className="flex items-center justify-between space-x-2  p-4" key={opt}>
                <div className="flex items-center space-x-2">
                  <Label htmlFor={opt}>
                    {total > 50000 ? (
                      <div className="font-lg flex items-center justify-center font-bold text-red-400">
                        ⚠️5萬以上無法使用匯款⚠️
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <div className="item-center relative flex h-5 w-5 justify-center">
                          <Image alt="atm" fill src="/group.png" />
                        </div>
                        <span>匯款</span>
                      </div>
                    )}
                  </Label>
                </div>
                <RadioGroupItem value={opt} id={opt} disabled={total > 50000} />
              </div>
            ),
        )}
        {Object.keys(webSettingsData?.paykind || {}).map(
          (opt: string) =>
            opt.indexOf('-atm') > -1 && (
              <div className="flex items-center justify-between space-x-2  p-4" key={opt}>
                <div className="flex items-center space-x-2">
                  <Label htmlFor={opt}>
                    <div className="flex items-center space-x-2">
                      <div className="item-center relative flex h-5 w-5 justify-center">
                        <Image alt="atm" fill src="/group.png" />
                      </div>
                      <span>ATM轉帳</span>
                    </div>
                  </Label>
                </div>
                <RadioGroupItem value={opt} id={opt} />
              </div>
            ),
        )}
        {Object.keys(webSettingsData?.paykind || {}).map(
          (opt: string) =>
            opt.indexOf(deliveryType !== 'HOME_DELIVERY' ? 'csv' : 'home') > -1 && (
              <div className="flex items-center justify-between space-x-2  p-4" key={opt}>
                <div className="flex items-center space-x-2">
                  <Label htmlFor={opt}>
                    <div className="flex items-center space-x-2">
                      <div className="item-center relative flex h-5 w-5 justify-center">
                        <Image alt="atm" fill src="/cash.png" />
                      </div>
                      <span>貨到付款</span>
                    </div>
                  </Label>
                </div>
                <RadioGroupItem value={opt} id={opt} />
              </div>
            ),
        )}
        {Object.keys(webSettingsData?.paykind || {}).map(
          (opt: string) =>
            opt.indexOf('barcode') > -1 && (
              <div className="flex items-center justify-between space-x-2  p-4" key={opt}>
                <div className="flex items-center space-x-2">
                  <Label htmlFor={opt}>
                    {total > 20000 ? (
                      <div className="font-lg flex items-center justify-center font-bold text-red-400">
                        ⚠️2萬以上無法使用超商代碼⚠️
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <div className="item-center relative flex h-5 w-5 justify-center">
                          <Image alt="atm" fill src="/cash.png" />
                        </div>
                        <span>超商代碼</span>
                      </div>
                    )}
                  </Label>
                </div>
                <RadioGroupItem value={opt} id={opt} disabled={total > 20000} />
              </div>
            ),
        )}
      </RadioGroup>
      <Button
        className="w-full rounded-full"
        variant="primary"
        onClick={() => selected && onChange(selected)}
      >
        確認
      </Button>
    </>

    // <Select onValueChange={handleChange}>
    //   <SelectTrigger className="w-full bg-white">
    //     <SelectValue placeholder="請選擇付款方式" />
    //   </SelectTrigger>
    //   <SelectContent>
    //     <SelectGroup>
    //       <SelectLabel>
    //         <div className="flex items-center space-x-2">
    //           <div className="item-center relative flex h-5 w-5 justify-center">
    //             <Image alt="credit" fill src="/credit.png" />
    //           </div>
    //           <span>信用卡付款</span>
    //         </div>
    //       </SelectLabel>
    // {Object.keys(webSettingsData?.paykind || {}).map(
    //   (opt: string) =>
    //     opt.indexOf('credit') > -1 && (
    //       <SelectItem className="ml-4" key={opt} value={opt}>
    //         {webSettingsData?.paykind[opt] === '信用卡付款'
    //           ? '信用卡一次付清'
    //           : webSettingsData?.paykind[opt]}
    //       </SelectItem>
    //     ),
    // )}
    //     </SelectGroup>
    //     {/* TODO:無卡分期 */}
    //     {/* <SelectGroup>
    //       <SelectLabel>
    //         <div className="flex items-center space-x-2">
    //           <CreditCardIcon />
    //           <span>無卡分期</span>
    //         </div>
    //       </SelectLabel>
    //       <SelectItem className="ml-4" value="ecpay-no-credit3">
    //         無卡分3期
    //       </SelectItem>
    //       <SelectItem className="ml-4" value="ecpay-no-credit6">
    //         無卡分6期
    //       </SelectItem>
    //       <SelectItem className="ml-4" value="ecpay-no-credit12">
    //         無卡分12期
    //       </SelectItem>
    //     </SelectGroup> */}
    //     <SelectGroup>
    //       {Object.keys(webSettingsData?.paykind || {}).map(
    //         (opt: string) =>
    //           opt.indexOf('atm') > 0 && (
    //             <SelectItem key={opt} value={opt}>
    //               <div className="flex items-center space-x-2">
    //                 <div className="item-center relative flex h-5 w-5 justify-center">
    //                   <Image alt="atm" fill src="/group.png" />
    //                 </div>
    //                 <span>ATM轉帳</span>
    //               </div>
    //             </SelectItem>
    //           ),
    //       )}
    //     </SelectGroup>
    //     {Object.keys(webSettingsData?.paykind || {}).map(
    //       (opt: string) =>
    //         opt.indexOf('home') > -1 && (
    //           <SelectGroup key={opt}>
    //             <SelectItem value={opt}>
    //               <div className="flex items-center space-x-2">
    //                 <div className="item-center relative flex h-5 w-5 justify-center">
    //                   <Image alt="atm" fill src="/cash.png" />
    //                 </div>
    //                 <span>貨到付款</span>
    //               </div>
    //             </SelectItem>
    //           </SelectGroup>
    //         ),
    //     )}
    //     {Object.keys(webSettingsData?.paykind || {}).map(
    //       (opt: string) =>
    //         opt.indexOf('csv') > -1 && (
    //           <SelectGroup key={opt}>
    //             <SelectItem value={opt}>
    //               <div className="flex items-center space-x-2">
    //                 <StoreIcon />
    //                 <span>超商代碼</span>
    //               </div>
    //             </SelectItem>
    //           </SelectGroup>
    //         ),
    //     )}
    //   </SelectContent>
    // </Select>
  )
}

export default PaymentSetting
