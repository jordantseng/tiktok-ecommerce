export const orderStatusMap = {
  checkout: {
    title: '待付款',
    value: 'checkout',
    href: '/member/orders?type=checkout',
  },
  shipping: {
    title: '待發貨',
    value: 'shipping',
    href: '/member/orders?type=shipping',
  },
  receipt: {
    title: '待收貨',
    value: 'receipt',
    href: '/member/orders?type=receipt',
  },
  receipted: {
    title: '已收貨',
    value: 'receipted',
    href: '/member/orders?type=receipted',
  },
  refunded: {
    title: '已退款',
    value: 'refunded',
    href: '/member/orders?type=refunded',
  },
}
