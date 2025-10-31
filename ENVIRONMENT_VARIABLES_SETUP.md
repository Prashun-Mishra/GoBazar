# Environment Variables Setup for Vercel Deployment

This document provides detailed instructions for setting up environment variables in Vercel for both backend and frontend.

---

## Backend Environment Variables

### How to Add Backend Environment Variables in Vercel

1. **Go to Vercel Dashboard**
2. **Select your backend project** (`gobazar-backend`)
3. **Click "Settings"**
4. **Go to "Environment Variables"**
5. **Add each variable below**

### Required Backend Variables

#### 1. Server Configuration
```
NODE_ENV = production
PORT = 5000
```

#### 2. Database Configuration
```
DATABASE_URL = postgresql://username:password@host:5432/gobazar_db
```

**Where to get DATABASE_URL:**
- **Vercel Postgres**: Copy from Vercel Storage dashboard
- **Supabase**: Go to Settings → Database → Connection string (URI)

#### 3. JWT Configuration
```
JWT_SECRET = your-very-long-secret-key-minimum-32-characters-long
JWT_EXPIRES_IN = 7d
```

**Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 4. Cloudinary Configuration (Image Upload)
```
CLOUDINARY_CLOUD_NAME = your-cloudinary-cloud-name
CLOUDINARY_API_KEY = your-cloudinary-api-key
CLOUDINARY_API_SECRET = your-cloudinary-api-secret
```

**How to get Cloudinary credentials:**
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up or log in
3. Go to Dashboard
4. Copy Cloud Name, API Key, and API Secret

#### 5. Email Configuration (Gmail SMTP)
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = your-app-password
```

**How to generate Gmail App Password:**
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Go to "App passwords"
4. Select "Mail" and "Windows Computer"
5. Copy the generated password

#### 6. OTP Configuration
```
OTP_EXPIRY_MINUTES = 5
OTP_LENGTH = 6
```

#### 7. Payment Gateway Configuration (PayU)
```
PAYU_MERCHANT_KEY = your-payu-merchant-key
PAYU_MERCHANT_SALT = your-payu-merchant-salt
PAYU_API_URL = https://secure.payu.in/_payment
```

**For Testing (Sandbox):**
```
PAYU_MERCHANT_KEY = gtKFFx
PAYU_MERCHANT_SALT = eCwWELxi
PAYU_API_URL = https://test.payu.in/_payment
```

**How to get PayU credentials:**
1. Go to [payu.in](https://www.payu.in)
2. Create merchant account
3. Go to Dashboard → Settings
4. Copy Merchant Key and Salt

#### 8. CORS Configuration
```
FRONTEND_URL = https://yourdomain.com
```

**Replace with your actual domain:**
- During development: `https://gobazar-frontend.vercel.app`
- With custom domain: `https://www.yourdomain.com`

#### 9. Rate Limiting
```
RATE_LIMIT_WINDOW_MS = 900000
RATE_LIMIT_MAX_REQUESTS = 100
```

---

## Frontend Environment Variables

### How to Add Frontend Environment Variables in Vercel

1. **Go to Vercel Dashboard**
2. **Select your frontend project** (`gobazar-frontend`)
3. **Click "Settings"**
4. **Go to "Environment Variables"**
5. **Add the variable below**

### Required Frontend Variables

#### API URL Configuration
```
NEXT_PUBLIC_API_URL = https://gobazar-backend.vercel.app/api
```

**Update this based on your deployment stage:**

| Stage | Value |
|-------|-------|
| Development | `http://localhost:5000/api` |
| Vercel (no domain) | `https://gobazar-backend.vercel.app/api` |
| Custom domain | `https://api.yourdomain.com/api` |

**Note**: Variables starting with `NEXT_PUBLIC_` are exposed to the browser, so only use for non-sensitive data.

---

## Step-by-Step Environment Variable Setup

### For Backend (gobazar-backend)

1. **Open Vercel Dashboard → gobazar-backend → Settings → Environment Variables**

2. **Add these variables one by one:**

   | Variable | Value | Example |
   |----------|-------|---------|
   | NODE_ENV | production | production |
   | PORT | 5000 | 5000 |
   | DATABASE_URL | Your DB URL | postgresql://user:pass@host:5432/db |
   | JWT_SECRET | 32+ char random | abc123def456... |
   | JWT_EXPIRES_IN | 7d | 7d |
   | CLOUDINARY_CLOUD_NAME | Your cloud name | my-cloud |
   | CLOUDINARY_API_KEY | Your API key | 123456789 |
   | CLOUDINARY_API_SECRET | Your API secret | abc123def456 |
   | SMTP_HOST | smtp.gmail.com | smtp.gmail.com |
   | SMTP_PORT | 587 | 587 |
   | SMTP_USER | Your email | your-email@gmail.com |
   | SMTP_PASS | App password | xxxx xxxx xxxx xxxx |
   | OTP_EXPIRY_MINUTES | 5 | 5 |
   | OTP_LENGTH | 6 | 6 |
   | PAYU_MERCHANT_KEY | Your key | gtKFFx (test) |
   | PAYU_MERCHANT_SALT | Your salt | eCwWELxi (test) |
   | PAYU_API_URL | PayU URL | https://test.payu.in/_payment |
   | FRONTEND_URL | Your frontend | https://yourdomain.com |
   | RATE_LIMIT_WINDOW_MS | 900000 | 900000 |
   | RATE_LIMIT_MAX_REQUESTS | 100 | 100 |

3. **Click "Save"**

4. **Redeploy backend** (Vercel will auto-redeploy)

### For Frontend (gobazar-frontend)

1. **Open Vercel Dashboard → gobazar-frontend → Settings → Environment Variables**

2. **Add this variable:**

   | Variable | Value |
   |----------|-------|
   | NEXT_PUBLIC_API_URL | https://gobazar-backend.vercel.app/api |

3. **Click "Save"**

4. **Redeploy frontend** (Vercel will auto-redeploy)

---

## Verifying Environment Variables

### Backend Verification

1. **Check backend logs in Vercel:**
   - Go to Vercel Dashboard → gobazar-backend → Deployments
   - Click latest deployment
   - Check logs for configuration details

2. **Test API endpoint:**
   ```bash
   curl https://gobazar-backend.vercel.app/api/health
   ```

3. **Expected response:**
   ```json
   {
     "status": "ok",
     "database": "connected",
     "timestamp": "2024-01-01T00:00:00Z"
   }
   ```

### Frontend Verification

1. **Check frontend logs in Vercel:**
   - Go to Vercel Dashboard → gobazar-frontend → Deployments
   - Click latest deployment
   - Check build logs

2. **Open frontend in browser:**
   - Go to `https://gobazar-frontend.vercel.app`
   - Open browser DevTools (F12)
   - Check Network tab for API calls
   - Verify API URL is correct

---

## Common Issues & Solutions

### Issue: "DATABASE_URL is not set"
**Solution:**
1. Go to backend Environment Variables
2. Verify DATABASE_URL is added
3. Check the connection string format
4. Redeploy backend

### Issue: "Cannot connect to database"
**Solution:**
1. Verify DATABASE_URL is correct
2. Check database is running
3. Verify IP whitelist (if using external DB)
4. Test connection locally first

### Issue: "API calls return 404"
**Solution:**
1. Check NEXT_PUBLIC_API_URL in frontend
2. Verify backend is deployed and running
3. Check CORS configuration in backend
4. Redeploy frontend

### Issue: "CORS error in browser console"
**Solution:**
1. Update FRONTEND_URL in backend
2. Ensure frontend domain is whitelisted
3. Check CORS headers in backend
4. Redeploy backend

### Issue: "Email not sending"
**Solution:**
1. Verify SMTP credentials are correct
2. Check Gmail app password is generated
3. Enable "Less secure app access" if needed
4. Test locally first

### Issue: "Payment gateway not working"
**Solution:**
1. Verify PAYU_MERCHANT_KEY and PAYU_MERCHANT_SALT
2. Check PAYU_API_URL is correct
3. Test with sandbox credentials first
4. Check payment logs in PayU dashboard

---

## Security Best Practices

1. **Never commit `.env` files to Git**
   - Already in `.gitignore`

2. **Use strong JWT_SECRET**
   - Minimum 32 characters
   - Use random generation

3. **Rotate secrets regularly**
   - Change JWT_SECRET quarterly
   - Update API keys when needed

4. **Use environment-specific values**
   - Different credentials for dev/prod
   - Use sandbox for testing

5. **Monitor environment variables**
   - Review Vercel audit logs
   - Check for unauthorized changes

---

## Environment Variables Checklist

### Backend
- [ ] NODE_ENV = production
- [ ] PORT = 5000
- [ ] DATABASE_URL = (from Vercel Postgres or Supabase)
- [ ] JWT_SECRET = (32+ character random string)
- [ ] JWT_EXPIRES_IN = 7d
- [ ] CLOUDINARY_CLOUD_NAME = (from Cloudinary)
- [ ] CLOUDINARY_API_KEY = (from Cloudinary)
- [ ] CLOUDINARY_API_SECRET = (from Cloudinary)
- [ ] SMTP_HOST = smtp.gmail.com
- [ ] SMTP_PORT = 587
- [ ] SMTP_USER = (your Gmail)
- [ ] SMTP_PASS = (Gmail app password)
- [ ] OTP_EXPIRY_MINUTES = 5
- [ ] OTP_LENGTH = 6
- [ ] PAYU_MERCHANT_KEY = (from PayU)
- [ ] PAYU_MERCHANT_SALT = (from PayU)
- [ ] PAYU_API_URL = (PayU endpoint)
- [ ] FRONTEND_URL = (your frontend domain)
- [ ] RATE_LIMIT_WINDOW_MS = 900000
- [ ] RATE_LIMIT_MAX_REQUESTS = 100

### Frontend
- [ ] NEXT_PUBLIC_API_URL = (your backend API URL)

---

## Next Steps

1. **Set up all environment variables** in Vercel
2. **Redeploy both projects** after adding variables
3. **Test API connectivity** from frontend
4. **Verify all features** are working
5. **Monitor logs** for any errors

For more information, see the main deployment guide: `VERCEL_DEPLOYMENT_COMPLETE_GUIDE.md`
