const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'GoBazar API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to GoBazar API',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
      recommendations: '/api/recommendations',
      cart: '/api/cart',
      orders: '/api/orders',
      addresses: '/api/addresses',
    },
  });
});

// Sample endpoints for immediate testing
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    message: 'Products endpoint working',
    data: [
      {
        id: '1',
        name: 'Sample Product',
        price: 29.99,
        category: 'Sample Category'
      }
    ]
  });
});

app.post('/api/auth/send-otp', (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    message: `OTP sent to ${email} (demo mode)`,
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { email, code } = req.body;
  res.json({
    success: true,
    message: 'Login successful (demo mode)',
    token: 'demo-jwt-token',
    user: {
      id: '1',
      name: 'Demo User',
      email: email,
      role: 'user'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GoBazar API Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Frontend URL: http://localhost:3000`);
  console.log(`\n📖 API Endpoints:`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health`);
  console.log(`   Products: http://localhost:${PORT}/api/products`);
  console.log(`   Send OTP: POST http://localhost:${PORT}/api/auth/send-otp`);
  console.log(`   Verify OTP: POST http://localhost:${PORT}/api/auth/verify-otp`);
  console.log(`\n✅ Server is ready for frontend integration!`);
});

module.exports = app;
