# GoDaddy Domain Configuration with Vercel

Complete guide to connect your GoDaddy domain to Vercel for hosting your GoBazar application.

---

## Overview

You'll be setting up:
- **Root domain**: `yourdomain.com` → Frontend
- **Subdomain**: `www.yourdomain.com` → Frontend
- **API subdomain**: `api.yourdomain.com` → Backend

---

## Step 1: Add Domain to Vercel

### For Frontend Project

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Select your frontend project** (`gobazar-frontend`)
3. **Go to "Settings" → "Domains"**
4. **Click "Add Domain"**
5. **Enter your domain**: `yourdomain.com`
6. **Click "Add"**

**Vercel will show you two options:**
- **Nameserver** (Recommended) - Easier setup
- **CNAME** - If you want to keep GoDaddy nameservers

### For Backend Project

1. **Go to Vercel Dashboard**
2. **Select your backend project** (`gobazar-backend`)
3. **Go to "Settings" → "Domains"**
4. **Click "Add Domain"**
5. **Enter**: `api.yourdomain.com`
6. **Click "Add"**

---

## Step 2: Update GoDaddy Nameservers (Recommended Method)

This is the easiest and most reliable method.

### 2.1: Get Vercel Nameservers

When you add a domain to Vercel, you'll see:
```
Nameserver 1: ns1.vercel-dns.com
Nameserver 2: ns2.vercel-dns.com
```

**Note these down or keep this page open.**

### 2.2: Update GoDaddy Nameservers

1. **Go to [GoDaddy.com](https://www.godaddy.com)**
2. **Log in to your account**
3. **Go to "My Products"**
4. **Find your domain** and click on it
5. **Click "Manage DNS"** or **"Nameservers"**

**You should see:**
```
Nameserver 1: ns01.domaincontrol.com
Nameserver 2: ns02.domaincontrol.com
```

6. **Click "Change Nameservers"** or **"Edit"**
7. **Select "Custom"** option
8. **Replace with Vercel nameservers:**
   ```
   Nameserver 1: ns1.vercel-dns.com
   Nameserver 2: ns2.vercel-dns.com
   ```
9. **Save changes**

### 2.3: Wait for DNS Propagation

DNS changes can take **24-48 hours** to fully propagate.

**Check DNS status:**
```bash
# Check if nameservers are updated
nslookup yourdomain.com

# Should show Vercel nameservers
```

---

## Step 3: Configure DNS Records in Vercel

Once nameservers are updated, Vercel automatically manages DNS records.

### Verify in Vercel Dashboard

1. **Go to frontend project → Settings → Domains**
2. **Click on your domain** (`yourdomain.com`)
3. **You should see:**
   - ✅ Domain verified
   - ✅ SSL certificate issued
   - ✅ DNS records configured

### DNS Records Created

Vercel automatically creates:

```
yourdomain.com          A       76.76.19.165
www.yourdomain.com      CNAME   cname.vercel-dns.com
api.yourdomain.com      CNAME   cname.vercel-dns.com
```

---

## Step 4: Configure Root Domain Redirect (Optional)

To redirect `yourdomain.com` to `www.yourdomain.com`:

1. **Go to Vercel Frontend Project → Settings → Domains**
2. **Click on `yourdomain.com`**
3. **Enable "Redirect to www"** (if available)

Or manually:

1. **Add both domains:**
   - `yourdomain.com`
   - `www.yourdomain.com`

2. **In your Next.js `next.config.mjs`**, add redirects:
   ```javascript
   async redirects() {
     return [
       {
         source: '/:path*',
         destination: 'https://www.yourdomain.com/:path*',
         permanent: true,
       },
     ]
   }
   ```

---

## Step 5: Update Frontend API URL

Once domains are working:

1. **Go to Vercel Frontend Project → Settings → Environment Variables**
2. **Update `NEXT_PUBLIC_API_URL`:**
   ```
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
   ```
3. **Click "Save"**
4. **Vercel will auto-redeploy**

---

## Step 6: Verify Everything Works

### Test Frontend
```bash
# Should load your frontend
curl https://yourdomain.com
curl https://www.yourdomain.com
```

### Test Backend API
```bash
# Should return API response
curl https://api.yourdomain.com/api/health
```

### Test in Browser
1. **Open `https://yourdomain.com`**
2. **Open DevTools (F12)**
3. **Go to Network tab**
4. **Check API calls are going to `https://api.yourdomain.com/api`**

---

## Alternative Method: CNAME Records (If Keeping GoDaddy Nameservers)

If you want to keep GoDaddy nameservers and use CNAME records:

### 1. Get CNAME from Vercel

1. **Go to Vercel Frontend Project → Settings → Domains**
2. **Click on your domain**
3. **You'll see:**
   ```
   Type: CNAME
   Name: yourdomain.com
   Value: cname.vercel-dns.com
   ```

### 2. Add CNAME Records in GoDaddy

1. **Go to GoDaddy → My Products → Your Domain**
2. **Click "Manage DNS"**
3. **Find "CNAME" section**
4. **Add records:**

   **For Frontend (www):**
   ```
   Name: www
   Value: cname.vercel-dns.com
   TTL: 1 hour
   ```

   **For Backend (api):**
   ```
   Name: api
   Value: cname.vercel-dns.com
   TTL: 1 hour
   ```

5. **For root domain (@), add A record:**
   ```
   Name: @
   Type: A
   Value: 76.76.19.165
   TTL: 1 hour
   ```

6. **Save changes**

### 3. Wait for DNS Propagation

DNS changes take 24-48 hours to propagate.

---

## Troubleshooting

### Issue: Domain shows "Not Found" in Vercel

**Solution:**
1. Check nameservers are updated in GoDaddy
2. Wait 24-48 hours for DNS propagation
3. Try clearing browser cache
4. Use incognito mode to test

### Issue: SSL Certificate Not Issued

**Solution:**
1. Wait 24 hours for certificate generation
2. Ensure domain is properly configured
3. Check Vercel dashboard for errors
4. Try removing and re-adding domain

### Issue: API calls still going to old URL

**Solution:**
1. Update `NEXT_PUBLIC_API_URL` in environment variables
2. Redeploy frontend
3. Clear browser cache (Ctrl+Shift+Delete)
4. Test in incognito mode

### Issue: "DNS_PROBE_FINISHED_NXDOMAIN" error

**Solution:**
1. DNS hasn't propagated yet (wait 24-48 hours)
2. Verify nameservers in GoDaddy
3. Check domain is added in Vercel
4. Use `nslookup yourdomain.com` to check

### Issue: Subdomain not resolving

**Solution:**
1. Verify subdomain is added in Vercel
2. Check DNS records are created
3. Wait for DNS propagation
4. Ensure CNAME records are correct (if using CNAME method)

---

## DNS Propagation Checker

Use these tools to check DNS status:

1. **[MXToolbox](https://mxtoolbox.com/)**
   - Enter your domain
   - Check DNS records

2. **[What's My DNS](https://www.whatsmydns.net/)**
   - Enter your domain
   - See global DNS propagation status

3. **Command line:**
   ```bash
   # Check nameservers
   nslookup yourdomain.com
   
   # Check DNS records
   dig yourdomain.com
   
   # Check specific subdomain
   nslookup api.yourdomain.com
   ```

---

## SSL Certificate Setup

Vercel automatically provides free SSL certificates via Let's Encrypt.

### Verify SSL Certificate

1. **Go to Vercel Dashboard → Your Domain**
2. **Check "SSL Certificate" status**
3. **Should show:**
   ```
   ✅ SSL Certificate Issued
   Issued by: Let's Encrypt
   Expires: [Date]
   ```

### Force HTTPS

Vercel automatically redirects HTTP to HTTPS.

To verify:
```bash
# Should redirect to https://
curl -I http://yourdomain.com
```

---

## Email Configuration (Optional)

If you want to use email with your domain:

### MX Records (For Email)

Add these MX records in GoDaddy DNS:

```
Priority: 10
Value: aspmx.l.google.com

Priority: 20
Value: alt1.aspmx.l.google.com

Priority: 30
Value: alt2.aspmx.l.google.com
```

This allows you to use Gmail with your domain.

---

## Final Checklist

- [ ] Domain added to Vercel (frontend project)
- [ ] API subdomain added to Vercel (backend project)
- [ ] GoDaddy nameservers updated to Vercel
- [ ] DNS propagation complete (24-48 hours)
- [ ] Frontend accessible at `https://yourdomain.com`
- [ ] Backend API accessible at `https://api.yourdomain.com/api`
- [ ] SSL certificates issued for all domains
- [ ] Frontend environment variables updated with new API URL
- [ ] Frontend redeployed
- [ ] All features tested and working
- [ ] Email configured (if needed)

---

## Quick Reference

| Domain | Purpose | Vercel Project |
|--------|---------|-----------------|
| yourdomain.com | Frontend (root) | gobazar-frontend |
| www.yourdomain.com | Frontend (www) | gobazar-frontend |
| api.yourdomain.com | Backend API | gobazar-backend |

---

## Support

For issues:
1. Check [Vercel Documentation](https://vercel.com/docs/concepts/projects/custom-domains)
2. Check [GoDaddy Support](https://www.godaddy.com/help)
3. Use DNS propagation checker tools
4. Check Vercel project logs

---

**Last Updated**: 2024
**Status**: Ready for Production
