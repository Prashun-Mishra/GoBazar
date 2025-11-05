# Go Bazar - Grocery Delivery App

A full-featured grocery delivery application built with Next.js, TypeScript, and Tailwind CSS. Features both user-facing shopping interface and admin dashboard.

## Features Checklist

### User Features
- [x] Homepage with 20 grocery categories
- [ ] Category listing with filters and sorting
- [ ] Product detail pages with variants
- [ ] Search functionality with suggestions
- [ ] Shopping cart with quantity management
- [ ] Checkout flow with address selection
- [ ] User account and order history
- [ ] Wishlist/favorites functionality
- [ ] Notifications and offers page
- [ ] Help/FAQ section

### Admin Features
- [ ] Admin dashboard with KPIs
- [ ] Product management (CRUD)
- [ ] Category management and reordering
- [ ] Order management with status updates
- [ ] User management
- [ ] Coupon/offers management
- [ ] Analytics charts
- [ ] Settings management

### Technical Features
- [x] TypeScript interfaces and types
- [x] Mock data with 20 categories
- [x] Cart state management with Context
- [x] Authentication context
- [x] Responsive design with Tailwind CSS
- [ ] Mock API routes
- [ ] Image optimization
- [ ] SEO optimization
- [ ] Testing setup
- [ ] PWA features

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── contexts/           # React contexts for state management
├── data/seed/          # Mock data files
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
└── public/             # Static assets
\`\`\`

## Mock Data

The application includes seeded mock data for:
- 20 grocery categories (as specified)
- 200+ sample products across categories
- 50 mock users
- 200 sample orders

## Development Notes

- Uses Next.js App Router for routing
- Tailwind CSS for styling with custom design system
- React Context for cart and authentication state
- Mock APIs using Next.js API routes
- Responsive mobile-first design
- TypeScript for type safety

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
