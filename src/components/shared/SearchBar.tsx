'use client'

import React, { useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { debounce } from '@/lib/utils'

interface SearchBarProps {
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search products...',
  className,
  autoFocus = false,
}) => {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = useCallback(
    (searchQuery: string) => {
      const debouncedSearch = debounce(() => {
        if (searchQuery.trim()) {
          router.push(`/shop?search=${encodeURIComponent(searchQuery)}`)
        }
      }, 300)
      debouncedSearch()
    },
    [router]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    handleSearch(value)
  }

  const handleClear = () => {
    setQuery('')
    router.push('/shop')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          className="pl-10 pr-10"
          autoFocus={autoFocus}
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  )
}