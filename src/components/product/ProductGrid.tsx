import React from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { Product } from '@/types'
import { cn } from '@/lib/utils'

interface ProductGridProps {
  products: Product[]
  variant?: 'grid' | 'list'
  loading?: boolean
  className?: string
  emptyMessage?: string
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  variant = 'grid',
  loading = false,
  className,
  emptyMessage = 'No products found',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  if (loading) {
    return (
      <motion.div
        className={cn(
          variant === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4',
          className
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} variants={itemVariants}>
            <ProductCard
              product={{} as Product}
              isLoading
              variant={variant}
            />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  if (products.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </motion.div>
    )
  }
  
  return (
    <div className={cn(
      variant === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        : 'space-y-4',
      className
    )}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={variant}
        />
      ))}
    </div>
  )
}