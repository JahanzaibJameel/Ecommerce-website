'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropdownItem {
  label: string
  value: string
  icon?: React.ReactNode
}

interface DropdownProps {
  items: DropdownItem[]
  value?: string
  onSelect?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  value,
  onSelect,
  placeholder = 'Select an option',
  className,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedItem = items.find(item => item.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (item: DropdownItem) => {
    onSelect?.(item.value)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex items-center justify-between w-full px-3 py-2 text-left',
          'border border-gray-300 rounded-lg bg-white',
          'hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500',
          'disabled:bg-gray-100 disabled:cursor-not-allowed',
          className
        )}
      >
        <div className="flex items-center gap-2">
          {selectedItem?.icon}
          <span className={selectedItem ? 'text-gray-900' : 'text-gray-500'}>
            {selectedItem?.label || placeholder}
          </span>
        </div>
        <ChevronDown className={cn(
          'h-4 w-4 text-gray-500 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="py-1 max-h-60 overflow-auto">
            {items.map((item) => (
              <button
                key={item.value}
                onClick={() => handleSelect(item)}
                className={cn(
                  'flex items-center gap-2 w-full px-3 py-2 text-left',
                  'hover:bg-gray-50 transition-colors',
                  value === item.value && 'bg-primary-50 text-primary-700'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}