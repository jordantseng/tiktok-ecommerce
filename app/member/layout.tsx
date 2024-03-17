import { ReactNode } from 'react'

import { OrderProvider } from '@/context/OrderContext'
import { RecommendsProvider } from '@/context/RecommendsContext'
import { ContactProvider } from '@/context/ContactContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <RecommendsProvider>
      <OrderProvider>
        <ContactProvider>{children}</ContactProvider>
      </OrderProvider>
    </RecommendsProvider>
  )
}
