'use client'

import React from 'react'
import { Filter } from 'lucide-react'
import { useFiltersStore } from '@/stores/filters.store'
import { cn } from '@/lib/utils'
import { FilterCategory } from '@/types'
import { Slider } from '@/components/ui/Slider'

export const FiltersSidebar: React.FC = () => {
  const {
    category,
    priceRange,
    minRating,
    inStockOnly,
    onSaleOnly,
    setCategory,
    setPriceRange,
    setMinRating,
    toggleInStockOnly,
    toggleOnSaleOnly,
    resetFilters,
  } = useFiltersStore()
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'books', name: 'Books' },
    { id: 'home', name: 'Home & Garden' },
  ]
  
  const ratings = [4, 3, 2, 1]
  
  const hasActiveFilters = 
    category !== 'all' ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000 ||
    minRating > 0 ||
    inStockOnly ||
    onSaleOnly
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear all
          </button>
        )}
      </div>
      
      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id as FilterCategory)}
              className={cn(
                "block w-full text-left px-3 py-2 rounded-lg transition-colors",
                category === cat.id
                  ? "bg-primary-50 text-primary-700"
                  : "hover:bg-gray-50"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          max={1000}
          min={0}
          step={10}
        />
      </div>
      
      {/* Minimum Rating */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">Minimum Rating</h4>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(minRating === rating ? 0 : rating)}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors w-full",
                minRating === rating
                  ? "bg-yellow-50 text-yellow-700"
                  : "hover:bg-gray-50"
              )}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm">
                {rating}+ Stars
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Toggle Filters */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Availability</h4>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={toggleInStockOnly}
                className="sr-only"
              />
              <div className={cn(
                "block w-10 h-6 rounded-full transition-colors",
                inStockOnly ? "bg-green-500" : "bg-gray-300"
              )}>
                <div className={cn(
                  "absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform",
                  inStockOnly && "transform translate-x-4"
                )} />
              </div>
            </div>
            <span className="text-sm text-gray-700">In Stock Only</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={toggleOnSaleOnly}
                className="sr-only"
              />
              <div className={cn(
                "block w-10 h-6 rounded-full transition-colors",
                onSaleOnly ? "bg-red-500" : "bg-gray-300"
              )}>
                <div className={cn(
                  "absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform",
                  onSaleOnly && "transform translate-x-4"
                )} />
              </div>
            </div>
            <span className="text-sm text-gray-700">On Sale Only</span>
          </label>
        </div>
      </div>
    </div>
  )
}