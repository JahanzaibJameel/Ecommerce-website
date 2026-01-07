'use client'

import React, { useState } from 'react'
import { ChevronDown, ArrowUpDown, DollarSign, Star, AArrowDown } from 'lucide-react'
import { useFiltersStore } from '@/stores/filters.store'
import { cn } from '@/lib/utils'
import { SortOption } from '@/types'

export const SortDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { sortBy, setSortBy } = useFiltersStore()
  
  const sortOptions = [
    {
      id: 'name-asc',
      label: 'Name: A to Z',
      icon: <AArrowDown className="h-4 w-4" />,
    },
    {
      id: 'name-desc',
      label: 'Name: Z to A',
      icon: <AArrowDown className="h-4 w-4 rotate-180" />,
    },
    {
      id: 'price-asc',
      label: 'Price: Low to High',
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      id: 'price-desc',
      label: 'Price: High to Low',
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      id: 'rating-desc',
      label: 'Highest Rated',
      icon: <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />,
    },
  ]
  
  const selectedOption = sortOptions.find(opt => opt.id === sortBy) || sortOptions[0]
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 px-4 py-2 border rounded-lg",
          "hover:bg-gray-50 transition-colors min-w-[200px] justify-between"
        )}
      >
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Sort by: {selectedOption.label}</span>
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 text-gray-500 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-1 w-full bg-white border rounded-lg shadow-lg z-20">
            <div className="py-1">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSortBy(option.id as SortOption)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "flex items-center space-x-3 w-full px-4 py-2 text-left",
                    "hover:bg-gray-50 transition-colors",
                    sortBy === option.id && "bg-primary-50 text-primary-700"
                  )}
                >
                  <div className="text-gray-500">
                    {option.icon}
                  </div>
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}