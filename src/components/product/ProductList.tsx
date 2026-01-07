import React from 'react'
import { ProductCard } from './ProductCard'
import { Product } from '@/types'
import { cn } from '@/lib/utils'

interface ProductListProps {
  products: Product[]
  className?: string
  loading?: boolean
  emptyMessage?: string
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  className,
  loading = false,
  emptyMessage = 'No products found',
}) => {
  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex space-x-4 p-4 border rounded-lg">
              <div className="w-24 h-24 bg-gray-200 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-6 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant="list"
        />
      ))}
    </div>
  )
}