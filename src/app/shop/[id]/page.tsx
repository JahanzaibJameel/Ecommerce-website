'use client'

import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Star, Truck, Shield, RefreshCw, 
  Heart, Share2, Check, Package,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/stores/cart.store'
import { useWishlistStore } from '@/stores/wishlist.store'
import { useUIStore } from '@/stores/ui.store'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { mockProducts } from '@/lib/mock-data'
import { ProductGrid } from '@/components/product/ProductGrid'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  
  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { addToast } = useUIStore()
  
  const [mounted, setMounted] = useState(false)
  
  useLayoutEffect(() => {
    setMounted(true)
  }, [])
  
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('black')
  
  const product = mockProducts.find(p => p.id === productId) || mockProducts[0]
  const discount = product.originalPrice 
    ? calculateDiscount(product.originalPrice, product.price)
    : null
  
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = [
    { name: 'Black', value: 'black', class: 'bg-gray-900' },
    { name: 'White', value: 'white', class: 'bg-gray-100 border' },
    { name: 'Blue', value: 'blue', class: 'bg-blue-600' },
    { name: 'Red', value: 'red', class: 'bg-red-600' },
  ]
  
  const features = [
    { icon: <Truck className="h-5 w-5" />, text: 'Free shipping worldwide' },
    { icon: <Package className="h-5 w-5" />, text: '30-day return policy' },
    { icon: <Shield className="h-5 w-5" />, text: '2-year warranty' },
    { icon: <RefreshCw className="h-5 w-5" />, text: 'Easy returns' },
  ]
  
  const images = [
    product.imageUrl,
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e',
  ]
  
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
  
  const handleWishlistToggle = () => {
    toggleItem(product)
    
    addToast({
      type: mounted && isInWishlist(product.id) ? 'info' : 'success',
      title: mounted && isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist',
      description: mounted && isInWishlist(product.id) 
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`,
      duration: 3000,
    })
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform bg-primary-600 text-white hover:bg-primary-700 h-10 px-4 py-2"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-primary-600">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category}`} className="hover:text-primary-600 capitalize">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          {/* Main Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Discount Badge */}
            {discount && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                  -{discount}%
                </span>
              </div>
            )}
            
            {/* Navigation Arrows */}
            <button
              onClick={() => setSelectedImage(prev => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setSelectedImage(prev => (prev + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index 
                    ? 'border-primary-600' 
                    : 'border-transparent hover:border-gray-300'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
              {product.category}
            </span>
            
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 mb-6">
            {product.description}
          </p>
          
          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-sm font-medium text-red-600">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              {product.stock > 0 ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-green-600 font-medium">
                    {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>
          </div>
          
          {/* Variants */}
          <div className="space-y-6 mb-8">
            {/* Colors */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-10 h-10 rounded-full ${color.class} flex items-center justify-center ${
                      selectedColor === color.value 
                        ? 'ring-2 ring-offset-2 ring-primary-600' 
                        : 'hover:ring-2 hover:ring-gray-300'
                    }`}
                    aria-label={color.name}
                  >
                    {selectedColor === color.value && (
                      <Check className="h-5 w-5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sizes */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-50"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                
                <div className="text-sm text-gray-500">
                  Max: {product.stock} units
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1"
              >
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlistToggle}
                className="flex-1"
              >
                <Heart className={`h-5 w-5 mr-2 ${
                  mounted && isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                }`} />
                {mounted && isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
            
            <Button
              variant="ghost"
              className="w-full"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share this product
            </Button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="text-primary-600">
                  {feature.icon}
                </div>
                <span className="text-sm text-gray-600">{feature.text}</span>
              </div>
            ))}
          </div>
          
          {/* SKU */}
          <div className="text-sm text-gray-500">
            SKU: {product.sku}
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b">
          <div className="flex space-x-8">
            <button className="py-4 border-b-2 border-primary-600 font-medium">
              Description
            </button>
            <button className="py-4 text-gray-500 hover:text-gray-700">
              Specifications
            </button>
            <button className="py-4 text-gray-500 hover:text-gray-700">
              Reviews ({product.reviewCount})
            </button>
            <button className="py-4 text-gray-500 hover:text-gray-700">
              Shipping & Returns
            </button>
          </div>
        </div>
        
        <div className="py-8">
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold mb-4">Product Details</h3>
            <p className="text-gray-600 mb-4">
              {product.description}
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>High-quality materials and construction</li>
              <li>Designed for durability and performance</li>
              <li>Backed by our 2-year warranty</li>
              <li>Environmentally friendly packaging</li>
              <li>Easy to use and maintain</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          You might also like
        </h2>
        <ProductGrid 
          products={mockProducts.filter(p => p.id !== productId).slice(0, 4)} 
        />
      </div>
    </div>
  )
}