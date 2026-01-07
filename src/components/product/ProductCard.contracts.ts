import { Product } from '@/types'

export interface ProductCardProps {
  product: Product
  
  // Variants
  variant?: 'grid' | 'list' | 'compact'
  
  // Callbacks
  onAddToCart?: (productId: string) => void
  onWishlistToggle?: (productId: string) => void
  onQuickView?: (productId: string) => void
  
  // State
  isInCart?: boolean
  isInWishlist?: boolean
  isLoading?: boolean
  
  // Accessibility
  'aria-label'?: string
  'data-testid'?: string
  
  // Customization
  className?: string
  showActions?: boolean
  showRating?: boolean
  showDescription?: boolean
}

export const PRODUCT_CARD_DEFAULTS = {
  variant: 'grid' as const,
  showActions: true,
  showRating: true,
  showDescription: true,
}

// Anti-patterns documentation
export const ANTI_PATTERNS = {
  DONOT_USE_AS_HREF: "ProductCard should not be an <a> tag - use Link component inside",
  DONOT_HIDE_ACTIONS: "Quick actions should always be accessible (hover/tap)",
  DONOT_EXCEED_WIDTH: "Max width: 320px for grid layout",
  DONOT_OMIT_ALT_TEXT: "Always provide descriptive alt text for images",
  DONOT_NEST_INTERACTIVE: "Avoid nesting interactive elements inside interactive elements",
}

// Performance guidelines
export const PERFORMANCE_GUIDELINES = {
  LAZY_LOAD_IMAGES: "Use next/image with loading='lazy' for below-fold images",
  SKELETON_LOADING: "Show skeleton loader while image is loading",
  IMAGE_OPTIMIZATION: "Use appropriate sizes and quality for images",
  MEMOIZATION: "Memoize expensive calculations and callbacks",
}