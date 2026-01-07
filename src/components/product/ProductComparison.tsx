'use client'

import React, { useState, useEffect, useLayoutEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Star, Heart, ShoppingCart, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useUIStore } from '@/stores/ui.store'
import { useCartStore } from '@/stores/cart.store'
import { useWishlistStore } from '@/stores/wishlist.store'
import { Product } from '@/types'

interface ProductComparisonProps {
  products: Product[]
  onClose: () => void
  onRemoveProduct: (productId: string) => void
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({
  products,
  onClose,
  onRemoveProduct
}) => {
  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { addToast } = useUIStore()
  
  const [mounted, setMounted] = useState(false)
  
  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      maxQuantity: 10
    })
    addToast({
      type: 'success',
      title: 'Added to cart',
      description: `${product.name} added to your cart`,
      duration: 3000
    })
  }

  const handleWishlistToggle = (product: Product) => {
    toggleItem(product)
    addToast({
      type: mounted && isInWishlist(product.id) ? 'info' : 'success',
      title: mounted && isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist',
      description: mounted && isInWishlist(product.id)
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`,
      duration: 3000
    })
  }

  // Get all unique specifications across products
  const allSpecs = Array.from(
    new Set(products.flatMap(product => Object.keys(product.specifications ?? {})))
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Product Comparison</h2>
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                {products.length} products
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Product Headers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-50 rounded-xl p-4 relative group"
                  >
                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onRemoveProduct(product.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>

                    {/* Product Image */}
                    <div className="aspect-square bg-white rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Stock Status */}
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className={`text-sm ${
                          product.stock > 0 ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock <= 0}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart className={`w-4 h-4 ${
                            mounted && isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                          }`} />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Specifications Comparison */}
              {allSpecs.length > 0 && (
                <div className="border-t border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-700 w-48">
                            Specification
                          </th>
                          {products.map((product) => (
                            <th key={product.id} className="text-center py-3 px-4 font-medium text-gray-700 min-w-48">
                              {product.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {allSpecs.map((spec) => (
                          <tr key={spec} className="border-b border-gray-100">
                            <td className="py-3 px-4 font-medium text-gray-900 capitalize">
                              {spec.replace(/([A-Z])/g, ' $1').trim()}
                            </td>
                            {products.map((product) => (
                              <td key={product.id} className="py-3 px-4 text-center text-gray-700">
                                {product.specifications?.[spec] || '-'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Features Comparison */}
              <div className="border-t border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="space-y-2">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <ul className="space-y-1">
                        {product.features?.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}