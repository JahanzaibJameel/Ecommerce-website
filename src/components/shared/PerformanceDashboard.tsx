'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Clock,
  Zap,
  Monitor,
  Smartphone,
  Globe,
  Activity,
  X,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { performanceMonitor } from '@/lib/performance-monitor'

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  metadata?: Record<string, unknown>
}

interface PerformanceDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  isOpen,
  onClose
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [systemInfo, setSystemInfo] = useState({
    userAgent: '',
    screenSize: '',
    connection: '',
    memory: ''
  })

  const updateMetrics = () => {
    setIsRefreshing(true)
    setMetrics(performanceMonitor.getMetrics())

    setTimeout(() => {
      setIsRefreshing(false)
    }, 500)
  }

  const collectSystemInfo = () => {
    const info = {
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      connection: 'online', // Could be enhanced with Network Information API
      memory: ''
    }

    // Performance.memory is not standard but available in Chrome
    if ('memory' in performance) {
      const mem = (performance as { memory?: { usedJSHeapSize: number } }).memory
      if (mem) {
        info.memory = `${Math.round(mem.usedJSHeapSize / 1024 / 1024)}MB used`
      }
    }

    setSystemInfo(info)
  }

  useEffect(() => {
    if (isOpen) {
      updateMetrics()
      collectSystemInfo()
    }
  }, [isOpen])

  const formatMetricValue = (name: string, value: number) => {
    if (name.includes('LCP') || name.includes('render')) {
      return `${value.toFixed(0)}ms`
    }
    if (name.includes('CLS')) {
      return value.toFixed(4)
    }
    return value.toString()
  }

  const getMetricColor = (name: string, value: number) => {
    if (name.includes('LCP')) {
      return value < 2500 ? 'text-green-600' : value < 4000 ? 'text-yellow-600' : 'text-red-600'
    }
    if (name.includes('CLS')) {
      return value < 0.1 ? 'text-green-600' : value < 0.25 ? 'text-yellow-600' : 'text-red-600'
    }
    if (name.includes('render')) {
      return value < 100 ? 'text-green-600' : value < 500 ? 'text-yellow-600' : 'text-red-600'
    }
    return 'text-gray-600'
  }

  const getMetricIcon = (name: string) => {
    if (name.includes('LCP')) return <Monitor className="w-4 h-4" />
    if (name.includes('CLS')) return <Activity className="w-4 h-4" />
    if (name.includes('render')) return <Zap className="w-4 h-4" />
    return <BarChart3 className="w-4 h-4" />
  }

  const getDeviceType = () => {
    const ua = navigator.userAgent
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'Tablet'
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'Mobile'
    }
    return 'Desktop'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">Performance Dashboard</h2>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={updateMetrics}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* System Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Monitor className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Device</span>
                  </div>
                  <p className="text-lg font-semibold text-blue-800">{getDeviceType()}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Connection</span>
                  </div>
                  <p className="text-lg font-semibold text-green-800">{systemInfo.connection}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">Screen</span>
                  </div>
                  <p className="text-lg font-semibold text-purple-800">{systemInfo.screenSize}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-900">Memory</span>
                  </div>
                  <p className="text-lg font-semibold text-orange-800">
                    {systemInfo.memory || 'N/A'}
                  </p>
                </motion.div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Performance Metrics
                </h3>

                {metrics.length === 0 ? (
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No metrics collected yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Metrics will appear as you interact with the application
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {metrics.slice(-10).reverse().map((metric, index) => (
                      <motion.div
                        key={`${metric.name}-${metric.timestamp}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white rounded-lg">
                            {getMetricIcon(metric.name)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{metric.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(metric.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-semibold ${getMetricColor(metric.name, metric.value)}`}>
                            {formatMetricValue(metric.name, metric.value)}
                          </p>
                          {metric.metadata && (
                            <p className="text-xs text-gray-500">
                              {metric.metadata.element && typeof metric.metadata.element === 'string' ? `Element: ${metric.metadata.element.substring(0, 20)}...` : ''}
                              {metric.metadata.url && typeof metric.metadata.url === 'string' ? `URL: ${metric.metadata.url.substring(0, 30)}...` : ''}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Performance Tips */}
                <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-primary-600" />
                    Performance Tips
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>LCP (Largest Contentful Paint) should be under 2.5s for good performance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>CLS (Cumulative Layout Shift) should be under 0.1 for stable layouts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Component render times under 100ms indicate good performance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}