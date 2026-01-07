'use client'

import React from 'react'
import Image from 'next/image'
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { useUIStore } from '@/stores/ui.store'
import { useWishlistStore } from '@/stores/wishlist.store'
import { useCartStore } from '@/stores/cart.store'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types'

export const WishlistSidebar: React.FC = () => {
  const { isWishlistOpen, closeWishlist } = useUIStore()
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const { addItem } = useCartStore()
  
  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      maxQuantity: product.stock,
    })
  }
  
  const handleMoveAllToCart = () => {
    items.forEach((product) => {
      if (product.stock > 0) {
        addItem({
          productId: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          maxQuantity: product.stock,
        })
      }
    })
  }
  
  if (!isWishlistOpen) return null
  
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeWishlist}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            <h2 className="text-xl font-semibold">
              Wishlist ({items.length})
            </h2>
          </div>
          
          <button
            onClick={closeWishlist}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close wishlist"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Save items you like to your wishlist
              </p>
              <Button
                variant="primary"
                onClick={closeWishlist}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="flex items-start space-x-4 p-4 border rounded-lg group"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                      sizes="80px"
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900 line-clamp-1">
                        {product.name}
                      </h3>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {formatPrice(product.price)}
                    </p>
                    
                    {/* Stock Status */}
                    <div className="mt-2">
                      <span className={product.stock > 0 
                        ? "text-green-600 text-xs font-medium" 
                        : "text-red-600 text-xs font-medium"
                      }>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex space-x-2 mt-3">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="flex-1"
                      >
                        <ShoppingCart className="h-3 w-3 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Clear Button */}
              {items.length > 0 && (
                <div className="pt-4 border-t">
                  <Button
                    variant="ghost"
                    onClick={clearWishlist}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Wishlist
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <Button
              variant="primary"
              className="w-full"
              onClick={handleMoveAllToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add All to Cart
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={closeWishlist}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  )
}