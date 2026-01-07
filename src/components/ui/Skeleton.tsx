import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
      {...props}
    />
  )
}

// Pre-built skeleton components
export const ProductCardSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
    <div className="h-6 bg-gray-200 rounded w-1/4" />
  </div>
)

export const CategoryCardSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
  </div>
)

export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1, 
  className 
}) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={cn('h-4 bg-gray-200 rounded', className)}
        style={{ width: i === lines - 1 ? '80%' : '100%' }}
      />
    ))}
  </div>
)