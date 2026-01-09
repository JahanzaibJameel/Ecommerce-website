'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn, Heart, Share2 } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
  isWishlisted?: boolean
  onWishlistToggle?: () => void
  onShare?: () => void
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  isWishlisted = false,
  onWishlistToggle,
  onShare
}) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
    setImageLoaded(false)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
    setImageLoaded(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setZoomPosition({ x, y })
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <>
      <div className="relative group">
        {/* Main Image Container */}
        <motion.div
          className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[selectedImage]}
                alt={`${productName} - Image ${selectedImage + 1}`}
                fill
                className="object-cover cursor-zoom-in"
                onLoad={handleImageLoad}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority={selectedImage === 0}
              />

              {/* Loading Skeleton */}
              <AnimatePresence>
                {!imageLoaded && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
                  />
                )}
              </AnimatePresence>

              {/* Zoom Indicator */}
              <motion.div
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Zoom Lens Effect */}
          <AnimatePresence>
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url(${images[selectedImage]})`,
                  backgroundSize: '200%',
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundRepeat: 'no-repeat'
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={prevImage}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={nextImage}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>
          </>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 left-4 flex gap-2">
          <motion.button
            className={`p-3 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
            onClick={onWishlistToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </motion.button>

          <motion.button
            className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 shadow-lg hover:bg-white transition-all duration-300"
            onClick={onShare}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Share product"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <motion.button
                key={index}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedImage === index
                    ? 'border-primary-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedImage(index)
                  setImageLoaded(false)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}