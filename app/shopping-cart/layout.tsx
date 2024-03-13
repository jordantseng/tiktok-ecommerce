import { ReactNode } from 'react'
import { RecommendsProvider } from '@/context/RecommendsContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <RecommendsProvider>{children}</RecommendsProvider>
}
