'use client'

import React from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/stores/cart.store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface CartItemProps {
  item: {
    id: string
    productId: string
    name: string
    price: number
    imageUrl: string
    quantity: number
    maxQuantity: number
  }
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore()
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.id)
    } else if (newQuantity > item.maxQuantity) {
      return
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }
  
  const totalPrice = item.price * item.quantity
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-xl hover:border-gray-300 transition-colors">
      {/* Image */}
      <div className="relative w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover rounded-lg"
          sizes="96px"
        />
      </div>
      
      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="space-y-1">
            <Link
              href={`/product/${item.productId}`}
              className="font-medium text-gray-900 hover:text-primary-600 line-clamp-1"
            >
              {item.name}
            </Link>
            <p className="text-sm text-gray-500">
              Price: {formatPrice(item.price)}
            </p>
            <p className="text-sm text-green-600">
              In Stock
            </p>
          </div>
          
          <div className="text-lg font-bold">
            {formatPrice(totalPrice)}
          </div>
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              
              <span className="w-8 text-center font-medium">
                {item.quantity}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= item.maxQuantity}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <button
              onClick={() => removeItem(item.id)}
              className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              <span>Remove</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            Max: {item.maxQuantity}
          </div>
        </div>
      </div>
    </div>
  )
}