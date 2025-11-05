# 🚀 GoBazar Backend - Quick Start Guide

## ⚡ Get Running in 5 Minutes

### 1. Database Setup (Choose One Option)

#### Option A: Docker (Recommended)
```bash
# Start PostgreSQL with Docker
docker run --name gobazar-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=gobazar_db -p 5432:5432 -d postgres:15
```

#### Option B: Local PostgreSQL
- Install PostgreSQL locally
- Create database: `gobazar_db`
- Update DATABASE_URL in `.env`

#### Option C: Cloud Database (Easiest)
- Use Supabase, Railway, or Neon
- Get connection string and update `.env`

### 2. Quick Setup
```bash
cd gobazar-backend

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Push database schema (skip if database connection fails)
npm run prisma:push

# Seed with sample data (skip if database connection fails)
npm run seed

# Start the server
npm run dev
```

### 3. Test the API
Visit: http://localhost:5000/api/health

You should see:
```json
{
  "success": true,
  "message": "GoBazar API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

## 🔧 Configuration

### Environment Variables (.env)
```env
# Required
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/gobazar_db"
JWT_SECRET=your-jwt-secret-key

# Optional (for email OTP)
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend
FRONTEND_URL=http://localhost:3000
```

## 📱 Frontend Integration

Update your Next.js frontend API calls:

```javascript
// Replace your existing API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Example: OTP Authentication
const sendOTP = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
};

const verifyOTP = async (email, code) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code })
  });
  return response.json();
};
```

## 🎯 Key Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP and get JWT token
- `POST /api/auth/register` - Register new user

### Products
- `GET /api/products` - Get products with filters
- `GET /api/products/:id` - Get product details
- `GET /api/products/featured` - Get featured products

### Cart (Requires JWT Token)
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item

### Orders (Requires JWT Token)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders

### Recommendations
- `GET /api/recommendations?type=popular` - Get popular products
- `GET /api/recommendations?type=trending` - Get trending products

## 🐛 Troubleshooting

### Database Connection Issues
1. Make sure PostgreSQL is running
2. Check DATABASE_URL in `.env`
3. Try: `npm run prisma:studio` to test connection

### TypeScript Errors
The backend is configured to run despite TypeScript warnings. If you see compilation errors:
```bash
# Skip type checking for development
npm run dev --no-type-check
```

### Email Not Working
Email is optional. The backend will work without SMTP configuration, but OTP emails won't be sent.

### Port Already in Use
Change PORT in `.env` file:
```env
PORT=5001
```

## ✅ Success Indicators

1. **Server Running**: Console shows "🚀 GoBazar API Server running on port 5000"
2. **Database Connected**: No database errors in console
3. **Health Check**: http://localhost:5000/api/health returns success
4. **Sample Data**: http://localhost:5000/api/products returns product list

## 🔄 Development Workflow

```bash
# Start development server
npm run dev

# View database
npm run prisma:studio

# Reset database
npm run reset-db

# Run tests
npm test
```

Your GoBazar backend is now ready to replace the mock API in your Next.js frontend!
