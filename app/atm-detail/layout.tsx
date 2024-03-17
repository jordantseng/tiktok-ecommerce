'use client'

import { OrderDetailProvider } from '@/context/OrderDetailContext'
import { useSearchParams } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { ContactProvider } from '@/context/ContactContext'

type RootLayoutProps = PropsWithChildren

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || ''
  return (
    <ContactProvider>
      <OrderDetailProvider id={id}>
        <main className="flex h-full min-h-screen flex-col">{children}</main>
      </OrderDetailProvider>
    </ContactProvider>
  )
}
