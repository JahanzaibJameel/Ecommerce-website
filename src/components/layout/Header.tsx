'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Heart, Search, User, Menu, X } from 'lucide-react'
import { useCartStore } from '@/stores/cart.store'
import { useUIStore } from '@/stores/ui.store'
import { Button } from '@/components/ui/Button'

export const Header: React.FC = () => {
  const { getItemCount } = useCartStore()
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    openCart,
    openWishlist
  } = useUIStore()

  const cartItemCount = getItemCount()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'Deals', href: '/deals' },
  ]

  const logoVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  }

  const navItemVariants = {
    initial: { opacity: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <motion.header
      className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            variants={logoVariants}
            initial="initial"
            whileHover="hover"
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-bold text-sm">U</span>
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                UltimateShop
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item, _index) => (
              <motion.div
                key={item.name}
                variants={navItemVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 rounded-lg hover:bg-primary-50"
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary-600 rounded-full"
                    whileHover={{ width: "80%", x: "-40%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center space-x-2"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">Search</span>
              </Button>
            </motion.div>

            {/* Wishlist Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={openWishlist}
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden lg:inline ml-2">Wishlist</span>
              </Button>
            </motion.div>

            {/* Cart Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={openCart}
                className="relative"
                aria-label={`Cart with ${cartItemCount} items`}
              >
                <ShoppingCart className="w-4 h-4" />
                <AnimatePresence>
                  {cartItemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="hidden lg:inline ml-2">Cart</span>
              </Button>
            </motion.div>

            {/* User Account */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center space-x-2"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
                <span className="hidden lg:inline">Account</span>
              </Button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="md:hidden"
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Menu className="w-4 h-4" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="md:hidden border-t bg-white/95 backdrop-blur-xl"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Action Buttons */}
                <div className="pt-4 border-t space-y-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigation.length * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        toggleMobileMenu()
                        openWishlist()
                      }}
                    >
                      <Heart className="w-4 h-4 mr-3" />
                      Wishlist
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navigation.length + 1) * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        toggleMobileMenu()
                        openCart()
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-3" />
                      Cart ({cartItemCount})
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navigation.length + 2) * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Account
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
    </motion.header>
  )
}