// Core types for the application
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  imageUrl: string
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  stock: number
  sku: string
  createdAt: Date
  features?: string[]
  specifications?: Record<string, string>
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  maxQuantity: number
  variant?: {
    color?: string
    size?: string
  }
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isGuest: boolean
  createdAt?: Date
  lastLogin?: Date
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: ShippingAddress
  billingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  createdAt: Date
  updatedAt: Date
  trackingNumber?: string
  estimatedDelivery?: Date
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
  variant?: {
    color?: string
    size?: string
  }
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  email?: string
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple-pay'
  last4?: string
  brand?: string
  expiry?: string
}

export type SortOption = 
  | 'price-asc' 
  | 'price-desc' 
  | 'name-asc' 
  | 'name-desc' 
  | 'rating-desc'
  | 'date-desc'
  | 'popularity'

export type FilterCategory = 'all' | 'electronics' | 'clothing' | 'books' | 'home' | 'sports'

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: Pagination
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: Date
  verifiedPurchase: boolean
  helpful: number
  notHelpful: number
}

export interface Category {
  id: string
  name: string
  description?: string
  imageUrl?: string
  productCount: number
  parentId?: string
}

export interface Promotion {
  id: string
  code: string
  type: 'percentage' | 'fixed' | 'shipping'
  value: number
  minPurchase?: number
  validFrom: Date
  validUntil: Date
  usageLimit?: number
  usedCount: number
}

// Filter state
export interface FilterState {
  category: FilterCategory
  priceRange: [number, number]
  minRating: number
  sortBy: SortOption
  searchQuery: string
  inStockOnly: boolean
  onSaleOnly: boolean
  tags: string[]
}

// UI state
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  duration?: number
}

// Analytics events
export interface AnalyticsEvent {
  type: string
  data: Record<string, unknown>
  timestamp: Date
  userId?: string
  sessionId: string
}