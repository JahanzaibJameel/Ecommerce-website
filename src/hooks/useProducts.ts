import { useQuery } from '@tanstack/react-query'
import { mockProducts } from '@/lib/mock-data'
import { simulateNetwork } from '@/lib/mock-delay'

export const useProducts = (options?: {
  category?: string
  limit?: number
  enabled?: boolean
}) => {
  return useQuery({
    queryKey: ['products', options],
    queryFn: async () => {
      // Simulate network delay and potential failure
      return simulateNetwork.fetchWithDelay(mockProducts)
    },
    enabled: options?.enabled ?? true,
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const product = mockProducts.find(p => p.id === id)
      
      if (!product) {
        throw new Error('Product not found')
      }
      
      return simulateNetwork.fetchWithDelay(product)
    },
  })
}

export const useRelatedProducts = (productId: string, limit = 4) => {
  return useQuery({
    queryKey: ['related-products', productId],
    queryFn: async () => {
      const product = mockProducts.find(p => p.id === productId)
      
      if (!product) {
        return []
      }
      
      // Find products in same category
      const related = mockProducts
        .filter(p => p.id !== productId && p.category === product.category)
        .slice(0, limit)
      
      return simulateNetwork.fetchWithDelay(related)
    },
  })
}