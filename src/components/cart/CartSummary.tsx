'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

interface CartSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  total: number
  itemCount: number
  className?: string
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  total,
  itemCount,
  className,
}) => {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <Link
          href="/checkout"
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform bg-primary-600 text-white hover:bg-primary-700 h-10 px-4 py-2 w-full"
        >
          Proceed to Checkout
        </Link>
        
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform border border-gray-300 hover:bg-gray-50 h-10 px-4 py-2 w-full"
        >
          Continue Shopping
        </Link>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Free shipping on orders over $50
        </p>
      </div>
    </div>
  )
}