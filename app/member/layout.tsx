import { OrderProvider } from '@/context/OrderContext'
import { ReactNode } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <OrderProvider>{children}</OrderProvider>
}
