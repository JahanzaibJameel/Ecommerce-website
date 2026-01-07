// Simple boolean flags for frontend features
export const FEATURE_FLAGS: Record<string, any> = {
  // Release 1.0 features
  enableWishlist: true,
  enableProductReviews: false, // Launch without reviews
  enableAdvancedFilters: true,
  enableDarkMode: true, // Implemented with theme provider
  enableGuestCheckout: true,
  enableSocialLogin: false,
  enableOrderTracking: true,
  enableProductComparison: false,
  enableBulkActions: true,
  
  // Environment-based flags
  enableAnalytics: process.env.NODE_ENV === 'production',
  enableMockData: process.env.NODE_ENV === 'development',
  enablePerformanceMonitoring: true,
  
  // A/B Testing flags
  enableNewCheckoutFlow: false, // 50% rollout
  enableProductRecommendations: true,
  
  // Toggle function with environment support
  isEnabled: (flag: keyof typeof FEATURE_FLAGS): boolean => {
    const value = FEATURE_FLAGS[flag]
    
    // Environment checks
    if (flag === 'enableAnalytics' && process.env.NODE_ENV !== 'production') {
      return false
    }
    
    // A/B testing logic (example)
    if (flag === 'enableNewCheckoutFlow') {
      return Math.random() < 0.5 // 50% chance
    }
    
    return value
  },
  
  // Get all active features
  getActiveFeatures: () => {
    return Object.entries(FEATURE_FLAGS)
      .filter(([, value]) => typeof value === 'boolean' && value)
      .map(([featureKey]) => featureKey)
  },
  
  // Feature status check for UI
  getFeatureStatus: (flag: keyof typeof FEATURE_FLAGS) => {
    const isActive = FEATURE_FLAGS.isEnabled(flag)
    return {
      isActive,
      label: isActive ? 'Active' : 'Inactive',
      color: isActive ? 'text-green-600' : 'text-gray-400',
    }
  },
}

// Type-safe feature flag access
export type FeatureFlag = keyof typeof FEATURE_FLAGS

// Hook for React components
export const useFeatureFlag = (flag: FeatureFlag): boolean => {
  return FEATURE_FLAGS.isEnabled(flag)
}