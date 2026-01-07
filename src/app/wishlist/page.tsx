'use client'

import React from 'react'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useWishlistStore } from '@/stores/wishlist.store'
import { useCartStore } from '@/stores/cart.store'
import { Button } from '@/components/ui/Button'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Product } from '@/types'

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore()
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
  
  const handleAddAllToCart = () => {
    items.forEach((product) => {
      if (product.stock > 0) {
        handleAddToCart(product)
      }
    })
  }
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-red-400 fill-red-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your wishlist is empty
          </h1>
          
          <p className="text-gray-600 mb-8">
            Save items you love to your wishlist. Review them anytime and easily move them to your cart.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform bg-primary-600 text-white hover:bg-primary-700 h-10 px-4 py-2 w-full"
            >
              Browse Products
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Your Wishlist
          </h1>
          <p className="text-gray-600 mt-2">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
          
          <Button
            variant="primary"
            onClick={handleAddAllToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add All to Cart
          </Button>
        </div>
      </div>
      
      <ProductGrid products={items} />
    </div>
  )
}