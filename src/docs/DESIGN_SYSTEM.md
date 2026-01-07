# DESIGN SYSTEM DOCUMENTATION

## COMPONENT CONTRACTS

### Button Component
PROPS CONTRACT:
variant: "primary" | "secondary" | "ghost" | "destructive"
size: "sm" | "md" | "lg"
loading: boolean
disabled: boolean

USAGE RULES:
1. Primary buttons = main conversion actions only (max 1 per screen)
2. Secondary buttons = alternative actions
3. Ghost buttons = less important, non-primary flows

### ProductCard Component
PROPS CONTRACT:
product: ProductType
variant: 'grid' | 'list' | 'compact'
onAddToCart: (productId: string) => void
onWishlistToggle: (productId: string) => void

RULES:
- Always show price, image, and CTA
- Use skeleton loading for images
- Implement lazy loading for below-fold items

## COLOR SYSTEM
Primary (#0ea5e9): Main CTAs, active navigation
Secondary (#8b5cf6): Accent elements, badges
Success (#10b981): Positive states
Error (#ef4444): Destructive actions, errors
Warning (#f59e0b): Warning states
Neutral Gray (#6b7280): Disabled states, borders

## SPACING SCALE (8-point system)
2: 0.5rem  - Micro spacing
4: 1rem    - Small padding
8: 2rem    - Component spacing
12: 3rem   - Section spacing
16: 4rem   - Large spacing

## TYPOGRAPHY HIERARCHY
h1: 3rem (48px) - Page hero only
h2: 2.25rem (36px) - Section headers
h3: 1.5rem (24px) - Subsection headers
body: 1rem (16px) - Default text
small: 0.875rem (14px) - Labels, captions

## ACCESSIBILITY CHECKLIST
✅ All images have alt text
✅ Color contrast ratio 4.5:1 minimum
✅ Focus visible on all interactive elements
✅ Semantic HTML structure (nav, main, section, footer)
✅ Aria labels for icon buttons
✅ Screen reader support for interactive elements
✅ Keyboard navigation support
✅ Reduced motion preferences respected