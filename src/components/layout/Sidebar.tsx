'use client'

import React from 'react'
import { Home, ShoppingBag, Heart, User, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  className?: string
}

const navigation = [
  { name: 'Dashboard', href: '/profile', icon: Home },
  { name: 'My Orders', href: '/profile/orders', icon: ShoppingBag },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
  { name: 'Account Settings', href: '/profile/settings', icon: Settings },
]

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname()

  return (
    <aside className={cn('w-64 border-r bg-white', className)}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">Account</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your account</p>
      </div>
      
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
        
        <button className="flex items-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Sign Out</span>
        </button>
      </nav>
      
      {/* User info */}
      <div className="p-4 border-t mt-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">John Doe</p>
            <p className="text-sm text-gray-500">john@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}