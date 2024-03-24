import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

import { cn } from '@/lib/utils'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { AddressProvider } from '@/context/AddressContext'
import { WebSettingsProvider } from '@/context/WebSettingsContext'
import { Toaster } from '@/components/ui/toaster'
import { getWebSettings } from '@/services/webSettings'
import { NavigationProvider } from '@/context/NavigationContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getWebSettings()

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
          gtag(){dataLayer.push(arguments);}
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
                    'touch-pan-x touch-pan-y bg-background font-sans antialiased',
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
