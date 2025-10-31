# 🚀 GoBazar Deployment with Supabase - Complete Guide

## ✅ Code Review: Supabase Compatible!

Your backend code is **100% compatible with Supabase PostgreSQL**. No code changes needed!

---

## 📋 Complete Deployment Steps

### Phase 1: Setup Supabase Database (10 minutes)

#### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"

#### Step 2: Configure Project
- **Name**: `gobazar-db` (or your choice)
- **Database Password**: Create a strong password (save it!)
- **Region**: Choose closest to you (e.g., Mumbai/Singapore)
- **Pricing Plan**: Free tier is fine for testing

#### Step 3: Wait for Database Creation
- Takes 2-3 minutes
- You'll see "Setting up project..." status

#### Step 4: Get Database Connection String
1. Once ready, go to **Project Settings** (gear icon)
2. Click **Database** in left sidebar
3. Scroll to **Connection string**
4. Select **URI** tab
5. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```
6. **IMPORTANT**: Replace `[YOUR-PASSWORD]` with your actual password

**Example**:
```
postgresql://postgres:MyStr0ngP@ssw0rd@db.abcdefghijklmnop.supabase.co:5432/postgres
```

---

### Phase 2: Deploy Backend to Vercel (15 minutes)

#### Step 1: Push Backend to GitHub
```bash
cd "C:\Users\mishr\Downloads\Go Bazar\gobazar-backend"
git add .
git commit -m "Ready for production deployment with Supabase"
git push origin main
```

#### Step 2: Create Vercel Project
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import" next to your `gobazar-backend` repository
3. Configure project:
   - **Project Name**: `gobazar-backend`
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build && npm run prisma:generate`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Step 3: Add Environment Variables

Click **Environment Variables** and add these:

##### Required Variables (6):

```env
NODE_ENV=production
```

```env
PORT=5000
```

```env
DATABASE_URL=postgresql://postgres:YourPassword@db.xxx.supabase.co:5432/postgres
```
**⚠️ Replace with YOUR Supabase connection string!**

```env
JWT_SECRET=
```
**Generate with this command:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste it here.

```env
JWT_EXPIRES_IN=7d
```

```env
FRONTEND_URL=https://gobazar-frontend.vercel.app
```
**Note**: Update this later with your actual frontend URL

##### Recommended Variables (7):

**Cloudinary** (for image uploads):
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Gmail SMTP** (for emails/OTP):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
```

##### Optional Variables (6):

**PayU Payment** (use test credentials initially):
```env
PAYU_MERCHANT_KEY=gtKFFx
PAYU_MERCHANT_SALT=eCwWELxi
PAYU_API_URL=https://test.payu.in/_payment
```

**OTP Configuration**:
```env
OTP_EXPIRY_MINUTES=5
OTP_LENGTH=6
```

**Rate Limiting**:
```env
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Step 4: Deploy Backend
1. Click **Deploy**
2. Wait 3-5 minutes
3. Once deployed, you'll get a URL like: `https://gobazar-backend.vercel.app`
4. **Save this URL!** You'll need it for frontend

#### Step 5: Run Database Migrations
1. Go to your backend project in Vercel
2. Click **Settings** → **Environment Variables**
3. Verify `DATABASE_URL` is set correctly
4. Go to **Deployments** tab
5. Click on latest deployment
6. Click **...** (three dots) → **Redeploy**
7. This will run migrations automatically

**Alternative**: Run migrations locally:
```bash
cd gobazar-backend
# Create .env file with your Supabase DATABASE_URL
echo DATABASE_URL=postgresql://postgres:YourPassword@db.xxx.supabase.co:5432/postgres > .env
npx prisma migrate deploy
```

#### Step 6: Verify Backend
```bash
curl https://gobazar-backend.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "database": "connected"
}
```

---

### Phase 3: Deploy Frontend to Vercel (10 minutes)

#### Step 1: Push Frontend to GitHub
```bash
cd "C:\Users\mishr\Downloads\Go Bazar\blinkit-clone"
git add .
git commit -m "Ready for production deployment"
git push origin main
```

#### Step 2: Create Vercel Project
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import" next to your `blinkit-clone` repository
3. Configure project:
   - **Project Name**: `gobazar-frontend`
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

#### Step 3: Add Environment Variables

Click **Environment Variables** and add:

```env
NEXT_PUBLIC_API_URL=https://gobazar-backend.vercel.app/api
```
**⚠️ Replace with YOUR backend URL from Step 2!**

#### Step 4: Deploy Frontend
1. Click **Deploy**
2. Wait 3-5 minutes
3. Once deployed, you'll get a URL like: `https://gobazar-frontend.vercel.app`

#### Step 5: Update Backend FRONTEND_URL
1. Go to backend project in Vercel
2. Click **Settings** → **Environment Variables**
3. Find `FRONTEND_URL`
4. Click **Edit**
5. Change to: `https://gobazar-frontend.vercel.app`
6. Click **Save**
7. Go to **Deployments** → Click **...** → **Redeploy**

#### Step 6: Test Frontend
1. Open `https://gobazar-frontend.vercel.app` in browser
2. Check browser console (F12) for errors
3. Try browsing products
4. Test login/signup

---

### Phase 4: Verify Supabase Database (5 minutes)

#### Check Tables Created
1. Go to Supabase Dashboard
2. Click **Table Editor** in left sidebar
3. You should see tables:
   - users
   - addresses
   - categories
   - subcategories
   - products
   - orders
   - cart_items
   - etc.

#### Check Database Logs
1. Click **Database** → **Logs**
2. Look for connection logs from Vercel
3. Should see successful queries

#### Optional: View Data
1. Click **Table Editor**
2. Click any table to view data
3. You can manually add test data here

---

## 📝 Environment Variables Summary

### Backend Environment Variables (19 total)

#### ✅ Required (6):
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://postgres:YourPassword@db.xxx.supabase.co:5432/postgres
JWT_SECRET=<generated-32-char-string>
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://gobazar-frontend.vercel.app
```

#### ⚠️ Recommended (7):
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### 🔵 Optional (6):
```env
PAYU_MERCHANT_KEY=gtKFFx
PAYU_MERCHANT_SALT=eCwWELxi
PAYU_API_URL=https://test.payu.in/_payment
OTP_EXPIRY_MINUTES=5
OTP_LENGTH=6
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables (1 total)

```env
NEXT_PUBLIC_API_URL=https://gobazar-backend.vercel.app/api
```

---

## 🔐 How to Get Credentials

### 1. Supabase DATABASE_URL ✅
**Already covered above** - Get from Supabase Dashboard → Settings → Database

### 2. JWT_SECRET
```bash
# Run this command in terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Example output:
# 8f3a9b2c7d1e4f5a6b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
```

### 3. Cloudinary Credentials
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up / Log in
3. Dashboard shows:
   - **Cloud Name**: `your-cloud-name`
   - **API Key**: `123456789012345`
   - **API Secret**: `abcdefghijklmnopqrstuvwxyz`

### 4. Gmail SMTP App Password
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not enabled)
3. Search for "App passwords"
4. Click **App passwords**
5. Select:
   - **App**: Mail
   - **Device**: Windows Computer
6. Click **Generate**
7. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)
8. Use it as `SMTP_PASS` (remove spaces: `abcdefghijklmnop`)

### 5. PayU Credentials
**For Testing** (use these):
```
PAYU_MERCHANT_KEY=gtKFFx
PAYU_MERCHANT_SALT=eCwWELxi
PAYU_API_URL=https://test.payu.in/_payment
```

**For Production**:
1. Go to [payu.in](https://www.payu.in)
2. Sign up for merchant account
3. Get credentials from dashboard

---

## 🧪 Testing Your Deployment

### Test Backend API
```bash
# Health check
curl https://gobazar-backend.vercel.app/api/health

# Expected: {"status":"ok","database":"connected"}

# Test products endpoint
curl https://gobazar-backend.vercel.app/api/products

# Expected: {"products":[...]}
```

### Test Frontend
1. Open `https://gobazar-frontend.vercel.app`
2. Open browser DevTools (F12)
3. Go to **Network** tab
4. Browse products
5. Check API calls are successful (status 200)

### Test Database Connection
1. Go to Supabase Dashboard
2. Click **Database** → **Logs**
3. You should see queries from your backend

### Test Authentication
1. Try to sign up with phone number
2. Should receive OTP email (if SMTP configured)
3. Verify OTP works
4. Check user created in Supabase:
   - Table Editor → users table

---

## 🎯 Deployment Checklist

### Supabase Setup ✅
- [ ] Created Supabase project
- [ ] Noted database password
- [ ] Copied DATABASE_URL
- [ ] Verified connection string format

### Backend Deployment ✅
- [ ] Pushed code to GitHub
- [ ] Created Vercel project
- [ ] Added all environment variables
- [ ] Deployed successfully
- [ ] Verified health endpoint
- [ ] Database migrations ran
- [ ] Tables created in Supabase

### Frontend Deployment ✅
- [ ] Pushed code to GitHub
- [ ] Created Vercel project
- [ ] Added NEXT_PUBLIC_API_URL
- [ ] Deployed successfully
- [ ] Updated backend FRONTEND_URL
- [ ] Redeployed backend
- [ ] Tested frontend loads

### Testing ✅
- [ ] Backend health check passes
- [ ] Frontend loads without errors
- [ ] API calls work from frontend
- [ ] Database queries visible in Supabase
- [ ] Authentication works (if SMTP configured)

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Database connection failed"
**Cause**: Wrong DATABASE_URL or password

**Solution**:
1. Go to Supabase → Settings → Database
2. Copy connection string again
3. Make sure you replaced `[YOUR-PASSWORD]` with actual password
4. Update in Vercel environment variables
5. Redeploy

### Issue 2: "Prisma migration failed"
**Cause**: Database not initialized

**Solution**:
```bash
# Run locally:
cd gobazar-backend
npx prisma migrate deploy
# OR
npx prisma db push
```

### Issue 3: "CORS error" in frontend
**Cause**: FRONTEND_URL not set correctly in backend

**Solution**:
1. Backend Vercel → Settings → Environment Variables
2. Update `FRONTEND_URL` to your frontend URL
3. Redeploy backend

### Issue 4: "Email not sending"
**Cause**: SMTP credentials not configured

**Solution**:
- Add SMTP variables to backend
- Or skip for now (app works without email)

### Issue 5: "Images not uploading"
**Cause**: Cloudinary not configured

**Solution**:
- Add Cloudinary variables to backend
- Or skip for now (can add later)

---

## 🎉 Success Indicators

Your deployment is successful when:

✅ **Backend**:
- Health endpoint returns `{"status":"ok","database":"connected"}`
- No errors in Vercel logs
- Supabase shows connection logs

✅ **Frontend**:
- Website loads at your Vercel URL
- No console errors (F12)
- Products display correctly
- API calls successful (Network tab)

✅ **Database**:
- Tables visible in Supabase Table Editor
- Queries visible in Database Logs
- Can view/edit data in Supabase

✅ **Integration**:
- Frontend can fetch data from backend
- Authentication works (if SMTP configured)
- Cart functionality works
- Orders can be created

---

## 📊 Deployment Timeline

| Task | Time | Status |
|------|------|--------|
| Setup Supabase | 10 min | ⏳ Your turn |
| Deploy Backend | 15 min | ⏳ Your turn |
| Deploy Frontend | 10 min | ⏳ Your turn |
| Verify & Test | 10 min | ⏳ Your turn |
| **Total** | **~45 min** | |

---

## 🔄 Post-Deployment Updates

### Adding Custom Domain (Optional)
1. Buy domain from GoDaddy
2. Add to Vercel projects
3. Update nameservers in GoDaddy
4. Wait 24-48 hours for DNS
5. Update `FRONTEND_URL` in backend
6. Update `NEXT_PUBLIC_API_URL` in frontend

### Adding More Features
- Add Cloudinary for image uploads
- Add SMTP for emails
- Switch PayU to production credentials
- Add monitoring/analytics

### Database Backups
1. Supabase automatically backs up daily
2. Can restore from Supabase dashboard
3. Can export data anytime

---

## 💡 Pro Tips

1. **Start with minimum variables** (6 required)
   - Get app working first
   - Add optional features later

2. **Use Supabase Table Editor**
   - View data easily
   - Add test data manually
   - Debug database issues

3. **Check Vercel logs**
   - Deployments → Latest → Logs
   - See real-time errors
   - Debug issues quickly

4. **Use test credentials**
   - PayU test mode for development
   - Switch to production when ready

5. **Monitor Supabase usage**
   - Free tier: 500MB database
   - 2GB bandwidth
   - Upgrade if needed

---

## 📞 Support Resources

### Supabase
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)

### Vercel
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

### Your Guides
- `DEPLOYMENT_TROUBLESHOOTING.md` - Common issues
- `BACKEND_ENV_COMPLETE.md` - All environment variables
- `ENVIRONMENT_VARIABLES_SETUP.md` - Detailed setup

---

## ✅ Summary

**Your Code**: ✅ Supabase Compatible (no changes needed)

**Required Steps**:
1. Create Supabase database (10 min)
2. Deploy backend to Vercel (15 min)
3. Deploy frontend to Vercel (10 min)
4. Test everything (10 min)

**Environment Variables**:
- Backend: 6 required + 13 optional
- Frontend: 1 required

**Total Time**: ~45 minutes

---

## 🚀 Ready to Deploy!

**Start here**:
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get DATABASE_URL
4. Follow steps above

**You've got this!** 💪

---

**Last Updated**: October 31, 2024  
**Database**: Supabase PostgreSQL  
**Status**: ✅ Ready to Deploy
