'use client'

import React from 'react'
import { CreditCard, Wallet, Apple } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

type PaymentMethod = 'card' | 'paypal' | 'apple-pay'

interface PaymentMethodsProps {
  selectedMethod?: PaymentMethod
  onSelect?: (method: PaymentMethod) => void
  className?: string
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selectedMethod = 'card',
  onSelect,
  className,
}) => {
  const methods = [
    {
      id: 'card' as PaymentMethod,
      name: 'Credit Card',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Pay with your credit or debit card',
    },
    {
      id: 'paypal' as PaymentMethod,
      name: 'PayPal',
      icon: <Wallet className="h-5 w-5" />,
      description: 'Pay securely with your PayPal account',
    },
    {
      id: 'apple-pay' as PaymentMethod,
      name: 'Apple Pay',
      icon: <Apple className="h-5 w-5" />,
      description: 'Pay with Apple Pay',
    },
  ]

  return (
    <Card className={className}>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        
        <div className="space-y-3">
          {methods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect?.(method.id)}
              className={cn(
                'flex items-center justify-between w-full p-4 border rounded-lg',
                'hover:border-primary-500 transition-colors',
                selectedMethod === method.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300'
              )}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  'p-2 rounded-lg',
                  selectedMethod === method.id
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-gray-100 text-gray-600'
                )}>
                  {method.icon}
                </div>
                <div className="text-left">
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
              
              <div className={cn(
                'w-5 h-5 border-2 rounded-full',
                selectedMethod === method.id
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-gray-300'
              )}>
                {selectedMethod === method.id && (
                  <div className="w-2 h-2 bg-white rounded-full m-auto" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </Card>
  )
}