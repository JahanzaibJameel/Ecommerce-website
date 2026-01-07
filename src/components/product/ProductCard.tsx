'use client'

import React, { useState, useEffect, useLayoutEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn, formatPrice, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/stores/cart.store'
import { useWishlistStore } from '@/stores/wishlist.store'
import { useUIStore } from '@/stores/ui.store'
import { ProductCardProps, PRODUCT_CARD_DEFAULTS } from './ProductCard.contracts'

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = PRODUCT_CARD_DEFAULTS.variant,
  onAddToCart,
  onWishlistToggle,
  onQuickView,
  isInCart: externalIsInCart,
  isInWishlist: externalIsInWishlist,
  isLoading = false,
  className,
  showActions = PRODUCT_CARD_DEFAULTS.showActions,
  showRating = PRODUCT_CARD_DEFAULTS.showRating,
  showDescription = PRODUCT_CARD_DEFAULTS.showDescription,
  ...props
}) => {
  const { addItem, isInCart: cartIsInCart } = useCartStore()
  const { isInWishlist: wishlistIsInWishlist, toggleItem } = useWishlistStore()
  const { addToast } = useUIStore()
  
  const [mounted, setMounted] = useState(false)
  
  useLayoutEffect(() => {
    setMounted(true)
  }, [])
  
  const isInCart = externalIsInCart ?? cartIsInCart(product.id)
  const isInWishlist = mounted ? (externalIsInWishlist ?? wishlistIsInWishlist(product.id)) : false
  
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
    
    onAddToCart?.(product.id)
  }
  
  const handleWishlistToggle = () => {
    toggleItem(product)
    
    addToast({
      type: isInWishlist ? 'info' : 'success',
      title: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      description: isInWishlist 
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`,
      duration: 3000,
    })
    
    onWishlistToggle?.(product.id)
  }
  
  const handleQuickView = () => {
    onQuickView?.(product.id)
  }
  
  if (isLoading) {
    return <ProductCardSkeleton variant={variant} />
  }
  
  const discount = product.originalPrice 
    ? calculateDiscount(product.originalPrice, product.price)
    : null
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.div
      className={cn(
        'group relative bg-white rounded-2xl border border-gray-100',
        'transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10',
        'hover:border-primary-200 overflow-hidden',
        variant === 'grid' && 'flex flex-col',
        variant === 'list' && 'flex flex-row',
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -8,
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      {/* Image Container */}
      <div className={cn(
        'relative overflow-hidden bg-gray-50',
        variant === 'grid' && 'aspect-square',
        variant === 'list' && 'w-48 h-48 flex-shrink-0'
      )}>
        <motion.div
          className="w-full h-full relative"
          variants={imageVariants}
          whileHover="hover"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Overlay with actions */}
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          variants={overlayVariants}
          initial="hidden"
          whileHover="visible"
        >
          <div className="flex gap-3">
            <motion.button
              onClick={handleAddToCart}
              className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-primary-600 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isLoading}
            >
              <ShoppingCart className="h-5 w-5" />
            </motion.button>

            <motion.button
              onClick={handleQuickView}
              className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Discount Badge */}
        {discount && (
          <motion.div
            className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            -{discount}%
          </motion.div>
        )}

        {/* Stock Status */}
        {product.stock < 10 && product.stock > 0 && (
          <motion.div
            className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            Only {product.stock} left
          </motion.div>
        )}

        {product.stock === 0 && (
          <motion.div
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 shadow-sm hover:bg-white"
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={cn(
            'h-5 w-5 transition-colors',
            isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'
          )}
        />
      </button>
      
      {/* Product Image */}
      <div className={cn(
        'overflow-hidden bg-gray-100',
        variant === 'grid' && 'aspect-square rounded-t-lg',
        variant === 'list' && 'w-32 h-32 rounded-l-lg'
      )} style={{ position: 'relative' }}>
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleQuickView}
            className="bg-white/90 hover:bg-white"
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">Quick View</span>
          </Button>
          
          <Button
            size="sm"
            variant="primary"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to Cart</span>
          </Button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className={cn(
        'p-4 flex flex-col flex-1',
        variant === 'list' && 'flex-1'
      )}>
        {/* Category */}
        <div className="mb-1">
          <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        
        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-900 hover:text-primary-600 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        {/* Description */}
        {showDescription && variant !== 'compact' && (
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Rating */}
        {showRating && product.rating > 0 && (
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  )}
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
        )}
        
        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Stock Status */}
        <div className="mt-2">
          <span className={cn(
            'text-xs font-medium',
            product.stock > 10 ? 'text-green-600' : 
            product.stock > 0 ? 'text-yellow-600' : 
            'text-red-600'
          )}>
            {product.stock > 10 ? 'In Stock' : 
             product.stock > 0 ? `Only ${product.stock} left` : 
             'Out of Stock'}
          </span>
        </div>
        
        {/* Actions */}
        {showActions && variant !== 'compact' && (
          <div className="mt-4 flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const ProductCardSkeleton: React.FC<{ variant?: 'grid' | 'list' | 'compact' }> = ({ variant = 'grid' }) => {
  return (
    <div className={cn(
      'animate-pulse bg-gray-100 rounded-lg border border-gray-200',
      variant === 'grid' && 'flex flex-col',
      variant === 'list' && 'flex flex-row'
    )}>
      <div className={cn(
        'bg-gray-200',
        variant === 'grid' && 'aspect-square rounded-t-lg',
        variant === 'list' && 'w-32 h-32 rounded-l-lg'
      )} />
      
      <div className="p-4 flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="mt-4 h-8 bg-gray-200 rounded" />
      </div>
    </div>
  )
}