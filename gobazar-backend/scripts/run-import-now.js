const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Importing ALL subcategories for all 20 categories...\n');

// Run the fix script
const scriptPath = path.join(__dirname, 'fix-subcategories.js');

exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️  ${stderr}`);
  }
  console.log(stdout);
  console.log('\n✅ All subcategories imported successfully!');
  console.log('\n📝 Next steps:');
  console.log('   1. Restart backend: npm run dev');
  console.log('   2. Clear browser cache');
  console.log('   3. Reload frontend\n');
});
