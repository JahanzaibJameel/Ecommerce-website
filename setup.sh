#!/bin/bash

echo "🚀 Setting up Ultimate E-commerce Project..."

# Create project
npx create-next-app@latest ultimate-ecommerce --typescript --tailwind --app --no-eslint
cd ultimate-ecommerce

echo "📦 Installing dependencies..."
npm install zustand @tanstack/react-query @tanstack/react-query-devtools lucide-react clsx tailwind-merge date-fns framer-motion
npm install -D @types/node @types/react @types/react-dom prettier prettier-plugin-tailwindcss

echo "📁 Creating folder structure..."
mkdir -p src/{app,components,stores,lib,hooks,types,utils,docs}
mkdir -p src/components/{ui,layout,product,cart,checkout,wishlist,error,shared}
mkdir -p src/app/{(auth),cart,checkout,wishlist,profile,shop/[id]}
mkdir -p public/images

echo "✅ Setup complete!"
echo "🎉 Next steps:"
echo "1. Copy all the provided code files to their respective locations"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"