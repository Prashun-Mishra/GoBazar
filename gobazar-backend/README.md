# GoBazar Backend API

A robust Node.js/Express backend for the GoBazar e-commerce platform with PostgreSQL database, JWT authentication, OTP verification, and comprehensive API endpoints.

## 🚀 Features

- **Authentication**: JWT-based authentication with OTP verification via email
- **Product Management**: Comprehensive product catalog with categories, variants, and search
- **Cart & Orders**: Full shopping cart and order management system
- **Recommendations**: AI-powered product recommendations (trending, popular, personalized)
- **Address Management**: Multiple delivery addresses with validation
- **Email Service**: Automated emails for OTP, welcome, and order confirmations
- **Payment Integration**: Ready for RMC, SabPaisa, and PayU Money gateways
- **Admin Panel**: Admin endpoints for order and inventory management
- **Rate Limiting**: API rate limiting for security
- **Data Validation**: Comprehensive input validation with Joi
- **Error Handling**: Centralized error handling with detailed responses

## 🛠 Technology Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Email OTP
- **Validation**: Joi
- **Email**: Nodemailer
- **File Upload**: Multer + Cloudinary (ready)
- **Testing**: Jest + Supertest (configured)

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Gmail account for SMTP (optional)

## 🔧 Installation & Setup

### 1. Clone and Install Dependencies

```bash
cd gobazar-backend
npm install
```

### 2. Environment Configuration

Copy the environment template:
```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (Update with your PostgreSQL credentials)
DATABASE_URL="postgresql://username:password@localhost:5432/gobazar_db"

# JWT Configuration (Change in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Email Configuration (Optional - for OTP functionality)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# OTP Configuration
OTP_EXPIRY_MINUTES=5
OTP_LENGTH=6

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup

Create PostgreSQL database:
```sql
CREATE DATABASE gobazar_db;
```

Generate Prisma client and push schema:
```bash
npm run prisma:generate
npm run prisma:push
```

Seed the database with sample data:
```bash
npm run seed
```

### 4. Start the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /api/health
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/send-otp` | Send OTP to email |
| POST | `/api/auth/verify-otp` | Verify OTP and login |
| POST | `/api/auth/register` | Register new user |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update user profile |
| POST | `/api/auth/logout` | Logout user |

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get products with filters |
| GET | `/api/products/:id` | Get product by ID |
| GET | `/api/products/featured` | Get featured products |
| GET | `/api/products/popular` | Get popular products |
| GET | `/api/products/trending` | Get trending products |
| GET | `/api/products/search` | Search products |
| GET | `/api/products/category/:categoryId` | Get products by category |
| GET | `/api/products/:id/similar` | Get similar products |

### Category Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get category by ID |
| GET | `/api/categories/subcategories` | Get subcategories |

### Cart Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user cart |
| GET | `/api/cart/summary` | Get cart summary |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/:cartItemId` | Update cart item |
| DELETE | `/api/cart/:cartItemId` | Remove from cart |
| DELETE | `/api/cart` | Clear cart |

### Order Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | Get user orders |
| GET | `/api/orders/:orderId` | Get order by ID |
| PUT | `/api/orders/:orderId/cancel` | Cancel order |

### Address Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/addresses` | Get user addresses |
| POST | `/api/addresses` | Add new address |
| PUT | `/api/addresses/:addressId` | Update address |
| DELETE | `/api/addresses/:addressId` | Delete address |
| GET | `/api/addresses/validate-pincode/:pincode` | Validate pincode |

### Recommendation Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recommendations` | Get recommendations |
| GET | `/api/recommendations/homepage` | Get homepage recommendations |
| GET | `/api/recommendations/trending` | Get trending products |
| GET | `/api/recommendations/popular` | Get popular products |
| GET | `/api/recommendations/personalized` | Get personalized recommendations (Protected) |

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### OTP Authentication Flow

1. **Send OTP**: POST `/api/auth/send-otp` with email
2. **Verify OTP**: POST `/api/auth/verify-otp` with email and OTP code
3. **Receive JWT**: Use the JWT token for subsequent requests

## 📝 Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210"
}
```

### Add to Cart
```bash
POST /api/cart/add
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "productId": "prod-milk-1",
  "quantity": 2
}
```

### Create Order
```bash
POST /api/orders
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "addressId": "addr-123",
  "deliverySlot": "Tomorrow 9-11 AM",
  "couponCode": "WELCOME10"
}
```

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📦 Database Schema

The database includes the following main entities:

- **Users**: User accounts with authentication
- **Categories/SubCategories**: Product categorization
- **Products**: Product catalog with variants
- **Cart**: Shopping cart items
- **Orders**: Order management with items
- **Addresses**: User delivery addresses
- **Coupons**: Discount coupons
- **OTP**: One-time passwords for authentication

## 🚀 Deployment

### Environment Variables for Production

Update these in production:

```env
NODE_ENV=production
JWT_SECRET=<strong-production-secret>
DATABASE_URL=<production-database-url>
SMTP_USER=<production-email>
SMTP_PASS=<production-email-password>
```

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Development Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:push` | Push schema to database |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio |
| `npm run seed` | Seed database with sample data |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |

## 🤝 Frontend Integration

This backend is designed to work with the existing Next.js frontend. Update your frontend API calls to point to:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Key Integration Points

1. **Authentication**: Replace mock auth with OTP-based system
2. **Products**: Use real database instead of JSON files
3. **Cart**: Persistent cart with user authentication
4. **Orders**: Real order processing with email notifications
5. **Recommendations**: Enhanced recommendation algorithms

## 📧 Email Configuration

For OTP functionality, configure Gmail SMTP:

1. Enable 2-factor authentication on Gmail
2. Generate an App Password
3. Use the App Password in `SMTP_PASS`

## 🔒 Security Features

- JWT token authentication
- Rate limiting on all endpoints
- Input validation with Joi
- CORS protection
- Helmet security headers
- SQL injection prevention with Prisma
- Password-less authentication with OTP

## 📈 Performance Features

- Database query optimization
- Response compression
- Connection pooling with Prisma
- Efficient pagination
- Caching-ready architecture

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and credentials are correct
2. **Email Issues**: Check SMTP credentials and Gmail app password
3. **Port Conflicts**: Change PORT in .env if 5000 is occupied
4. **Prisma Issues**: Run `npx prisma generate` after schema changes

### Logs

Check server logs for detailed error information. In development mode, all database queries are logged.

## 📄 License

MIT License - see LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**GoBazar Backend API** - Built with ❤️ for modern e-commerce
