'use client'

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, TrendingUp, Clock, Star } from 'lucide-react'
import { useFiltersStore } from '@/stores/filters.store'
import { useRouter } from 'next/navigation'
import { mockProducts } from '@/lib/mock-data'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface AdvancedSearchProps {
  className?: string
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ className }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<{id: string, name: string, category: string, price: number}[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [trendingSearches, setTrendingSearches] = useState<string[]>(['wireless headphones', 'smart watch', 'laptop', 'phone case', 'gaming mouse'])
  const [isLoading, setIsLoading] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const { setSearchQuery } = useFiltersStore()
  const router = useRouter()

  // Load recent searches from localStorage
  useLayoutEffect(() => {
    const recent = localStorage.getItem('recentSearches')
    if (recent) {
      setRecentSearches(JSON.parse(recent))
    }
  }, [])

  // Handle search input
  useEffect(() => {
    if (query.length > 1) {
      setIsLoading(true)

      // Debounce search suggestions
      const timer = setTimeout(() => {
        const filteredProducts = mockProducts.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)

        setSuggestions(filteredProducts)
        setIsLoading(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
      setIsLoading(false)
    }
  }, [query])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      setSearchQuery(searchQuery.trim())

      // Add to recent searches
      const updatedRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updatedRecent)
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent))

      setShowSuggestions(false)
      setQuery('')
      router.push('/shop')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for products, brands, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="pr-12 pl-4 py-3 text-lg rounded-xl border-2 border-gray-200 focus:border-primary-500 transition-all duration-300 shadow-sm hover:shadow-md"
          />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-primary-50"
            disabled={!query.trim()}
          >
            <Search className="w-5 h-5 text-primary-600" />
          </Button>
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (query.length > 0 || recentSearches.length > 0 || trendingSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden"
          >
            {/* Loading State */}
            {isLoading && (
              <div className="p-4">
                <div className="animate-pulse space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && suggestions.length > 0 && (
              <div className="p-2">
                <div className="px-3 py-2 text-sm font-medium text-gray-500 border-b border-gray-100">
                  Products ({suggestions.length})
                </div>
                {suggestions.map((product) => (
                  <motion.button
                    key={product.id}
                    className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                    onClick={() => handleSearch(product.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{product.name}</div>
                      <div className="text-sm text-gray-500 truncate">{product.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary-600">${product.price}</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {product.rating}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && query.length > 1 && suggestions.length === 0 && (
              <div className="p-6 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <div className="font-medium text-gray-900 mb-1">No products found</div>
                <div className="text-sm text-gray-500">Try adjusting your search terms</div>
              </div>
            )}

            {/* Recent & Trending Searches */}
            {query.length === 0 && (
              <div className="p-2">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Recent Searches</span>
                      </div>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-400 hover:text-gray-600"
                      >
                        Clear
                      </button>
                    </div>
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={index}
                        className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                        onClick={() => handleSearch(search)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{search}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-500 border-t border-gray-100">
                    <TrendingUp className="w-4 h-4" />
                    <span>Trending Searches</span>
                  </div>
                  {trendingSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                      onClick={() => handleSearch(search)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{search}</span>
                      <div className="ml-auto text-xs text-primary-600 font-medium">
                        Popular
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}