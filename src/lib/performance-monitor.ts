// Track frontend performance metrics
import React from 'react'

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  metadata?: Record<string, unknown>
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private observers: ((metric: PerformanceMetric) => void)[] = []
  private lcpObserver: PerformanceObserver | null = null
  private clsObserver: PerformanceObserver | null = null

  trackMetric(name: string, value: number, metadata?: Record<string, unknown>): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      metadata,
    }

    this.metrics.push(metric)
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Perf] ${name}: ${value}ms`, metadata || '')
    }
    
    // Notify observers
    this.observers.forEach(observer => observer(metric))
    
    // In production, send to analytics (simulated)
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(metric)
    }
  }

  measureComponentRender(componentName: string): () => void {
    const start = performance.now()
    return () => {
      const duration = performance.now() - start
      this.trackMetric(`${componentName}_render`, duration)
    }
  }

  trackNavigation(from: string, to: string): void {
    const start = performance.now()
    
    window.addEventListener('load', () => {
      const duration = performance.now() - start
      this.trackMetric('navigation_duration', duration, { from, to })
    })
  }

  trackLCP(): void {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window && !this.lcpObserver) {
      this.lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        
        this.trackMetric('LCP', lastEntry.startTime, {
          element: (lastEntry as any).element?.tagName,
          url: lastEntry.name,
        })
      })

      this.lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    }
  }

  trackCLS(): void {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window && !this.clsObserver) {
      let clsValue = 0
      
      this.clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        
        this.trackMetric('CLS', clsValue)
      })

      this.clsObserver.observe({ entryTypes: ['layout-shift'] })
    }
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name === name)
  }

  clearMetrics(): void {
    this.metrics = []
  }

  subscribe(callback: (metric: PerformanceMetric) => void): () => void {
    this.observers.push(callback)
    return () => {
      this.observers = this.observers.filter(obs => obs !== callback)
    }
  }

  private sendToAnalytics(metric: PerformanceMetric): void {
    // Simulate sending to analytics service
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('performance-metric', {
        detail: metric,
      }))
    }
  }
}

export const performanceMonitor = new PerformanceMonitor()

// React Hook for performance monitoring
export const usePerformanceMonitor = (componentName: string) => {
  React.useEffect(() => {
    const endMeasurement = performanceMonitor.measureComponentRender(componentName)
    
    return () => {
      endMeasurement()
    }
  }, [componentName])
}