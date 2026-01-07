'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Smartphone, Shirt, Book, Home,
  Watch, Camera, Headphones, Gamepad
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const CategoryGrid: React.FC = () => {
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: <Smartphone className="h-8 w-8" />,
      count: 245,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'clothing',
      name: 'Clothing',
      icon: <Shirt className="h-8 w-8" />,
      count: 189,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'books',
      name: 'Books',
      icon: <Book className="h-8 w-8" />,
      count: 156,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'home',
      name: 'Home & Garden',
      icon: <Home className="h-8 w-8" />,
      count: 98,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'watches',
      name: 'Watches',
      icon: <Watch className="h-8 w-8" />,
      count: 76,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
    },
    {
      id: 'cameras',
      name: 'Cameras',
      icon: <Camera className="h-8 w-8" />,
      count: 43,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      id: 'audio',
      name: 'Audio',
      icon: <Headphones className="h-8 w-8" />,
      count: 67,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: <Gamepad className="h-8 w-8" />,
      count: 89,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={`/shop?category=${category.id}`}>
            <motion.div
              className={cn(
                "relative p-6 rounded-2xl transition-all duration-300 cursor-pointer",
                "border border-gray-100 hover:border-gray-200",
                "hover:shadow-xl hover:shadow-gray-200/50",
                "group overflow-hidden"
              )}
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
            >
              {/* Background gradient */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                `bg-gradient-to-br ${category.color}`
              )} />

              {/* Icon */}
              <motion.div
                className={cn(
                  "relative w-16 h-16 rounded-xl flex items-center justify-center mb-4",
                  category.bgColor,
                  `bg-gradient-to-br ${category.color} group-hover:scale-110 transition-transform duration-300`
                )}
                whileHover={{
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <motion.div
                  className="text-white"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  {category.icon}
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.count} products
                </p>
              </motion.div>

              {/* Hover indicator */}
              <motion.div
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              >
                <motion.div
                  className="w-2 h-2 bg-current text-gray-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}