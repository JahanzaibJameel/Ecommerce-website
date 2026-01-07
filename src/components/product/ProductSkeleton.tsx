import React from 'react'
import { cn } from '@/lib/utils'

interface ProductSkeletonProps {
  variant?: 'grid' | 'list' | 'compact'
  count?: number
}

export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({
  variant = 'grid',
  count = 1,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'animate-pulse bg-gray-100 rounded-lg border border-gray-200',
            variant === 'grid' && 'flex flex-col',
            variant === 'list' && 'flex flex-row'
          )}
        >
          <div className={cn(
            'bg-gray-200',
            variant === 'grid' && 'aspect-square rounded-t-lg',
            variant === 'list' && 'w-32 h-32 rounded-l-lg'
          )} />
          
          <div className="p-4 flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-8 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </>
  )
}