'use client'

import React from 'react'
import Image from 'next/image'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useUIStore } from '@/stores/ui.store'
import { useCartStore } from '@/stores/cart.store'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export const CartSidebar: React.FC = () => {
  const { isCartOpen, closeCart } = useUIStore()
  const { 
    items, 
    getTotal, 
    removeItem, 
    updateQuantity,
    clearCart 
  } = useCartStore()
  
  const total = getTotal()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  if (!isCartOpen) return null
  
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="h-6 w-6" />
            <h2 className="text-xl font-semibold">
              Your Cart ({itemCount})
            </h2>
          </div>
          
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Add some products to your cart
              </p>
              <Button
                variant="primary"
                onClick={closeCart}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                      sizes="80px"
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.price)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 rounded border disabled:opacity-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxQuantity}
                          className="p-1 rounded border disabled:opacity-50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <span className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Clear Cart Button */}
              {items.length > 0 && (
                <div className="pt-4 border-t">
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform bg-primary-600 text-white hover:bg-primary-700 h-10 px-4 py-2 w-full"
              >
                Proceed to Checkout
              </Link>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={closeCart}
              >
                Continue Shopping
              </Button>
            </div>
            
            <p className="text-center text-xs text-gray-500">
              Free shipping on orders over $50. Taxes calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </>
  )
}