// Quick test to check what the API returns
async function testAPI() {
  try {
    console.log('🔍 Testing frontend API...');
    
    const response = await fetch('http://localhost:3000/api/categories');
    const data = await response.json();
    
    console.log('📊 Full API Response:', JSON.stringify(data, null, 2));
    console.log('\n📊 API Response structure:', Object.keys(data));
    
    if (data.data) {
      console.log(`✅ Categories found: ${data.data.length}`);
      console.log('\n📋 Category names:');
      data.data.forEach((cat, index) => {
        console.log(`${index + 1}. ${cat.name} (subcategories: ${cat.subcategories?.length || 0})`);
      });
    } else if (Array.isArray(data)) {
      console.log(`✅ Categories found: ${data.length}`);
      console.log('\n📋 Category names:');
      data.forEach((cat, index) => {
        console.log(`${index + 1}. ${cat.name} (subcategories: ${cat.subcategories?.length || 0})`);
      });
    } else {
      console.log('❌ Unexpected response format:', data);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();
