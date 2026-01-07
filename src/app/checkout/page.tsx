'use client'

import React, { useState } from 'react'
import { Lock, Shield, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/stores/cart.store'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  })
  
  const subtotal = getTotal()
  const shipping = 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Simulate order placement
      alert('Order placed successfully! (This is a demo)')
      clearCart()
    }
  }
  
  if (items.length === 0 && step !== 4) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          
          <p className="text-gray-600 mb-8">
            Add some items to your cart before checkout.
          </p>
          
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform bg-primary-600 text-white hover:bg-primary-700 h-10 px-4 py-2 w-full"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${step >= stepNumber 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-400'
                  }
                `}>
                  {stepNumber}
                </div>
                
                {stepNumber < 3 && (
                  <div className={`
                    w-24 h-1 mx-4
                    ${step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium text-primary-600">Information</span>
            <span className="text-sm font-medium text-gray-400">Shipping</span>
            <span className="text-sm font-medium text-gray-400">Payment</span>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-white border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Contact Information
                    </h2>
                    
                    <div className="space-y-4">
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                        
                        <Input
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Shipping Address
                    </h2>
                    
                    <div className="space-y-4">
                      <Input
                        label="Address"
                        name="address"
                        placeholder="123 Main St"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                        
                        <Input
                          label="State"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="ZIP Code"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                        
                        <Input
                          label="Country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="bg-white border rounded-xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Shipping Method
                  </h2>
                  
                  <div className="space-y-4">
                    {[
                      { id: 'standard', name: 'Standard Shipping', price: 9.99, days: '5-7 business days' },
                      { id: 'express', name: 'Express Shipping', price: 19.99, days: '2-3 business days' },
                      { id: 'overnight', name: 'Overnight Shipping', price: 29.99, days: '1 business day' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-primary-500"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            className="text-primary-600"
                          />
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-gray-500">{method.days}</div>
                          </div>
                        </div>
                        <div className="font-bold">{formatPrice(method.price)}</div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="bg-white border rounded-xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Payment Information
                  </h2>
                  
                  <div className="space-y-4">
                    <Input
                      label="Card Number"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        required
                      />
                      
                      <Input
                        label="CVC"
                        name="cardCVC"
                        placeholder="123"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-yellow-600" />
                      <p className="text-sm text-yellow-700">
                        Your payment information is encrypted and secure.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                
                <Button
                  type="submit"
                  variant="primary"
                  className="ml-auto"
                >
                  {step === 3 ? 'Place Order' : 'Continue'}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 space-y-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>
              
              {/* Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{formatPrice(shipping)}</span>
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
              
              {/* Security Badge */}
              <div className="p-4 bg-primary-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-primary-900">
                      Secure Checkout
                    </p>
                    <p className="text-xs text-primary-700">
                      Your information is protected by 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Return Policy */}
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">30-Day Return Policy</p>
                <p>If you&apos;re not satisfied, return your purchase within 30 days for a full refund.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}