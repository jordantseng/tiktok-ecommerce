import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
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
    title: data.title,
    description: data.description,
    icons: [{ url: data.ico || '/fake-logo.png' }],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-941025194"></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-941025194');`}
        </Script>
      </head>
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
