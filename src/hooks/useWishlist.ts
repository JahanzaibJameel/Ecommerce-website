import { useWishlistStore } from '@/stores/wishlist.store'

export const useWishlist = () => {
  const store = useWishlistStore()
  
  return {
    items: store.items,
    addItem: store.addItem,
    removeItem: store.removeItem,
    clearWishlist: store.clearWishlist,
    isInWishlist: store.isInWishlist,
    toggleItem: store.toggleItem,
  }
}

export const useWishlistCount = () => {
  return useWishlistStore((state) => state.items.length)
}