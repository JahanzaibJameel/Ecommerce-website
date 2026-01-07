import { Product } from '@/types'

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Noise-cancelling wireless headphones with 30hr battery',
    price: 199.99,
    originalPrice: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'electronics',
    tags: ['wireless', 'audio', 'premium'],
    rating: 4.5,
    reviewCount: 234,
    stock: 25,
    sku: 'WH-1000XM4',
    createdAt: new Date('2023-10-01'),
  },
  {
    id: 'prod_2',
    name: 'Premium Cotton T-Shirt',
    description: '100% organic cotton, comfortable fit',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    category: 'clothing',
    tags: ['cotton', 'basic', 'casual'],
    rating: 4.2,
    reviewCount: 89,
    stock: 0,
    sku: 'TS-COT-001',
    createdAt: new Date('2023-09-15'),
  },
  {
    id: 'prod_3',
    name: 'Programming Book Bundle',
    description: 'Complete guide to modern web development',
    price: 49.99,
    originalPrice: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
    category: 'books',
    tags: ['programming', 'education', 'bundle'],
    rating: 4.8,
    reviewCount: 156,
    stock: 12,
    sku: 'BK-PRG-2023',
    createdAt: new Date('2023-11-05'),
  },
  // Add more mock products...
]

export const mockCategories = [
  { id: 'electronics', name: 'Electronics', count: 45 },
  { id: 'clothing', name: 'Clothing', count: 120 },
  { id: 'books', name: 'Books', count: 89 },
  { id: 'home', name: 'Home & Garden', count: 67 },
]