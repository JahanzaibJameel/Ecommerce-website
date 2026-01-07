import React from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface RetryButtonProps {
  onClick: () => void
  className?: string
  label?: string
  loading?: boolean
}

export const RetryButton: React.FC<RetryButtonProps> = ({
  onClick,
  className,
  label = 'Retry',
  loading = false,
}) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={loading}
      className={cn('gap-2', className)}
    >
      <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
      {label}
    </Button>
  )
}