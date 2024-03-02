'use client'

import { OrderDetailProvider } from '@/context/OrderDetailContext'
import { PropsWithChildren } from 'react'

type RootLayoutProps = {
  params: {
    id: string
  }
} & PropsWithChildren

export default function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const { id } = params
  return (
    <OrderDetailProvider id={id}>
      <main className="flex h-full min-h-screen flex-col">{children}</main>
    </OrderDetailProvider>
  )
}
