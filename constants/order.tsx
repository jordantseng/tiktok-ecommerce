import { ReactNode } from 'react'
import { CheckCircle2, Truck, Wallet, WalletCards, XCircle } from 'lucide-react'

import { OrderStatus, OrderStatusTitle } from '@/services/order'

type NavItem = {
  title: OrderStatusTitle
  href: string
  Icon: ReactNode
}

type OrderStatusMap = Record<
  OrderStatus,
  {
    value: OrderStatus
    nav: NavItem
  }
>

export const orderStatusMap: OrderStatusMap = {
  checkout: {
    value: 'checkout',
    nav: {
      title: '待付款',
      href: '/member/orders?type=checkout',
      Icon: <Wallet className="h-10 w-10 p-2" />,
    },
  },
  shipping: {
    value: 'shipping',
    nav: {
      title: '待發貨',
      href: '/member/orders?type=shipping',
      Icon: <WalletCards className="h-10 w-10 p-2" />,
    },
  },
  receipt: {
    value: 'receipt',
    nav: {
      title: '待收貨',
      href: '/member/orders?type=receipt',
      Icon: <Truck className="h-10 w-10 p-2" />,
    },
  },
  receipted: {
    value: 'receipted',
    nav: {
      title: '已收貨',
      href: '/member/orders?type=receipted',
      Icon: <CheckCircle2 className="h-10 w-10 p-2" />,
    },
  },
  refunded: {
    value: 'refunded',
    nav: {
      title: '取消/退款',
      href: '/member/orders?type=refunded',
      Icon: <XCircle className="h-10 w-10 p-2" />,
    },
  },
}
