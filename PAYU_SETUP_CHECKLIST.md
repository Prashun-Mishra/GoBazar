# ✅ PAYU PAYMENT GATEWAY - SETUP CHECKLIST

## 🎯 **COMPLETE THIS CHECKLIST TO GO LIVE:**

---

## **PHASE 1: BACKEND SETUP** (5 minutes)

### **Step 1.1: Update Environment Variables**
- [ ] Open `gobazar-backend/.env` file
- [ ] Add/Update PayU credentials:
  ```env
  PAYU_MERCHANT_KEY=gtKFFx
  PAYU_MERCHANT_SALT=eCwWELxi
  PAYU_API_URL=https://test.payu.in/_payment
  FRONTEND_URL=http://localhost:3001
  ```
- [ ] Save the file

### **Step 1.2: Restart Backend Server**
- [ ] Stop current backend server (Ctrl+C)
- [ ] Run: `npm run dev`
- [ ] Wait for "Server running on port 5000" message
- [ ] Verify "Database connected successfully" message

### **Step 1.3: Verify Database Migration**
- [ ] Check if `payments` table exists
- [ ] Check if `orders` table has `paymentStatus` column
- [ ] If not, run: `npx prisma migrate dev`

**✅ Backend Setup Complete**

---

## **PHASE 2: TEST PAYMENT FLOW** (10 minutes)

### **Step 2.1: Create Test Order**
- [ ] Open frontend: http://localhost:3001
- [ ] Login with your account (animelover200p@gmail.com)
- [ ] Add product(s) to cart
- [ ] Go to checkout
- [ ] Select delivery address
- [ ] Select delivery time slot
- [ ] Choose "Online Payment" or "PayU" as payment method
- [ ] Click "Place Order"

### **Step 2.2: Verify Order Creation**
- [ ] Order created successfully
- [ ] Order ID displayed
- [ ] Check backend logs for: "Order created with ID: xxx"
- [ ] Check database: `SELECT * FROM orders ORDER BY "createdAt" DESC LIMIT 1`
- [ ] Verify `paymentStatus = 'PENDING'`

### **Step 2.3: Initiate Payment**
- [ ] Payment initiation triggered automatically
- [ ] See "Redirecting to Payment Gateway" message
- [ ] Check backend logs for: "💳 [PayU] Initiating payment"
- [ ] Verify payment record created in database

### **Step 2.4: Complete Payment on PayU**
- [ ] Redirected to PayU test page
- [ ] Enter test card details:
  - **Card Number:** 5123456789012346
  - **CVV:** 123
  - **Expiry:** 12/25 (any future date)
  - **Name:** Test User
- [ ] Click "Make Payment"
- [ ] Payment processed successfully

### **Step 2.5: Verify Payment Success**
- [ ] Redirected to `/payment/success` page
- [ ] Order ID and transaction ID displayed
- [ ] Success message shown
- [ ] Check backend logs for: "✅ [PayU] Payment successful"
- [ ] Check database payment status: `SELECT * FROM payments WHERE "transactionId" = 'TXNxxx'`
- [ ] Verify `status = 'SUCCESS'`
- [ ] Check order status: `SELECT "paymentStatus" FROM orders WHERE id = 'xxx'`
- [ ] Verify `paymentStatus = 'PAID'`

### **Step 2.6: Test Payment Failure**
- [ ] Create another test order
- [ ] Use failure test card: 4012001037141112
- [ ] Complete payment
- [ ] Redirected to `/payment/failure` page
- [ ] Error message displayed
- [ ] Retry option available
- [ ] Check payment status updated to `FAILED` in database
- [ ] Check order status updated to `CANCELED`

**✅ Test Payment Flow Complete**

---

## **PHASE 3: VERIFY INTEGRATION** (5 minutes)

### **Step 3.1: Check Backend Logs**
Should see these messages:
- [ ] `💳 [PayU] Initiating payment for order: xxx`
- [ ] `🔐 [PayU] Generating payment hash`
- [ ] `✅ [PayU] Payment initiated with transaction ID: TXNxxx`
- [ ] `📥 [PayU] Processing payment callback`
- [ ] `✅ [PayU] Payment successful` (or failed)

### **Step 3.2: Check Database Records**

**Orders Table:**
- [ ] Run: `SELECT id, status, "paymentStatus", total FROM orders ORDER BY "createdAt" DESC LIMIT 5`
- [ ] Verify successful order has `paymentStatus = 'PAID'`
- [ ] Verify failed order has `paymentStatus = 'FAILED'`

**Payments Table:**
- [ ] Run: `SELECT * FROM payments ORDER BY "createdAt" DESC LIMIT 5`
- [ ] Verify transaction records exist
- [ ] Check `transactionId` is unique
- [ ] Check `gatewayTransactionId` is populated (PayU's ID)
- [ ] Check `gatewayResponse` has complete callback data

### **Step 3.3: Check Email Notifications**
- [ ] Verify order confirmation email sent
- [ ] Verify payment success email sent (if configured)
- [ ] Check email content is correct

### **Step 3.4: Check Order Tracking**
- [ ] Go to `/orders/{orderId}`
- [ ] Verify payment status shows "PAID"
- [ ] Verify order status is "RECEIVED"
- [ ] Verify order timeline is correct

**✅ Integration Verified**

---

## **PHASE 4: PRODUCTION PREPARATION** (When Ready)

### **Step 4.1: Get Production Credentials**
- [ ] Sign up at https://www.payu.in/
- [ ] Complete KYC verification
- [ ] Get production Merchant Key
- [ ] Get production Merchant Salt
- [ ] Note down credentials securely

### **Step 4.2: Update Production Environment**
- [ ] Update production `.env`:
  ```env
  PAYU_MERCHANT_KEY=your-production-key
  PAYU_MERCHANT_SALT=your-production-salt
  PAYU_API_URL=https://secure.payu.in/_payment
  FRONTEND_URL=https://yourdomain.com
  ```
- [ ] Deploy backend with new configuration
- [ ] Restart production server

### **Step 4.3: SSL/HTTPS Setup**
- [ ] Ensure frontend has valid SSL certificate
- [ ] Ensure backend has valid SSL certificate
- [ ] Update all URLs to use `https://`
- [ ] Test payment flow on HTTPS

### **Step 4.4: Configure PayU Webhooks**
- [ ] Login to PayU dashboard
- [ ] Go to Settings → Webhooks
- [ ] Add webhook URL: `https://yourdomain.com/api/payments/webhook`
- [ ] Enable webhook notifications
- [ ] Test webhook delivery

### **Step 4.5: Test with Real Money** ⚠️
- [ ] Start with small test amount (₹10)
- [ ] Complete payment with real card
- [ ] Verify entire flow works
- [ ] Check money received in PayU dashboard
- [ ] Test refund if needed

### **Step 4.6: Monitoring Setup**
- [ ] Set up error logging
- [ ] Set up payment failure alerts
- [ ] Set up transaction monitoring
- [ ] Create dashboard for payment metrics
- [ ] Document incident response procedure

### **Step 4.7: Compliance & Legal**
- [ ] Update Terms & Conditions
- [ ] Update Privacy Policy
- [ ] Add Refund Policy
- [ ] Add Payment Terms
- [ ] Ensure PCI compliance (if applicable)

**✅ Production Ready**

---

## **TROUBLESHOOTING CHECKLIST**

### **Issue: Payment Initiation Fails**
- [ ] Check backend server is running
- [ ] Check PayU credentials in `.env`
- [ ] Check order exists in database
- [ ] Check user is authenticated
- [ ] Check backend logs for errors

### **Issue: Invalid Hash Error**
- [ ] Verify `PAYU_MERCHANT_KEY` is correct
- [ ] Verify `PAYU_MERCHANT_SALT` is correct
- [ ] Check no extra spaces in credentials
- [ ] Restart backend after .env changes

### **Issue: Callback Not Received**
- [ ] Check backend server is running
- [ ] Check `/api/payments/callback` route exists
- [ ] Check firewall allows incoming requests
- [ ] Check logs for callback attempts
- [ ] Verify PayU can reach your server

### **Issue: Order Not Updating After Payment**
- [ ] Check callback received in logs
- [ ] Check hash verification passed
- [ ] Check database connection
- [ ] Check transaction ID matches
- [ ] Review error logs

### **Issue: Redirect Loop**
- [ ] Check `FRONTEND_URL` is correct
- [ ] Check success/failure pages exist
- [ ] Check no infinite redirects in code
- [ ] Clear browser cache and cookies

---

## **QUICK REFERENCE**

### **Test Cards:**
```
Success: 5123456789012346 | CVV: 123
Failure: 4012001037141112 | CVV: 123
```

### **Important URLs:**
```
Backend API:    http://localhost:5000
Frontend:       http://localhost:3001
PayU Test:      https://test.payu.in/_payment
PayU Prod:      https://secure.payu.in/_payment
Success Page:   /payment/success
Failure Page:   /payment/failure
```

### **Database Queries:**
```sql
-- Check recent orders
SELECT id, status, "paymentStatus", total 
FROM orders 
ORDER BY "createdAt" DESC LIMIT 5;

-- Check recent payments
SELECT "transactionId", amount, status 
FROM payments 
ORDER BY "createdAt" DESC LIMIT 5;

-- Find order by transaction ID
SELECT o.id, o.status, o."paymentStatus", p.status as payment_status
FROM orders o
JOIN payments p ON p."orderId" = o.id
WHERE p."transactionId" = 'TXNxxx';
```

### **Useful Commands:**
```bash
# Restart backend
cd gobazar-backend && npm run dev

# Check database
npx prisma studio

# View logs
tail -f logs/payment.log

# Test webhook
curl -X POST http://localhost:5000/api/payments/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

---

## **📝 NOTES**

### **Important Points:**
- ⚠️ Never commit `.env` file to git
- ⚠️ Keep merchant salt secret
- ⚠️ Test thoroughly before production
- ⚠️ Monitor payment failures
- ⚠️ Have rollback plan ready

### **Support:**
- PayU Support: support@payu.in
- PayU Docs: https://docs.payu.in/
- Internal Docs: See PAYU_INTEGRATION_COMPLETE.md

---

## **✅ FINAL CHECKLIST**

Before marking complete, ensure:
- [ ] All backend files created
- [ ] All frontend files created
- [ ] Database migration applied
- [ ] Environment variables configured
- [ ] Test payment successful
- [ ] Test payment failure working
- [ ] Email notifications working
- [ ] Order tracking updated
- [ ] Documentation reviewed
- [ ] Team trained on payment flow

---

**🎉 CONGRATULATIONS!**

**When all items are checked, your PayU payment integration is COMPLETE and READY!**

**Your GoBazar platform can now accept secure online payments!** 💳✨
