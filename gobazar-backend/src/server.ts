import './alias';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import config from '@/config';
import routes from '@/routes';
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler';
import { generalLimiter } from '@/middleware/rateLimiter';
import emailService from '@/services/emailService';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
app.use(generalLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (_req, res) => {
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
      payments: '/api/payments',
    },
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Test email service connection
    if (config.email.user && config.email.pass) {
      await emailService.testConnection();
    } else {
      console.warn('Email service not configured. Email features will not work.');
    }

    const server = app.listen(config.port, () => {
      console.log(`🚀 GoBazar API Server running on port ${config.port}`);
      console.log(`📍 Environment: ${config.nodeEnv}`);
      console.log(`🌐 Frontend URL: ${config.frontendUrl}`);
      console.log(`📧 Email Service: ${config.email.user ? 'Configured' : 'Not Configured'}`);
      console.log(`💾 Database: ${config.database.url ? 'Connected' : 'Not Connected'}`);
      
      if (config.nodeEnv === 'development') {
        console.log(`\n📖 API Documentation:`);
        console.log(`   Health Check: http://localhost:${config.port}/api/health`);
        console.log(`   API Root: http://localhost:${config.port}/api`);
        console.log(`\n🔗 Available Endpoints:`);
        console.log(`   Auth: http://localhost:${config.port}/api/auth`);
        console.log(`   Products: http://localhost:${config.port}/api/products`);
        console.log(`   Categories: http://localhost:${config.port}/api/categories`);
        console.log(`   Recommendations: http://localhost:${config.port}/api/recommendations`);
        console.log(`   Cart: http://localhost:${config.port}/api/cart`);
        console.log(`   Orders: http://localhost:${config.port}/api/orders`);
        console.log(`   Addresses: http://localhost:${config.port}/api/addresses`);
        console.log(`   Payments: http://localhost:${config.port}/api/payments`);
      }
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.log('❌ Forcing server shutdown');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();

export default app;
