'use client'

import React from 'react'
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/stores/cart.store'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { CartItem } from '@/components/cart/CartItem'

export default function CartPage() {
  const { items, getTotal, clearCart } = useCartStore()
  
  const subtotal = getTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform bg-primary-600 text-white hover:bg-primary-700 h-10 px-4 py-2 w-full"
            >
              Continue Shopping
            </Link>
            
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform border border-gray-300 hover:bg-gray-50 h-10 px-4 py-2 w-full"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Shopping Cart ({items.length} items)
      </h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="text-lg font-semibold">Products</h2>
            <button
              onClick={clearCart}
              className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear cart</span>
            </button>
          </div>
          
          {/* Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          {/* Continue Shopping */}
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform hover:bg-gray-100 hover:text-gray-900 flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 space-y-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
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
            
            <div className="space-y-3">
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
            
            {/* Payment Methods */}
            <div className="pt-4 border-t">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                We accept
              </h3>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-blue-600 rounded"></div>
                <div className="w-10 h-6 bg-yellow-400 rounded"></div>
                <div className="w-10 h-6 bg-purple-600 rounded"></div>
                <div className="w-10 h-6 bg-green-600 rounded"></div>
              </div>
            </div>
            
            {/* Guarantee */}
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-green-700">
                  30-day money-back guarantee • Secure checkout • 24/7 support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}