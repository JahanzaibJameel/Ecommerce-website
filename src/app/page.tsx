import { ProductGrid } from '@/components/product/ProductGrid'
import { Hero } from '@/components/home/Hero'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { mockProducts } from '@/lib/mock-data'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Categories */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Shop by Category
        </h2>
        <CategoryGrid />
      </section>
      
      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link 
            href="/shop" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View all →
          </Link>
        </div>
        <ProductGrid products={mockProducts.slice(0, 8)} />
      </section>
      
      {/* Deals Section */}
      <section className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Flash Sale! Up to 50% Off
          </h2>
          <p className="text-gray-600 mb-6">
            Limited time offer on selected items. Don&apos;t miss out!
          </p>
          <div className="flex gap-4 justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">24</div>
              <div className="text-sm text-gray-500">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">59</div>
              <div className="text-sm text-gray-500">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">59</div>
              <div className="text-sm text-gray-500">Seconds</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}