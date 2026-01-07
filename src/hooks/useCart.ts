import { useCartStore } from '@/stores/cart.store'

export const useCart = () => {
  const store = useCartStore()
  
  return {
    items: store.items,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    getTotal: store.getTotal,
    getItemCount: store.getItemCount,
    isInCart: store.isInCart,
    getItem: store.getItem,
  }
}

export const useCartItemCount = () => {
  return useCartStore((state) => 
    state.items.reduce((count, item) => count + item.quantity, 0)
  )
}

export const useCartTotal = () => {
  return useCartStore((state) => 
    state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  )
}