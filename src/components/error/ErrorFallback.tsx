import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ErrorFallbackProps {
  error?: Error
  resetError?: () => void
  className?: string
  title?: string
  message?: string
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  className,
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
}) => {
  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <div className={cn('min-h-[400px] flex items-center justify-center p-4', className)}>
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {resetError && (
            <Button
              variant="primary"
              onClick={resetError}
              icon={<RefreshCw className="h-4 w-4" />}
            >
              Try Again
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={handleGoHome}
            icon={<Home className="h-4 w-4" />}
          >
            Go Home
          </Button>
        </div>
        
        {error && process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-red-50 rounded-lg text-left">
            <pre className="text-xs text-red-800 overflow-auto">
              {error.message}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}