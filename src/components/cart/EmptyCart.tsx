import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface EmptyCartProps {
  title?: string
  description?: string
  showCta?: boolean
}

export const EmptyCart: React.FC<EmptyCartProps> = ({
  title = 'Your cart is empty',
  description = 'Add some products to your cart',
  showCta = true,
}) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <ShoppingCart className="h-12 w-12 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 mb-8">
        {description}
      </p>
      
      {showCta && (
        <div className="space-y-4">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform bg-primary-600 text-white hover:bg-primary-700 h-10 px-4 py-2"
          >
            Browse Products
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform border border-gray-300 hover:bg-gray-50 h-10 px-4 py-2"
          >
            Return to Home
          </Link>
        </div>
      )}
    </div>
  )
}