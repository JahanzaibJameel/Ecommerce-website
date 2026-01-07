import { useFiltersStore } from '@/stores/filters.store'

export const useFilters = () => {
  const store = useFiltersStore()
  
  return {
    category: store.category,
    priceRange: store.priceRange,
    minRating: store.minRating,
    sortBy: store.sortBy,
    searchQuery: store.searchQuery,
    inStockOnly: store.inStockOnly,
    onSaleOnly: store.onSaleOnly,
    setCategory: store.setCategory,
    setPriceRange: store.setPriceRange,
    setMinRating: store.setMinRating,
    setSortBy: store.setSortBy,
    setSearchQuery: store.setSearchQuery,
    toggleInStockOnly: store.toggleInStockOnly,
    toggleOnSaleOnly: store.toggleOnSaleOnly,
    resetFilters: store.resetFilters,
  }
}

export const useActiveFilters = () => {
  return useFiltersStore((state) => ({
    hasActiveFilters: 
      state.category !== 'all' ||
      state.priceRange[0] > 0 ||
      state.priceRange[1] < 1000 ||
      state.minRating > 0 ||
      state.inStockOnly ||
      state.onSaleOnly ||
      state.searchQuery !== '',
    
    filterCount: 
      (state.category !== 'all' ? 1 : 0) +
      (state.priceRange[0] > 0 || state.priceRange[1] < 1000 ? 1 : 0) +
      (state.minRating > 0 ? 1 : 0) +
      (state.inStockOnly ? 1 : 0) +
      (state.onSaleOnly ? 1 : 0) +
      (state.searchQuery !== '' ? 1 : 0),
  }))
}