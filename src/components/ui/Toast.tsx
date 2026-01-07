'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { useUIStore, ToastType } from '@/stores/ui.store'

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-green-400" />,
  error: <XCircle className="h-5 w-5 text-red-400" />,
  warning: <AlertCircle className="h-5 w-5 text-yellow-400" />,
  info: <Info className="h-5 w-5 text-blue-400" />,
}

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useUIStore()
  
  if (toasts.length === 0) return null
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex items-center w-full max-w-sm p-4 rounded-lg shadow-lg',
            'bg-white border transform transition-all duration-300',
            'animate-in slide-in-from-right'
          )}
          role="alert"
        >
          <div className="flex-shrink-0">{icons[toast.type]}</div>
          
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{toast.title}</p>
            {toast.description && (
              <p className="mt-1 text-sm text-gray-500">{toast.description}</p>
            )}
          </div>
          
          <button
            type="button"
            className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  )
}