'use client'

import React from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { FiltersSidebar } from '@/components/product/FiltersSidebar'
import { SortDropdown } from '@/components/product/SortDropdown'
import { useFiltersStore } from '@/stores/filters.store'
import { mockProducts } from '@/lib/mock-data'

export default function ShopPage() {
  const { category, priceRange, minRating, sortBy, searchQuery } = useFiltersStore()
  
  // Filter and sort products (in real app, this would be API call)
  const filteredProducts = React.useMemo(() => {
    let filtered = [...mockProducts]
    
    // Apply filters
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category)
    }
    
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    )
    
    if (minRating > 0) {
      filtered = filtered.filter(p => p.rating >= minRating)
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'rating-desc':
          return b.rating - a.rating
        default:
          return 0
      }
    })
    
    return filtered
  }, [category, priceRange, minRating, sortBy, searchQuery])
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className="lg:w-1/4">
        <FiltersSidebar />
      </div>
      
      {/* Products Grid */}
      <div className="lg:w-3/4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
            <p className="text-gray-600 mt-2">
              {filteredProducts.length} products found
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <SortDropdown />
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </div>
  )
}