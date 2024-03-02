'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useWebSettingsContext } from '@/context/WebSettingsContext'
import { PayStatus } from '@/services/order'
import { CircleDollarSignIcon, CreditCardIcon, StoreIcon, TruckIcon } from 'lucide-react'
import React from 'react'

type Props = {
  onChange: (val: PayStatus) => void
}

const PaymentSetting = ({ onChange }: Props) => {
  const { webSettingsData } = useWebSettingsContext()
  const handleChange = (val: PayStatus) => onChange(val)
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
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue placeholder="請選擇付款方式" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            <div className="flex items-center space-x-2">
              <CreditCardIcon />
              <span>信用卡付款</span>
            </div>
          </SelectLabel>
          {Object.keys(webSettingsData?.paykind || {}).map(
            (opt: string) =>
              opt.indexOf('credit') > -1 && (
                <SelectItem className="ml-4" key={opt} value={opt}>
                  {webSettingsData?.paykind[opt] === '信用卡付款'
                    ? '信用卡一次付清'
                    : webSettingsData?.paykind[opt]}
                </SelectItem>
              ),
          )}
        </SelectGroup>
        {/* TODO:無卡分期 */}
        {/* <SelectGroup>
          <SelectLabel>
            <div className="flex items-center space-x-2">
              <CreditCardIcon />
              <span>無卡分期</span>
            </div>
          </SelectLabel>
          <SelectItem className="ml-4" value="ecpay-no-credit3">
            無卡分3期
          </SelectItem>
          <SelectItem className="ml-4" value="ecpay-no-credit6">
            無卡分6期
          </SelectItem>
          <SelectItem className="ml-4" value="ecpay-no-credit12">
            無卡分12期
          </SelectItem>
        </SelectGroup> */}
        <SelectGroup>
          {Object.keys(webSettingsData?.paykind || {}).map(
            (opt: string) =>
              opt.indexOf('atm') > 0 && (
                <SelectItem key={opt} value={opt}>
                  <div className="flex items-center space-x-2">
                    <CircleDollarSignIcon />
                    <span>ATM轉帳</span>
                  </div>
                </SelectItem>
              ),
          )}
        </SelectGroup>
        {Object.keys(webSettingsData?.paykind || {}).map(
          (opt: string) =>
            opt.indexOf('home') > -1 && (
              <SelectGroup key={opt}>
                <SelectItem value={opt}>
                  <div className="flex items-center space-x-2">
                    <TruckIcon />
                    <span>貨到付款</span>
                  </div>
                </SelectItem>
              </SelectGroup>
            ),
        )}
        {Object.keys(webSettingsData?.paykind || {}).map(
          (opt: string) =>
            opt.indexOf('csv') > -1 && (
              <SelectGroup key={opt}>
                <SelectItem value={opt}>
                  <div className="flex items-center space-x-2">
                    <StoreIcon />
                    <span>超商取貨付款</span>
                  </div>
                </SelectItem>
              </SelectGroup>
            ),
        )}
      </SelectContent>
    </Select>
  )
}

export default PaymentSetting
