import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientHeader } from '@/components/layout/ClientHeader'
import { Footer } from '@/components/layout/Footer'
import { Providers } from './providers'
import { CartSidebar } from '@/components/cart/CartSidebar'
import { WishlistSidebar } from '@/components/wishlist/WishlistSidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UltimateShop - Premium E-commerce',
  description: 'The ultimate e-commerce experience with modern design and exceptional performance',
  keywords: ['ecommerce', 'shopping', 'nextjs', 'typescript'],
  manifest: '/manifest.json',
  robots: 'index, follow',
  openGraph: {
    title: 'UltimateShop - Premium E-commerce',
    description: 'The ultimate e-commerce experience with modern design and exceptional performance',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UltimateShop - Premium E-commerce',
    description: 'The ultimate e-commerce experience with modern design and exceptional performance',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <ClientHeader />
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
          
          {/* Global Sidebars */}
          <CartSidebar />
          <WishlistSidebar />
        </Providers>
      </body>
    </html>
  )
}