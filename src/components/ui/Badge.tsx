import React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success'
  size?: 'sm' | 'md'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-semibold transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          
          // Variants
          variant === 'default' && 'bg-primary-100 text-primary-800',
          variant === 'secondary' && 'bg-gray-100 text-gray-800',
          variant === 'destructive' && 'bg-red-100 text-red-800',
          variant === 'outline' && 'border border-gray-300 text-gray-700',
          variant === 'success' && 'bg-green-100 text-green-800',
          
          // Sizes
          size === 'sm' && 'px-2 py-0.5 text-xs',
          size === 'md' && 'px-2.5 py-0.5 text-sm',
          
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }