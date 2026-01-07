import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
}

interface UIStore {
  // Modal states
  isCartOpen: boolean
  isWishlistOpen: boolean
  isSearchOpen: boolean
  isMobileMenuOpen: boolean
  
  // Toast system
  toasts: Toast[]
  
  // Actions
  openCart: () => void
  closeCart: () => void
  openWishlist: () => void
  closeWishlist: () => void
  toggleMobileMenu: () => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isWishlistOpen: false,
  isSearchOpen: false,
  isMobileMenuOpen: false,
  toasts: [],
  
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  openWishlist: () => set({ isWishlistOpen: true }),
  closeWishlist: () => set({ isWishlistOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  
  addToast: (toast) => {
    const id = crypto.randomUUID()
    set((state) => ({ 
      toasts: [...state.toasts, { ...toast, id }] 
    }))
    
    // Auto remove toast after duration
    if (toast.duration) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      }, toast.duration)
    }
  },
  
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },
  
  clearToasts: () => set({ toasts: [] }),
}))