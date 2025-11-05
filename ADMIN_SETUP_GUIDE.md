# 🔧 ADMIN SETUP GUIDE - FIX 401 AUTHENTICATION ERROR

## 🚨 **ISSUE:**
Admin dashboard returns 401 "Authentication required" because user is not marked as ADMIN in database.

## ✅ **SOLUTION:**

### **Fix Applied:**
Updated backend routes to properly chain `authenticateToken` + `requireAdmin` middlewares.

**File Modified:** `gobazar-backend/src/routes/orders.ts`
- Added `authenticateToken` middleware before `requireAdmin`
- Now admin routes properly verify JWT token AND check admin role

---

## 🔑 **SET USER AS ADMIN:**

### **Method 1: Using TypeScript Script (Recommended)**

```bash
cd "c:\Users\mishr\Downloads\Go Bazar\gobazar-backend"

# Replace with your actual email
npx ts-node scripts/set-admin.ts your-email@example.com
```

**Output:**
```
🔧 Setting user your-email@example.com as ADMIN...
✅ User your-email@example.com has been set as ADMIN
User details: { id: '...', name: '...', email: '...', role: 'ADMIN' }
```

### **Method 2: Using SQL Script**

```bash
# Connect to your PostgreSQL database
psql -U postgres -d gobazar

# Or if using a connection string
psql "postgresql://username:password@localhost:5432/gobazar"
```

Then run:
```sql
-- Replace with your actual email
UPDATE users 
SET role = 'ADMIN' 
WHERE email = 'your-email@example.com';

-- Verify it worked
SELECT id, name, email, role FROM users WHERE email = 'your-email@example.com';
```

### **Method 3: Using Prisma Studio (Visual)**

```bash
cd "c:\Users\mishr\Downloads\Go Bazar\gobazar-backend"
npx prisma studio
```

1. Open Prisma Studio (will open in browser)
2. Click on "users" table
3. Find your user by email
4. Change `role` field from `USER` to `ADMIN`
5. Click "Save 1 change"

### **Method 4: Quick Manual Database Update**

If you know your user's email, you can run this quick command:

```bash
# Windows PowerShell
cd "c:\Users\mishr\Downloads\Go Bazar\gobazar-backend"

# Replace YOUR_EMAIL with actual email
$env:USER_EMAIL="your-email@example.com"
npx prisma db execute --stdin < scripts/set-admin.sql
```

---

## 🧪 **VERIFY ADMIN ACCESS:**

### **1. Check Database:**
```sql
SELECT id, name, email, role FROM users WHERE role = 'ADMIN';
```

Should show your user with `role: 'ADMIN'`

### **2. Test Login:**
1. Go to `http://localhost:3001`
2. Login with your email (OTP will be sent)
3. After login, check localStorage for token:
   ```javascript
   // In browser console:
   localStorage.getItem('auth-token')
   ```

### **3. Test Admin Dashboard:**
1. Navigate to `http://localhost:3001/admin/orders`
2. You should see orders (not 401 error)
3. Check browser console for success logs:
   ```
   📊 [Admin Orders] Auth token: true
   📊 [Admin Orders] Backend response status: 200
   ✅ [Admin Orders] Orders loaded successfully
   ```

---

## 🔄 **COMPLETE TEST FLOW:**

### **Step 1: Start Servers**
```bash
# Terminal 1 - Backend
cd "c:\Users\mishr\Downloads\Go Bazar\gobazar-backend"
npm run dev

# Terminal 2 - Frontend
cd "c:\Users\mishr\Downloads\Go Bazar\blinkit-clone"
npm run dev
```

### **Step 2: Set Admin Role**
```bash
# Terminal 3
cd "c:\Users\mishr\Downloads\Go Bazar\gobazar-backend"
npx ts-node scripts/set-admin.ts your-email@example.com
```

### **Step 3: Login and Test**
1. **Go to frontend:** `http://localhost:3001`
2. **Login with your email** (the one you set as admin)
3. **Enter OTP** from email
4. **Navigate to admin dashboard:** `http://localhost:3001/admin/orders`
5. **Should see all orders** without 401 error

---

## 📊 **EXPECTED RESULTS:**

### **Backend Logs (Success):**
```
🔐 [Auth] Token verification successful
👤 [Auth] User: { id: '...', email: '...', role: 'ADMIN' }
✅ [Admin Orders] Fetching all orders
📧 [Email Service] Sending status update email
```

### **Frontend Logs (Success):**
```
📊 [Admin Orders] Auth token: true
📊 [Admin Orders API] Backend response status: 200
✅ [Admin Orders] Orders loaded: 5
```

### **Backend Logs (If Still Failing):**
```
❌ [Auth] User role: USER (expected: ADMIN)
❌ [Auth] Admin access required
```
**Fix:** User role not updated - run set-admin script again

---

## 🐛 **TROUBLESHOOTING:**

### **Problem 1: Still Getting 401**
**Cause:** User role not set to ADMIN in database
**Solution:** Run set-admin script again and verify with SQL query

### **Problem 2: "User not found" in set-admin script**
**Cause:** Email doesn't exist in database
**Solution:** 
1. Login to the frontend first to create user account
2. Then run set-admin script

### **Problem 3: Token Invalid**
**Cause:** Old token in localStorage
**Solution:**
```javascript
// In browser console
localStorage.clear()
// Then login again
```

### **Problem 4: "Invalid or expired token"**
**Cause:** JWT secret changed or token corrupted
**Solution:**
1. Logout and login again
2. Check `.env` file has `JWT_SECRET` set
3. Clear localStorage and re-login

---

## 🔒 **SECURITY NOTES:**

### **Important:**
- **Only set trusted users as ADMIN**
- **Admin role has full access** to all orders and data
- **Protect admin routes** in production with additional security
- **Use strong passwords** for database access
- **Never commit admin credentials** to version control

### **Production Checklist:**
- ✅ Secure database connection
- ✅ Strong JWT secret in environment variables
- ✅ HTTPS for all admin endpoints
- ✅ Rate limiting on admin routes
- ✅ Audit logging for admin actions
- ✅ Two-factor authentication for admins

---

## 📝 **QUICK REFERENCE:**

### **To Set Admin:**
```bash
npx ts-node scripts/set-admin.ts your-email@example.com
```

### **To Check Admin Status:**
```sql
SELECT email, role FROM users WHERE email = 'your-email@example.com';
```

### **To Remove Admin (Set Back to User):**
```sql
UPDATE users SET role = 'USER' WHERE email = 'your-email@example.com';
```

---

## ✅ **FINAL CHECKLIST:**

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3001
- [ ] User exists in database
- [ ] User role set to 'ADMIN'
- [ ] Logged in with admin email
- [ ] Auth token in localStorage
- [ ] Admin dashboard accessible
- [ ] Can view all orders
- [ ] Can update order status

---

**🎉 Once all steps are complete, your admin dashboard should work perfectly!**

**Expected Result:**
- ✅ No 401 errors
- ✅ All orders visible
- ✅ Status updates working
- ✅ Email notifications sending
- ✅ Complete admin control

**If you still face issues, check the backend logs for specific error messages and verify each step above.**
