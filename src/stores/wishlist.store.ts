import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  toggleItem: (product: Product) => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        set((state) => {
          if (state.items.some((item) => item.id === product.id)) {
            return state
          }
          return { items: [...state.items, product] }
        })
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },
      
      clearWishlist: () => set({ items: [] }),
      
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId)
      },
      
      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
        
        // Analytics event
        window.dispatchEvent(new CustomEvent('analytics-event', {
          detail: { 
            type: 'wishlist_toggle', 
            productId: product.id,
            action: get().isInWishlist(product.id) ? 'add' : 'remove'
          }
        }))
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
)