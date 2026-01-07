'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface CheckoutData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  cardNumber: string
  cardExpiry: string
  cardCVC: string
}

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void
  className?: string
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  className,
}) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {/* Contact Information */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
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
          </div>
        </div>
      </Card>

      {/* Shipping Address */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
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
      </Card>

      {/* Payment Information */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
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
        </div>
      </Card>

      <Button type="submit" variant="primary" className="w-full">
        Place Order
      </Button>
    </form>
  )
}