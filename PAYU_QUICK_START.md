# 🚀 PAYU PAYMENT - QUICK START GUIDE

## ⚡ **GET STARTED IN 5 MINUTES:**

### **Step 1: Configure PayU Test Credentials (2 min)**

Edit your backend `.env` file:

```bash
cd "c:\Users\mishr\Downloads\Go Bazar\gobazar-backend"
notepad .env
```

Add these lines (or update existing PayU config):

```env
# PayU Test Credentials (Sandbox)
PAYU_MERCHANT_KEY=gtKFFx
PAYU_MERCHANT_SALT=eCwWELxi
PAYU_API_URL=https://test.payu.in/_payment

# Frontend URL for callbacks
FRONTEND_URL=http://localhost:3001
```

**Save and close the file.**

---

### **Step 2: Restart Backend Server (1 min)**

```bash
# In backend terminal:
# Press Ctrl+C to stop current server
# Then restart:
npm run dev
```

Wait for:
```
✅ Server running on port 5000
✅ Database connected successfully
```

---

### **Step 3: Test Payment Flow (2 min)**

1. **Open Frontend:**
   - Go to: `http://localhost:3001`
   - Login with your account

2. **Add Products to Cart:**
   - Add any product(s) to cart
   - Click cart icon to view

3. **Go to Checkout:**
   - Click "Proceed to Checkout"
   - Select delivery address
   - Select delivery time slot
   - Choose "Online Payment" method

4. **Place Order:**
   - Click "Place Order" button
   - Order will be created
   - You'll see "Redirecting to Payment Gateway" message

5. **Complete Payment on PayU Test Page:**
   - Use test card: **5123456789012346**
   - CVV: **123**
   - Expiry: Any future date
   - Name: Any name
   - Click "Make Payment"

6. **Success!**
   - Redirected back to success page
   - Order status updated to PAID
   - Email notification sent
   - Can track order

---

## 🧪 **TEST CREDENTIALS:**

### **Success Test Card:**
```
Card Number: 5123456789012346
CVV: 123
Expiry: 12/25 (any future date)
Name: Test User
```

### **Failure Test Card:**
```
Card Number: 4012001037141112
CVV: 123
Expiry: 12/25
```

### **Test Net Banking:**
- Select any bank on PayU page
- Username: `test`
- Password: `test`

### **Test UPI:**
- Enter any UPI ID (e.g., test@paytm)
- Complete on test page

---

## 📋 **WHAT'S WORKING:**

✅ **Backend:**
- PayU service with hash generation
- Payment initiation API
- Payment callback handling
- Order status updates
- Database payment tracking

✅ **Frontend:**
- Payment API routes
- PayU redirect form
- Success page with order details
- Failure page with retry option
- Payment status tracking

✅ **Database:**
- Payment table created
- Order paymentStatus field added
- Migration applied successfully

---

## 🔄 **PAYMENT FLOW:**

```
1. User adds products → Cart
2. Goes to checkout → Selects address & slot
3. Clicks "Place Order" → Order created (PENDING)
4. Initiates payment → PayU hash generated
5. Redirects to PayU → User pays on PayU page
6. PayU sends callback → Backend verifies hash
7. Updates order → paymentStatus: PAID
8. Redirects to success → User sees confirmation
9. Email sent → Order tracking available
```

---

## 🐛 **TROUBLESHOOTING:**

### **Issue: "Invalid Hash" Error**
**Fix:** Check PayU credentials in `.env` file are correct

### **Issue: Redirect Not Working**
**Fix:** Verify `FRONTEND_URL=http://localhost:3001` in `.env`

### **Issue: Order Not Updating After Payment**
**Fix:** 
1. Check backend logs for errors
2. Restart backend server
3. Verify database connection

### **Issue: Payment Form Not Showing**
**Fix:**
1. Check console for errors
2. Verify order was created successfully
3. Check network tab for API response

---

## 📊 **HOW TO CHECK:**

### **1. Check Order Status:**
```sql
-- In your database client:
SELECT id, status, "paymentStatus", total 
FROM orders 
ORDER BY "createdAt" DESC 
LIMIT 5;
```

### **2. Check Payment Records:**
```sql
SELECT 
  "transactionId", 
  amount, 
  status, 
  "paymentGateway",
  "createdAt"
FROM payments 
ORDER BY "createdAt" DESC 
LIMIT 5;
```

### **3. Check Backend Logs:**
Look for:
```
💳 [PayU] Initiating payment for order: xxx
🔐 [PayU] Generating payment hash
✅ [PayU] Payment initiated with transaction ID: TXNxxx
📥 [PayU] Processing payment callback
✅ [PayU] Payment successful
```

---

## 🎯 **NEXT STEPS:**

### **For Testing:**
1. ✅ Test with success card
2. ✅ Test with failure card
3. ✅ Test Net Banking
4. ✅ Test UPI
5. ✅ Verify email notifications
6. ✅ Check order tracking

### **For Production:**
1. Get production PayU credentials
2. Update `.env` with production values:
   ```env
   PAYU_API_URL=https://secure.payu.in/_payment
   FRONTEND_URL=https://yourdomain.com
   ```
3. Test with real cards (small amounts)
4. Enable SSL/HTTPS
5. Configure webhooks
6. Monitor transactions

---

## 📝 **IMPORTANT NOTES:**

### **Test Mode:**
- ✅ No real money charged
- ✅ Uses PayU sandbox environment
- ✅ Test cards always work
- ✅ Perfect for development

### **Production Mode:**
- ⚠️ Real money transactions
- ⚠️ Requires PayU approval
- ⚠️ Need valid business credentials
- ⚠️ Must have SSL certificate

### **Security:**
- ✅ Payment hash verified
- ✅ Merchant salt never exposed
- ✅ Secure callback handling
- ✅ Transaction logging enabled

---

## 🎉 **YOU'RE READY TO TEST!**

Just follow the 3 steps above and your PayU payment integration is ready to use!

### **Quick Test Command:**

```bash
# 1. Start backend (if not running)
cd "c:\Users\mishr\Downloads\Go Bazar\gobazar-backend"
npm run dev

# 2. Start frontend (if not running)
cd "c:\Users\mishr\Downloads\Go Bazar\blinkit-clone"
npm run dev

# 3. Open browser
# Go to http://localhost:3001
# Place order → Test payment!
```

---

**Need help?** Check the complete guide: `PAYU_INTEGRATION_COMPLETE.md`

**🚀 Happy Testing!**
