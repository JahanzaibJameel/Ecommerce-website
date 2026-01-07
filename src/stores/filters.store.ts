import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FilterCategory, SortOption, FilterState } from '@/types'

interface FiltersStore extends FilterState {
  // Actions
  setCategory: (category: FilterCategory) => void
  setPriceRange: (range: [number, number]) => void
  setMinRating: (rating: number) => void
  setSortBy: (sort: SortOption) => void
  setSearchQuery: (query: string) => void
  toggleInStockOnly: () => void
  toggleOnSaleOnly: () => void
  setTags: (tags: string[]) => void
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
  resetFilters: () => void
}

const initialState: FilterState = {
  category: 'all',
  priceRange: [0, 1000],
  minRating: 0,
  sortBy: 'name-asc',
  searchQuery: '',
  inStockOnly: false,
  onSaleOnly: false,
  tags: [],
}

export const useFiltersStore = create<FiltersStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      setCategory: (category) => set({ category }),
      setPriceRange: (priceRange) => set({ priceRange }),
      setMinRating: (minRating) => set({ minRating }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      toggleInStockOnly: () => set((state) => ({ inStockOnly: !state.inStockOnly })),
      toggleOnSaleOnly: () => set((state) => ({ onSaleOnly: !state.onSaleOnly })),
      setTags: (tags) => set({ tags }),
      addTag: (tag) => set((state) => ({ 
        tags: state.tags.includes(tag) ? state.tags : [...state.tags, tag] 
      })),
      removeTag: (tag) => set((state) => ({ 
        tags: state.tags.filter(t => t !== tag) 
      })),
      resetFilters: () => set(initialState),
    }),
    {
      name: 'filters-storage',
      partialize: (state) => ({
        category: state.category,
        priceRange: state.priceRange,
        minRating: state.minRating,
        sortBy: state.sortBy,
        inStockOnly: state.inStockOnly,
        onSaleOnly: state.onSaleOnly,
        tags: state.tags,
      }),
    }
  )
)