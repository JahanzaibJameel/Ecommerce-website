import React from 'react'
import Link from 'next/link'
import { 
  Facebook, Twitter, Instagram, Linkedin, 
  CreditCard, Truck, Shield, Headphones 
} from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    Shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'Featured Items', href: '/shop/featured' },
      { name: 'New Arrivals', href: '/shop/new' },
      { name: 'On Sale', href: '/shop/sale' },
    ],
    Categories: [
      { name: 'Electronics', href: '/category/electronics' },
      { name: 'Clothing', href: '/category/clothing' },
      { name: 'Books', href: '/category/books' },
      { name: 'Home & Garden', href: '/category/home' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Contact', href: '/contact' },
    ],
    Support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
  }
  
  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: 'Secure Payment',
      description: '100% secure payment',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Quality Guarantee',
      description: '30-day return policy',
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: '24/7 Support',
      description: 'Dedicated support',
    },
  ]
  
  const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, href: '#' },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, href: '#' },
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, href: '#' },
  ]
  
  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Features */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="text-primary-400">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="text-2xl font-bold text-white">
                UltimateShop
              </Link>
              <p className="mt-4 text-gray-400 max-w-md">
                The ultimate e-commerce experience with premium products, 
                secure shopping, and exceptional customer service.
              </p>
              
              {/* Newsletter */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">
                  Subscribe to our newsletter
                </h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Your email"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Button variant="primary">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} UltimateShop. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-white">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}