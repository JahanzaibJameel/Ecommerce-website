// This would be the real API client for backend integration

import { ApiResponse, Product, FilterState, Order } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit & { params?: Record<string, string | number | boolean> } = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options
    let url = `${API_BASE_URL}${endpoint}`
    
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const paramString = searchParams.toString()
      if (paramString) {
        url += `?${paramString}`
      }
    }
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
    
    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include',
    }
    
    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }
  
  // Product endpoints
  products = {
    getAll: (params?: Partial<FilterState>) => 
      this.request<ApiResponse<Product[]>>('/products', { 
        params 
      }),
    
    getById: (id: string) => 
      this.request<ApiResponse<Product>>(`/products/${id}`),
    
    getByCategory: (category: string) => 
      this.request(`/products/category/${category}`),
  }
  
  // Cart endpoints
  cart = {
    get: () => this.request('/cart'),
    addItem: (productId: string, quantity: number) => 
      this.request('/cart/items', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      }),
    removeItem: (itemId: string) => 
      this.request(`/cart/items/${itemId}`, { method: 'DELETE' }),
    updateQuantity: (itemId: string, quantity: number) => 
      this.request(`/cart/items/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity }),
      }),
    clear: () => 
      this.request('/cart', { method: 'DELETE' }),
  }
  
  // Auth endpoints
  auth = {
    login: (email: string, password: string) =>
      this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    
    register: (userData: { email: string; password: string; name: string }) =>
      this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    
    logout: () =>
      this.request('/auth/logout', { method: 'POST' }),
    
    refresh: () =>
      this.request('/auth/refresh'),
  }
  
  // Order endpoints
  orders = {
    create: (orderData: Omit<Order, 'id' | 'status'>) =>
      this.request('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      }),
    
    getAll: () => this.request('/orders'),
    
    getById: (id: string) => this.request(`/orders/${id}`),
  }
}

export const apiClient = new ApiClient()