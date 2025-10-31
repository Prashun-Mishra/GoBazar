# Deployment Troubleshooting Guide

Common issues and solutions for Vercel deployment with GoBazar.

---

## Backend Deployment Issues

### 1. Build Fails with "Cannot find module" Error

**Error Message:**
```
Error: Cannot find module '@prisma/client'
```

**Solutions:**
1. **Ensure dependencies are installed:**
   ```bash
   cd gobazar-backend
   npm install
   npm run prisma:generate
   ```

2. **Check package.json has all dependencies:**
   - Verify `@prisma/client` is listed
   - Verify `prisma` is listed

3. **In Vercel, set build command:**
   ```
   npm run build && npm run prisma:generate
   ```

4. **Verify vercel.json is correct:**
   ```json
   {
     "buildCommand": "npm run build && npm run prisma:generate",
     "installCommand": "npm install"
   }
   ```

---

### 2. Build Fails with TypeScript Errors

**Error Message:**
```
error TS2307: Cannot find module 'express'
```

**Solutions:**
1. **Run build locally to see full errors:**
   ```bash
   npm run build
   ```

2. **Fix TypeScript errors:**
   - Check imports are correct
   - Verify type definitions are installed
   - Check tsconfig.json

3. **Install missing types:**
   ```bash
   npm install --save-dev @types/express @types/node
   ```

4. **Push fixed code to GitHub:**
   ```bash
   git add .
   git commit -m "Fix TypeScript errors"
   git push
   ```

5. **Redeploy in Vercel** (auto-redeploy after push)

---

### 3. 502 Bad Gateway Error

**Error Message:**
```
502 Bad Gateway
```

**Solutions:**
1. **Check backend logs in Vercel:**
   - Go to Vercel Dashboard → Backend Project → Deployments
   - Click latest deployment
   - Check logs for errors

2. **Verify DATABASE_URL is set:**
   - Go to Settings → Environment Variables
   - Check DATABASE_URL exists
   - Verify connection string format

3. **Test database connection:**
   ```bash
   # Locally
   psql $DATABASE_URL
   ```

4. **Check if database is running:**
   - Vercel Postgres: Check in Vercel Storage
   - Supabase: Check in Supabase dashboard

5. **Redeploy backend:**
   - Go to Deployments
   - Click "Redeploy" on latest deployment

---

### 4. Database Connection Timeout

**Error Message:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solutions:**
1. **Verify DATABASE_URL format:**
   ```
   ✅ postgresql://user:password@host:5432/database
   ❌ postgres://user:password@host:5432/database
   ❌ postgresql://localhost:5432/database
   ```

2. **Check database credentials:**
   - Username correct
   - Password correct (no special characters issues)
   - Database name correct

3. **Verify database is accessible:**
   - Check firewall rules
   - Verify IP whitelist (if applicable)
   - Test locally first

4. **For Vercel Postgres:**
   - Go to Vercel Storage
   - Check database status
   - Verify region is correct

---

### 5. CORS Error from Frontend

**Error Message:**
```
Access to XMLHttpRequest at 'https://api.yourdomain.com/api/...' 
from origin 'https://yourdomain.com' has been blocked by CORS policy
```

**Solutions:**
1. **Update FRONTEND_URL in backend:**
   - Go to Vercel Backend → Settings → Environment Variables
   - Update `FRONTEND_URL` to your frontend domain
   - Save and redeploy

2. **Verify CORS configuration in backend:**
   - Check `src/server.ts` has CORS setup
   - Verify frontend URL is whitelisted

3. **Check backend CORS middleware:**
   ```typescript
   app.use(cors({
     origin: config.frontendUrl,
     credentials: true,
   }));
   ```

4. **Redeploy backend:**
   - Changes to environment variables trigger auto-redeploy

---

### 6. Memory Limit Exceeded

**Error Message:**
```
Error: JavaScript heap out of memory
```

**Solutions:**
1. **Increase memory in vercel.json:**
   ```json
   {
     "functions": {
       "dist/server.js": {
         "memory": 1024
       }
     }
   }
   ```

2. **Optimize code:**
   - Check for memory leaks
   - Avoid loading large files in memory
   - Use streaming for large responses

3. **Redeploy with updated vercel.json**

---

### 7. Timeout Error (Function Timeout)

**Error Message:**
```
Error: Function execution timeout
```

**Solutions:**
1. **Increase timeout in vercel.json:**
   ```json
   {
     "functions": {
       "dist/server.js": {
         "maxDuration": 60
       }
     }
   }
   ```

2. **Optimize slow endpoints:**
   - Add database indexes
   - Cache results
   - Use pagination

3. **Check for infinite loops:**
   - Review recent code changes
   - Test locally

---

## Frontend Deployment Issues

### 1. Build Fails with "Cannot find module"

**Error Message:**
```
Module not found: Can't resolve 'next/router'
```

**Solutions:**
1. **Run build locally:**
   ```bash
   cd blinkit-clone
   npm run build
   ```

2. **Install missing dependencies:**
   ```bash
   npm install
   npm install next@latest
   ```

3. **Check imports are correct:**
   - Verify file paths
   - Check for typos

4. **Push to GitHub and redeploy**

---

### 2. API Calls Return 404

**Error Message:**
```
GET https://api.yourdomain.com/api/products 404 Not Found
```

**Solutions:**
1. **Verify NEXT_PUBLIC_API_URL:**
   - Go to Frontend Settings → Environment Variables
   - Check `NEXT_PUBLIC_API_URL` is correct
   - Should be: `https://api.yourdomain.com/api`

2. **Verify backend is running:**
   ```bash
   curl https://api.yourdomain.com/api/health
   ```

3. **Check backend is deployed:**
   - Go to Vercel Backend Dashboard
   - Verify latest deployment is successful

4. **Redeploy frontend:**
   - Changes to environment variables trigger auto-redeploy
   - Or manually redeploy

---

### 3. Blank Page or 404 on Frontend

**Error Message:**
```
404 - This page could not be found
```

**Solutions:**
1. **Check build output:**
   - Go to Vercel Dashboard → Deployments
   - Check build logs for errors

2. **Verify next.config.js:**
   - Check for syntax errors
   - Verify redirects are correct

3. **Check .next folder:**
   - Verify build created .next folder
   - Check for missing pages

4. **Redeploy:**
   ```bash
   git push origin main
   ```

---

### 4. Styles Not Loading (CSS Missing)

**Error Message:**
```
CSS file not loading, page looks unstyled
```

**Solutions:**
1. **Verify Tailwind CSS is configured:**
   - Check `tailwind.config.ts` exists
   - Check `postcss.config.mjs` exists

2. **Check globals.css is imported:**
   - Go to `app/layout.tsx`
   - Verify `import './globals.css'`

3. **Rebuild locally:**
   ```bash
   npm run build
   npm run start
   ```

4. **Push and redeploy**

---

### 5. Environment Variables Not Working

**Error Message:**
```
NEXT_PUBLIC_API_URL is undefined
```

**Solutions:**
1. **Verify variable is set in Vercel:**
   - Go to Frontend Settings → Environment Variables
   - Check `NEXT_PUBLIC_API_URL` exists

2. **Verify variable name starts with NEXT_PUBLIC_:**
   - Only variables with this prefix are exposed to browser
   - Private variables won't work in frontend

3. **Redeploy after adding variables:**
   - Vercel auto-redeploys on variable changes
   - Or manually trigger redeploy

4. **Check in browser console:**
   ```javascript
   console.log(process.env.NEXT_PUBLIC_API_URL)
   ```

---

### 6. Image Not Loading

**Error Message:**
```
Image from "https://..." is not valid
```

**Solutions:**
1. **Verify image URL is accessible:**
   - Try opening URL in browser
   - Check image exists

2. **Add image domain to next.config.js:**
   ```javascript
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: 'res.cloudinary.com',
       },
     ],
   }
   ```

3. **Redeploy**

---

## Domain & DNS Issues

### 1. Domain Not Resolving

**Error Message:**
```
DNS_PROBE_FINISHED_NXDOMAIN
```

**Solutions:**
1. **Wait for DNS propagation:**
   - Changes take 24-48 hours
   - Check status: [whatsmydns.net](https://www.whatsmydns.net/)

2. **Verify nameservers in GoDaddy:**
   - Go to GoDaddy → My Products → Your Domain
   - Check nameservers are:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```

3. **Verify domain is added in Vercel:**
   - Go to Vercel Project → Settings → Domains
   - Check domain is listed

4. **Clear DNS cache:**
   ```bash
   # Windows
   ipconfig /flushdns
   
   # Mac
   sudo dscacheutil -flushcache
   
   # Linux
   sudo systemctl restart systemd-resolved
   ```

---

### 2. SSL Certificate Not Issued

**Error Message:**
```
SSL_ERROR_RX_RECORD_TOO_LONG
```

**Solutions:**
1. **Wait for certificate generation:**
   - Takes up to 24 hours
   - Check status in Vercel Dashboard

2. **Verify domain is properly configured:**
   - Go to Vercel → Settings → Domains
   - Check domain status

3. **Remove and re-add domain:**
   - Go to Settings → Domains
   - Click domain
   - Click "Remove"
   - Re-add domain

---

### 3. Subdomain Not Working

**Error Message:**
```
Cannot reach api.yourdomain.com
```

**Solutions:**
1. **Verify subdomain is added in Vercel:**
   - Go to Backend Project → Settings → Domains
   - Check `api.yourdomain.com` is listed

2. **Check DNS records:**
   - Use [mxtoolbox.com](https://mxtoolbox.com/)
   - Verify CNAME records are created

3. **Wait for DNS propagation:**
   - DNS changes take 24-48 hours

4. **Test with nslookup:**
   ```bash
   nslookup api.yourdomain.com
   ```

---

## Database Issues

### 1. Cannot Connect to Database

**Error Message:**
```
Error: connect ECONNREFUSED
```

**Solutions:**
1. **Verify DATABASE_URL:**
   - Check format is correct
   - Verify credentials
   - Test locally

2. **Check database is running:**
   - Vercel Postgres: Check in Vercel Storage
   - Supabase: Check in Supabase dashboard

3. **Verify IP whitelist:**
   - Some databases require IP whitelist
   - Add Vercel IP ranges

---

### 2. Migration Failed

**Error Message:**
```
Migration failed: Foreign key constraint failed
```

**Solutions:**
1. **Check schema for errors:**
   - Go to `prisma/schema.prisma`
   - Verify relationships

2. **Run migration locally first:**
   ```bash
   npx prisma migrate dev
   ```

3. **Fix errors and push:**
   ```bash
   git add .
   git commit -m "Fix migration"
   git push
   ```

---

### 3. Prisma Client Not Generated

**Error Message:**
```
Error: @prisma/client did not initialize yet
```

**Solutions:**
1. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

2. **Add to build command in vercel.json:**
   ```json
   {
     "buildCommand": "npm run build && npm run prisma:generate"
   }
   ```

3. **Redeploy**

---

## Payment Gateway Issues

### 1. PayU Payment Not Working

**Error Message:**
```
Payment gateway error
```

**Solutions:**
1. **Verify PayU credentials:**
   - Check `PAYU_MERCHANT_KEY`
   - Check `PAYU_MERCHANT_SALT`
   - Check `PAYU_API_URL`

2. **Test with sandbox credentials:**
   ```
   PAYU_MERCHANT_KEY=gtKFFx
   PAYU_MERCHANT_SALT=eCwWELxi
   PAYU_API_URL=https://test.payu.in/_payment
   ```

3. **Check PayU dashboard:**
   - Verify merchant account is active
   - Check transaction logs

4. **Verify FRONTEND_URL:**
   - PayU needs callback URL
   - Should match your frontend domain

---

## Performance Issues

### 1. Slow API Response

**Solutions:**
1. **Check database performance:**
   - Add indexes to frequently queried columns
   - Check for slow queries

2. **Enable caching:**
   - Cache API responses
   - Use Redis if available

3. **Optimize queries:**
   - Use pagination
   - Select only needed fields

4. **Check Vercel metrics:**
   - Go to Vercel Dashboard → Analytics
   - Check response times

---

### 2. Frontend Slow to Load

**Solutions:**
1. **Check build size:**
   ```bash
   npm run build
   # Check .next folder size
   ```

2. **Optimize images:**
   - Use Next.js Image component
   - Compress images

3. **Enable compression:**
   - Vercel enables by default
   - Check in response headers

---

## Debugging Tips

### 1. Check Vercel Logs

```bash
# Install Vercel CLI
npm install -g vercel

# View logs
vercel logs

# View specific project logs
vercel logs --project=gobazar-backend
```

### 2. Enable Debug Mode

**Backend:**
```env
DEBUG=*
```

**Frontend:**
```env
DEBUG=next:*
```

### 3. Test Locally First

Always test changes locally before deploying:
```bash
# Backend
npm run dev

# Frontend
npm run dev
```

### 4. Check Browser Console

- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

---

## Getting Help

1. **Check logs in Vercel Dashboard**
2. **Search GitHub issues** for similar problems
3. **Check documentation:**
   - [Vercel Docs](https://vercel.com/docs)
   - [Next.js Docs](https://nextjs.org/docs)
   - [Prisma Docs](https://www.prisma.io/docs)
4. **Ask on forums:**
   - Stack Overflow
   - GitHub Discussions
   - Vercel Community

---

## Quick Checklist

- [ ] Backend builds locally without errors
- [ ] Frontend builds locally without errors
- [ ] DATABASE_URL is set and correct
- [ ] All environment variables are set
- [ ] Backend API is responding
- [ ] Frontend can reach backend API
- [ ] Domain nameservers are updated
- [ ] DNS has propagated (24-48 hours)
- [ ] SSL certificate is issued
- [ ] All features are tested

---

**Last Updated**: 2024
**Status**: Troubleshooting Guide Complete
