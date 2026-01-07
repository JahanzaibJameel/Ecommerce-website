'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist. Let's get you back to shopping!
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button size="lg">Back to Home</Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" size="lg">Browse Products</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}