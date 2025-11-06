#!/bin/bash

# Test Payment API with curl
# Make sure backend server is running on port 5000

echo "🧪 Testing Payment API..."
echo ""

# Step 1: Login to get auth token
echo "Step 1: Logging in to get auth token..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "gobazar.2025@gmail.com"}')

echo "Send OTP Response: $LOGIN_RESPONSE"
echo ""
echo "⚠️  Check backend logs for OTP code, then enter it below:"
read -p "Enter OTP: " OTP

# Verify OTP and get token
VERIFY_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"gobazar.2025@gmail.com\", \"otp\": \"$OTP\"}")

echo "Verify OTP Response: $VERIFY_RESPONSE"
echo ""

# Extract token from response (requires jq)
TOKEN=$(echo $VERIFY_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to get auth token"
  exit 1
fi

echo "✅ Got auth token: ${TOKEN:0:20}..."
echo ""

# Step 2: Create an order first
echo "Step 2: Creating test order..."
read -p "Enter Address ID (check /api/addresses): " ADDRESS_ID

ORDER_RESPONSE=$(curl -s -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"addressId\": \"$ADDRESS_ID\",
    \"paymentMethod\": \"ONLINE\",
    \"deliverySlot\": \"9AM-12PM\",
    \"items\": [
      {
        \"productId\": \"prod-bread-1\",
        \"quantity\": 1,
        \"variantId\": null
      }
    ]
  }")

echo "Order Response: $ORDER_RESPONSE"
echo ""

# Extract order ID
ORDER_ID=$(echo $ORDER_RESPONSE | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$ORDER_ID" ]; then
  echo "❌ Failed to create order"
  exit 1
fi

echo "✅ Order created: $ORDER_ID"
echo ""

# Step 3: Initiate payment
echo "Step 3: Initiating PayU payment..."
PAYMENT_RESPONSE=$(curl -s -X POST http://localhost:5000/api/payments/initiate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"orderId\": \"$ORDER_ID\"}")

echo ""
echo "📋 Payment Response:"
echo "$PAYMENT_RESPONSE" | python -m json.tool 2>/dev/null || echo "$PAYMENT_RESPONSE"
echo ""

# Extract payment data
echo "✅ Payment initiation completed!"
echo ""
echo "🔍 Check the response above for:"
echo "  - paymentData.hash (should be generated)"
echo "  - paymentData.txnid (transaction ID)"
echo "  - paymentData.key (merchant key)"
echo "  - paymentData.surl (success URL)"
echo "  - paymentData.furl (failure URL)"
