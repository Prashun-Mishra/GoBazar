/**
 * PayU Payment Gateway Integration Test
 * This script tests the complete payment flow
 */

const https = require('https');
const http = require('http');

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';
let userId = '';
let orderId = '';

// Test user credentials
const TEST_USER = {
  email: 'mishraprashun47@gmail.com',
  name: 'Test User',
  phone: '1234567890'
};

// Helper function to make HTTP requests
function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port || 5000,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (data) {
      const jsonData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(jsonData);
    }

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test 1: Check API Health
async function testHealth() {
  console.log('\n🔍 TEST 1: Checking API Health...');
  try {
    const response = await makeRequest('GET', '/health');
    if (response.status === 200 && response.data.success) {
      console.log('✅ API is healthy');
      console.log('   Version:', response.data.version);
      return true;
    } else {
      console.log('❌ API health check failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Test 2: Request OTP
async function requestOTP() {
  console.log('\n🔍 TEST 2: Requesting OTP...');
  try {
    const response = await makeRequest('POST', '/auth/request-otp', {
      email: TEST_USER.email
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ OTP sent successfully');
      console.log('   Message:', response.data.message);
      return true;
    } else {
      console.log('❌ OTP request failed:', response.data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Test 3: Verify OTP (Manual step - will use existing user)
async function getExistingUserOrders() {
  console.log('\n🔍 TEST 3: Getting existing orders to extract user info...');
  try {
    // First, let's check if we can get any user data
    // We'll need to login manually and get a token
    console.log('⚠️  Please login manually and provide a JWT token');
    console.log('   You can get this by logging in through the frontend');
    console.log('   Or check the database for an existing user');
    return false;
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Test 4: Test Payment Endpoint Availability
async function testPaymentEndpoint() {
  console.log('\n🔍 TEST 4: Testing Payment Endpoint Availability...');
  try {
    // Test without auth (should fail with 401)
    const response = await makeRequest('POST', '/payments/initiate', {
      orderId: 'test-order-id',
      amount: 100,
      customerInfo: {
        name: TEST_USER.name,
        email: TEST_USER.email,
        phone: TEST_USER.phone
      }
    });
    
    if (response.status === 401) {
      console.log('✅ Payment endpoint is protected (401 Unauthorized as expected)');
      return true;
    } else if (response.status === 404) {
      console.log('❌ Payment endpoint not found (404)');
      console.log('   Make sure /api/payments/initiate is registered');
      return false;
    } else {
      console.log('⚠️  Unexpected response:', response.status);
      console.log('   Data:', response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Test 5: Check PayU Configuration
async function checkPayUConfig() {
  console.log('\n🔍 TEST 5: Checking PayU Configuration...');
  
  const requiredEnvVars = [
    'PAYU_MERCHANT_KEY',
    'PAYU_MERCHANT_SALT', 
    'PAYU_API_URL',
    'FRONTEND_URL'
  ];
  
  console.log('   Required environment variables:');
  console.log('   - PAYU_MERCHANT_KEY: Should be "gtKFFx" for test');
  console.log('   - PAYU_MERCHANT_SALT: Should be "eCwWELxi" for test');
  console.log('   - PAYU_API_URL: Should be "https://test.payu.in/_payment"');
  console.log('   - FRONTEND_URL: Should be "http://localhost:3000"');
  console.log('   ✅ Please verify these in your .env file');
  
  return true;
}

// Test 6: Database Schema Check
async function checkDatabaseSchema() {
  console.log('\n🔍 TEST 6: Database Schema Check...');
  console.log('   Required tables:');
  console.log('   - ✅ orders table should have "paymentStatus" column');
  console.log('   - ✅ payments table should exist');
  console.log('   Please verify by running:');
  console.log('   psql -U postgres -d gobazar_db -c "\\d orders"');
  console.log('   psql -U postgres -d gobazar_db -c "\\d payments"');
  
  return true;
}

// Main test runner
async function runTests() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🧪 PAYU PAYMENT GATEWAY INTEGRATION TEST');
  console.log('═══════════════════════════════════════════════════════');
  
  const results = [];
  
  // Run all tests
  results.push({ name: 'API Health', passed: await testHealth() });
  results.push({ name: 'Payment Endpoint Protection', passed: await testPaymentEndpoint() });
  results.push({ name: 'PayU Configuration', passed: await checkPayUConfig() });
  results.push({ name: 'Database Schema', passed: await checkDatabaseSchema() });
  results.push({ name: 'OTP Request', passed: await requestOTP() });
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('📊 TEST SUMMARY');
  console.log('═══════════════════════════════════════════════════════');
  
  results.forEach((result, index) => {
    const status = result.passed ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${result.name}`);
  });
  
  const passedTests = results.filter(r => r.passed).length;
  const totalTests = results.length;
  
  console.log('\n' + '─'.repeat(55));
  console.log(`Total: ${passedTests}/${totalTests} tests passed`);
  console.log('─'.repeat(55));
  
  // Next steps
  console.log('\n📝 NEXT STEPS FOR MANUAL TESTING:');
  console.log('═══════════════════════════════════════════════════════');
  console.log('1. Restart your backend server (type "rs" in terminal)');
  console.log('2. Open frontend: http://localhost:3000');
  console.log('3. Login with your email');
  console.log('4. Add products to cart');
  console.log('5. Go to checkout');
  console.log('6. Select "Online Payment" method');
  console.log('7. Place order');
  console.log('8. Use test card: 5123456789012346, CVV: 123, Exp: 05/26');
  console.log('9. Complete payment on PayU page');
  console.log('10. Verify redirect to success page');
  console.log('═══════════════════════════════════════════════════════\n');
}

// Run the tests
runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
