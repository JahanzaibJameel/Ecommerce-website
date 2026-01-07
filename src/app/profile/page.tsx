'use client'

import React from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { User, Mail, Calendar, MapPin } from 'lucide-react'

export default function ProfilePage() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: 'January 15, 2023',
    location: 'New York, USA',
    orders: 12,
    totalSpent: '$2,450.75',
  }
  
  const recentOrders = [
    { id: 'ORD-001', date: '2024-01-15', total: '$249.99', status: 'Delivered' },
    { id: 'ORD-002', date: '2024-01-10', total: '$129.99', status: 'Processing' },
    { id: 'ORD-003', date: '2024-01-05', total: '$89.99', status: 'Delivered' },
  ]
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <Sidebar className="lg:w-1/4" />
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
          </div>
          
          {/* Profile Info */}
          <Card className="mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-12 w-12 text-primary-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          Member since {user.joinDate}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {user.location}
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold">{user.orders}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Spent</p>
                      <p className="text-2xl font-bold">{user.totalSpent}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Member Level</p>
                      <p className="text-2xl font-bold">Gold</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Recent Orders */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <a
                href="/profile/orders"
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform hover:bg-gray-100 hover:text-gray-900"
              >
                View All
              </a>
            </div>
            
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 text-sm font-semibold text-gray-900">Order ID</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-900">Date</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-900">Total</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-900">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <span className="font-medium">{order.id}</span>
                        </td>
                        <td className="p-4 text-gray-600">{order.date}</td>
                        <td className="p-4 font-medium">{order.total}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-gray-600">123 Main Street</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                    <p className="text-gray-600">United States</p>
                  </div>
                  <Button variant="outline">Edit Address</Button>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-blue-600 rounded"></div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                  <Button variant="outline">Add Payment Method</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}