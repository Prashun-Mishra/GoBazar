# GoBazar - Complete Vercel Deployment Guide with Database & GoDaddy Domain

This guide will help you deploy your GoBazar frontend and backend to Vercel, set up a PostgreSQL database, and configure your GoDaddy domain.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Database Setup](#database-setup)
5. [GoDaddy Domain Configuration](#godaddy-domain-configuration)
6. [Environment Variables](#environment-variables)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:
- **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
- **GitHub Account**: Your projects should be on GitHub
- **GoDaddy Account**: For domain management
- **PostgreSQL Database**: We'll use Vercel Postgres or Supabase
- **Node.js**: Version 18+ installed locally
- **Git**: For version control

---

## Backend Deployment

### Step 1: Prepare Backend for Production

1. **Ensure TypeScript compilation works locally:**
   ```bash
   cd gobazar-backend
   npm install
   npm run build
   ```

2. **Verify the build output:**
   - Check that `dist/server.js` exists
   - Ensure all dependencies are in `package.json`

### Step 2: Push Backend to GitHub

```bash
cd gobazar-backend
git init
git add .
git commit -m "Initial backend commit for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gobazar-backend.git
git push -u origin main
```

### Step 3: Deploy Backend to Vercel

1. **Go to [vercel.com/new](https://vercel.com/new)**
2. **Click "Import Git Repository"**
3. **Select your `gobazar-backend` repository**
4. **Configure project settings:**
   - **Project Name**: `gobazar-backend`
   - **Framework Preset**: `Other`
   - **Root Directory**: `./` (or leave blank)
   - **Build Command**: `npm run build && npm run prisma:generate`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables** (click "Environment Variables"):
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=postgresql://user:password@host:5432/gobazar_db
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-key
   CLOUDINARY_API_SECRET=your-cloudinary-secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   OTP_EXPIRY_MINUTES=5
   OTP_LENGTH=6
   PAYU_MERCHANT_KEY=your-payu-key
   PAYU_MERCHANT_SALT=your-payu-salt
   PAYU_API_URL=https://secure.payu.in/_payment
   FRONTEND_URL=https://yourdomain.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

6. **Click "Deploy"**
7. **Wait for deployment to complete** (usually 2-5 minutes)
8. **Note your backend URL**: `https://gobazar-backend.vercel.app` (or your custom domain)

---

## Frontend Deployment

### Step 1: Prepare Frontend for Production

1. **Update environment variables:**
   ```bash
   cd blinkit-clone
   ```

2. **Create `.env.production` file** (or update via Vercel dashboard):
   ```
   NEXT_PUBLIC_API_URL=https://gobazar-backend.vercel.app/api
   ```

3. **Test build locally:**
   ```bash
   npm install
   npm run build
   npm run start
   ```

### Step 2: Push Frontend to GitHub

```bash
cd blinkit-clone
git init
git add .
git commit -m "Initial frontend commit for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gobazar-frontend.git
git push -u origin main
```

### Step 3: Deploy Frontend to Vercel

1. **Go to [vercel.com/new](https://vercel.com/new)**
2. **Click "Import Git Repository"**
3. **Select your `gobazar-frontend` repository**
4. **Configure project settings:**
   - **Project Name**: `gobazar-frontend`
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./` (or leave blank)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://gobazar-backend.vercel.app/api
   ```
   *(Replace with your actual backend URL)*

6. **Click "Deploy"**
7. **Wait for deployment** (usually 3-5 minutes)
8. **Note your frontend URL**: `https://gobazar-frontend.vercel.app`

---

## Database Setup

### Option 1: Using Vercel Postgres (Recommended)

1. **Go to Vercel Dashboard → Storage**
2. **Click "Create Database" → "Postgres"**
3. **Select region**: `India (Mumbai)` or closest to you
4. **Click "Create"**
5. **Copy the connection string** (DATABASE_URL)
6. **Add to both backend and frontend environment variables** (if needed)

### Option 2: Using Supabase (PostgreSQL)

1. **Go to [supabase.com](https://supabase.com)**
2. **Create a new project**
3. **Wait for database to initialize**
4. **Go to Settings → Database**
5. **Copy the connection string** (URI)
6. **Use this as your DATABASE_URL** in Vercel environment variables

### Step 4: Run Database Migrations

1. **In your local terminal:**
   ```bash
   cd gobazar-backend
   npx prisma migrate deploy
   ```

2. **Or via Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel env pull
   npx prisma migrate deploy
   ```

---

## GoDaddy Domain Configuration

### Step 1: Connect Domain to Vercel

1. **Go to Vercel Dashboard → Settings → Domains**
2. **Click "Add Domain"**
3. **Enter your GoDaddy domain** (e.g., `yourdomain.com`)
4. **Vercel will show you nameserver details**

### Step 2: Update GoDaddy Nameservers

1. **Log in to GoDaddy Account**
2. **Go to "My Products" → "Domain"**
3. **Click on your domain**
4. **Go to "Nameservers"**
5. **Change to "Custom"**
6. **Enter Vercel's nameservers:**
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
7. **Save changes** (may take 24-48 hours to propagate)

### Step 3: Configure Subdomains in Vercel

1. **For Backend**: `api.yourdomain.com`
   - Go to Vercel Backend Project → Settings → Domains
   - Add `api.yourdomain.com`
   - Verify DNS records

2. **For Frontend**: `www.yourdomain.com` or `yourdomain.com`
   - Go to Vercel Frontend Project → Settings → Domains
   - Add `www.yourdomain.com`
   - Add `yourdomain.com` (root domain)
   - Verify DNS records

### Step 4: Update Frontend API URL

Once domains are configured:

1. **Go to Frontend Project → Settings → Environment Variables**
2. **Update `NEXT_PUBLIC_API_URL`**:
   ```
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
   ```
3. **Redeploy frontend** (Vercel will auto-redeploy)

---

## Environment Variables

### Backend Environment Variables Template

```env
# Server
NODE_ENV=production
PORT=5000

# Database (Vercel Postgres or Supabase)
DATABASE_URL=postgresql://user:password@host:5432/gobazar_db

# JWT
JWT_SECRET=your-very-long-secret-key-min-32-characters-long
JWT_EXPIRES_IN=7d

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# OTP
OTP_EXPIRY_MINUTES=5
OTP_LENGTH=6

# Payment Gateway (PayU)
PAYU_MERCHANT_KEY=your-payu-merchant-key
PAYU_MERCHANT_SALT=your-payu-merchant-salt
PAYU_API_URL=https://secure.payu.in/_payment

# CORS
FRONTEND_URL=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables Template

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

---

## Deployment Checklist

- [ ] Backend pushed to GitHub
- [ ] Backend deployed to Vercel
- [ ] Frontend pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] PostgreSQL database created (Vercel Postgres or Supabase)
- [ ] DATABASE_URL added to backend environment variables
- [ ] All backend environment variables configured
- [ ] All frontend environment variables configured
- [ ] Database migrations run successfully
- [ ] Backend API responding at `https://gobazar-backend.vercel.app/api/health`
- [ ] Frontend accessible at `https://gobazar-frontend.vercel.app`
- [ ] GoDaddy nameservers updated to Vercel
- [ ] Custom domains configured in Vercel
- [ ] Frontend API URL updated to use custom domain
- [ ] Frontend redeployed with updated API URL
- [ ] Test login, product browsing, and checkout flows

---

## Troubleshooting

### Backend Deployment Issues

**Problem**: Build fails with "prisma generate" error
- **Solution**: Ensure `DATABASE_URL` is set before build
- Add `prisma:generate` to build command in `vercel.json`

**Problem**: 502 Bad Gateway error
- **Solution**: Check backend logs in Vercel dashboard
- Verify DATABASE_URL is correct
- Check that all environment variables are set

**Problem**: CORS errors from frontend
- **Solution**: Update `FRONTEND_URL` in backend environment variables
- Ensure frontend domain is whitelisted in CORS config

### Frontend Deployment Issues

**Problem**: API calls return 404
- **Solution**: Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running and accessible
- Redeploy frontend after updating API URL

**Problem**: Build fails with TypeScript errors
- **Solution**: Run `npm run build` locally to see full errors
- Fix errors locally and push to GitHub
- Vercel will auto-redeploy

### Database Issues

**Problem**: Cannot connect to database
- **Solution**: Verify DATABASE_URL format
- Check database credentials
- Ensure database is accessible from Vercel

**Problem**: Migrations fail
- **Solution**: Run migrations locally first
- Check Prisma schema for errors
- Verify database has proper permissions

### Domain Issues

**Problem**: Domain not resolving
- **Solution**: Wait 24-48 hours for DNS propagation
- Check GoDaddy nameserver settings
- Verify Vercel DNS records

**Problem**: SSL certificate not working
- **Solution**: Vercel auto-generates SSL certificates
- Wait 24 hours for certificate to be issued
- Check domain is properly configured in Vercel

---

## Quick Commands Reference

```bash
# Build backend
npm run build

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npx prisma migrate deploy

# Build frontend
npm run build

# Deploy to Vercel (CLI)
vercel deploy --prod

# Pull environment variables from Vercel
vercel env pull

# View Vercel logs
vercel logs
```

---

## Support & Next Steps

1. **Test your deployment** thoroughly
2. **Monitor Vercel dashboard** for errors
3. **Check backend logs** for API issues
4. **Test payment gateway** integration
5. **Set up monitoring** and error tracking

For more help:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [GoDaddy Support](https://www.godaddy.com/help)

---

**Last Updated**: 2024
**Status**: Ready for Production Deployment
