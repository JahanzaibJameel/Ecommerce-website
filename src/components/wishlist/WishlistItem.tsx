'use client'

import React from 'react'
import Image from 'next/image'
import { ShoppingCart, Trash2, Eye } from 'lucide-react'
import { Product } from '@/types'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/stores/cart.store'
import { useWishlistStore } from '@/stores/wishlist.store'
import { useUIStore } from '@/stores/ui.store'
import Link from 'next/link'

interface WishlistItemProps {
  product: Product
}

export const WishlistItem: React.FC<WishlistItemProps> = ({ product }) => {
  const { addItem } = useCartStore()
  const { removeItem } = useWishlistStore()
  const { addToast } = useUIStore()

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      maxQuantity: product.stock,
    })

    addToast({
      type: 'success',
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    })
  }

  const handleRemove = () => {
    removeItem(product.id)
    
    addToast({
      type: 'info',
      title: 'Removed from wishlist',
      description: `${product.name} removed from wishlist`,
      duration: 3000,
    })
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:border-gray-300 transition-colors group">
      {/* Image */}
      <div className="relative w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
          sizes="96px"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <Link
              href={`/shop/${product.id}`}
              className="font-medium text-gray-900 hover:text-primary-600 line-clamp-1"
            >
              {product.name}
            </Link>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          </div>
          
          <div className="text-lg font-bold">
            {formatPrice(product.price)}
          </div>
        </div>

        {/* Rating & Stock */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>
          
          <span className={`text-sm font-medium ${
            product.stock > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            
            <Link
              href={`/shop/${product.id}`}
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform border border-gray-300 hover:bg-gray-50 h-8 px-3 py-2 text-sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Link>
          </div>
          
          <button
            onClick={handleRemove}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove from wishlist"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}