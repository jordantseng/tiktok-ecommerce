import BarcodeDisplay from '@/components/BarcodeDisplay'
import { Skeleton } from '@/components/ui/skeleton'
import { OrderData, getFormatDate, PaymentMethodEnum } from '@/services/order'
import { CopyIcon } from 'lucide-react'

type TransactionInfoCardProps = {
  order: OrderData | null
}

function TransactionInfoCard({ order }: TransactionInfoCardProps) {
  return (
    <div className="relative m-4 mt-0 flex flex-col gap-2 rounded-xl bg-white p-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">
          {!order ? <Skeleton className="h-5 w-14" /> : `下單時間`}
        </span>
        <span>{!order ? <Skeleton className="h-5 w-20" /> : getFormatDate(order.created_at!)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">
          {!order ? <Skeleton className="h-5 w-14" /> : `訂單編號`}
        </span>
        <span>{!order ? <Skeleton className="h-5 w-20" /> : order.ordergroupnumber}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">
          {!order ? <Skeleton className="h-5 w-14" /> : `支付方式`}
        </span>
        <span>
          {!order ? (
            <Skeleton className="h-5 w-20" />
          ) : (
            order.paytitle || PaymentMethodEnum[order.paystatus!]
          )}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">
          {!order ? <Skeleton className="h-5 w-14" /> : `交易流水號`}
        </span>
        <span>{!order ? <Skeleton className="h-5 w-20" /> : order.paynumber}</span>
      </div>
      {!order ? (
        <Skeleton className="h-5 w-full" />
      ) : (
        order?.paybranch && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">銀行代號</span>
            <span>{order?.paybranch}</span>
          </div>
        )
      )}
      {!order ? (
        <Skeleton className="h-5 w-full" />
      ) : (
        order.payaccount && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">銀行帳號</span>
            <span className="flex space-x-1">
              <CopyIcon
                size="15"
                onClick={() => navigator.clipboard.writeText(order.payaccount || '')}
              />
              <span>{order.payaccount}</span>
            </span>
          </div>
        )
      )}
      {!order ? (
        <Skeleton className="h-5 w-full" />
      ) : (
        order.payexpiredate && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">繳款到期日</span>
            <span>{order?.payexpiredate}</span>
          </div>
        )
      )}
      {order?.barcode1 && <BarcodeDisplay order={order} />}
    </div>
  )
}

export default TransactionInfoCard
