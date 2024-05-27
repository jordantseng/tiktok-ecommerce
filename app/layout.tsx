import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { cn, getBaseURL } from '@/lib/utils'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { AddressProvider } from '@/context/AddressContext'
import { WebSettingsProvider } from '@/context/WebSettingsContext'
import { Toaster } from '@/components/ui/toaster'
import { getWebSettings } from '@/services/webSettings'
import { NavigationProvider } from '@/context/NavigationContext'
import { headers } from 'next/headers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export async function generateMetadata(): Promise<Metadata> {
  const headerList = headers()
  const baseURL = getBaseURL(headerList.get('host')!)

  const { data } = await getWebSettings(baseURL)
  return {
    title: data?.title,
    description: data?.description,
    icons: [{ url: data?.ico || '/fake-logo.png' }],
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headerList = headers()
  const baseURL = getBaseURL(headerList.get('host')!)

  const { data } = await getWebSettings(baseURL)

  return (
    <html lang="en">
      {data.html ? <head dangerouslySetInnerHTML={{ __html: data.html }} /> : null}
      <WebSettingsProvider>
        <NavigationProvider>
          <AuthProvider>
            <CartProvider>
              <AddressProvider>
                <body
                  className={cn(
                    'touch-pan-x touch-pan-y bg-black font-sans antialiased max-[600px]:bg-background',
                    inter.variable,
                    inter.className,
                  )}
                >
                  <div className="mx-auto min-h-screen w-full max-w-md">{children}</div>
                  <Toaster />
                </body>
              </AddressProvider>
            </CartProvider>
          </AuthProvider>
        </NavigationProvider>
      </WebSettingsProvider>
    </html>
  )
}
