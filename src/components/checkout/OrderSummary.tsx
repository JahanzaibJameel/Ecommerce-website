'use client'

import React from 'react'
import { Card } from '@/components/ui/Card'
import { formatPrice } from '@/lib/utils'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

interface OrderSummaryProps {
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  className?: string
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  className,
}) => {
  return (
    <Card className={className}>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        
        {/* Items */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {item.imageUrl && (
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                )}
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <span className="font-medium">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
              {shipping === 0 ? 'FREE' : formatPrice(shipping)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">{formatPrice(tax)}</span>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-700">
            Your order total includes all applicable taxes and shipping fees.
          </p>
        </div>
      </div>
    </Card>
  )
}