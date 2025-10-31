# Quick Deployment Steps - GoBazar on Vercel

Fast-track deployment checklist. Follow these steps in order.

---

## ⚡ Pre-Deployment (Local Setup)

### 1. Backend Preparation
```bash
cd gobazar-backend

# Install dependencies
npm install

# Build and test
npm run build

# Verify dist folder exists
ls dist/
```

### 2. Frontend Preparation
```bash
cd ../blinkit-clone

# Install dependencies
npm install

# Build and test
npm run build

# Verify .next folder exists
ls .next/
```

---

## 📤 Step 1: Push to GitHub (5 minutes)

### Backend
```bash
cd gobazar-backend
git init
git add .
git commit -m "Initial backend for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gobazar-backend.git
git push -u origin main
```

### Frontend
```bash
cd ../blinkit-clone
git init
git add .
git commit -m "Initial frontend for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gobazar-frontend.git
git push -u origin main
```

---

## 🗄️ Step 2: Setup Database (5 minutes)

### Option A: Vercel Postgres (Recommended)
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Storage" → "Create Database" → "Postgres"
3. Select region: **India (Mumbai)**
4. Click "Create"
5. **Copy the connection string** (DATABASE_URL)

### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string (URI)

---

## 🚀 Step 3: Deploy Backend (10 minutes)

1. **Go to [vercel.com/new](https://vercel.com/new)**
2. **Click "Import Git Repository"**
3. **Select `gobazar-backend` repo**
4. **Configure:**
   - Project Name: `gobazar-backend`
   - Framework: `Other`
   - Build Command: `npm run build && npm run prisma:generate`
   - Output Directory: `dist`

5. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=<paste your database URL>
   JWT_SECRET=<generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
   CLOUDINARY_API_KEY=<your-api-key>
   CLOUDINARY_API_SECRET=<your-api-secret>
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=<your-email@gmail.com>
   SMTP_PASS=<your-app-password>
   OTP_EXPIRY_MINUTES=5
   OTP_LENGTH=6
   PAYU_MERCHANT_KEY=gtKFFx
   PAYU_MERCHANT_SALT=eCwWELxi
   PAYU_API_URL=https://test.payu.in/_payment
   FRONTEND_URL=https://yourdomain.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

6. **Click "Deploy"**
7. **Wait for deployment** (2-5 minutes)
8. **Note your backend URL**: `https://gobazar-backend.vercel.app`

---

## 🎨 Step 4: Deploy Frontend (10 minutes)

1. **Go to [vercel.com/new](https://vercel.com/new)**
2. **Click "Import Git Repository"**
3. **Select `gobazar-frontend` repo**
4. **Configure:**
   - Project Name: `gobazar-frontend`
   - Framework: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://gobazar-backend.vercel.app/api
   ```

6. **Click "Deploy"**
7. **Wait for deployment** (3-5 minutes)
8. **Note your frontend URL**: `https://gobazar-frontend.vercel.app`

---

## ✅ Step 5: Test Deployment (5 minutes)

### Test Backend
```bash
curl https://gobazar-backend.vercel.app/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "database": "connected"
}
```

### Test Frontend
1. Open `https://gobazar-frontend.vercel.app` in browser
2. Open DevTools (F12)
3. Go to Network tab
4. Verify API calls go to backend

---

## 🌐 Step 6: Connect GoDaddy Domain (15 minutes)

### 6.1: Add Domain to Vercel

**Frontend:**
1. Go to Vercel Dashboard → `gobazar-frontend` → Settings → Domains
2. Click "Add Domain"
3. Enter: `yourdomain.com`
4. Click "Add"

**Backend:**
1. Go to Vercel Dashboard → `gobazar-backend` → Settings → Domains
2. Click "Add Domain"
3. Enter: `api.yourdomain.com`
4. Click "Add"

### 6.2: Update GoDaddy Nameservers

1. **Go to [godaddy.com](https://www.godaddy.com)**
2. **Log in → My Products → Your Domain**
3. **Click "Manage DNS"** or **"Nameservers"**
4. **Click "Change Nameservers"**
5. **Select "Custom"**
6. **Replace with:**
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
7. **Save**

**⏳ Wait 24-48 hours for DNS propagation**

---

## 🔗 Step 7: Update API URL (After DNS Propagation)

Once domain is working:

1. **Go to Vercel Dashboard → `gobazar-frontend` → Settings → Environment Variables**
2. **Update `NEXT_PUBLIC_API_URL`:**
   ```
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
   ```
3. **Save** (auto-redeploy)

---

## 🧪 Step 8: Final Testing

### Test All URLs
```bash
# Frontend
curl https://yourdomain.com
curl https://www.yourdomain.com

# Backend API
curl https://api.yourdomain.com/api/health
```

### Test in Browser
1. Open `https://yourdomain.com`
2. Try login
3. Browse products
4. Add to cart
5. Test checkout

---

## 📋 Deployment Checklist

- [ ] Backend pushed to GitHub
- [ ] Frontend pushed to GitHub
- [ ] Database created (Vercel Postgres or Supabase)
- [ ] Backend deployed to Vercel
- [ ] Backend environment variables set
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variables set
- [ ] Backend API responding at `/api/health`
- [ ] Frontend loads without errors
- [ ] GoDaddy nameservers updated
- [ ] DNS propagation complete (24-48 hours)
- [ ] Custom domains working
- [ ] Frontend API URL updated
- [ ] All features tested

---

## 🆘 Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| Build fails | Run `npm run build` locally to see errors |
| 502 Bad Gateway | Check DATABASE_URL in environment variables |
| API not found | Verify NEXT_PUBLIC_API_URL in frontend |
| Domain not working | Wait 24-48 hours for DNS propagation |
| CORS error | Update FRONTEND_URL in backend |
| SSL not issued | Wait 24 hours for certificate generation |

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **GoDaddy Support**: https://www.godaddy.com/help

---

## 🎉 You're Done!

Your GoBazar app is now live on:
- **Frontend**: `https://yourdomain.com`
- **Backend API**: `https://api.yourdomain.com/api`

**Total time**: ~1 hour (excluding DNS propagation)

For detailed guides, see:
- `VERCEL_DEPLOYMENT_COMPLETE_GUIDE.md`
- `ENVIRONMENT_VARIABLES_SETUP.md`
- `GODADDY_DOMAIN_SETUP.md`
