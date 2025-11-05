const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up GoBazar Backend...\n');

// Check if .env exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found. Please copy .env.example to .env and configure it.');
  process.exit(1);
}

try {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('\n🔧 Generating Prisma client...');
  execSync('npm run prisma:generate', { stdio: 'inherit' });

  console.log('\n📊 Setting up database...');
  try {
    execSync('npm run prisma:push', { stdio: 'inherit' });
    console.log('✅ Database schema created successfully');
  } catch (error) {
    console.log('⚠️  Database setup failed. Make sure PostgreSQL is running and DATABASE_URL is correct.');
    console.log('   You can run "npm run prisma:push" manually after fixing the database connection.');
  }

  console.log('\n🌱 Seeding database with sample data...');
  try {
    execSync('npm run seed', { stdio: 'inherit' });
    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.log('⚠️  Database seeding failed. You can run "npm run seed" manually after fixing the database connection.');
  }

  console.log('\n🎉 Setup completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Make sure PostgreSQL is running');
  console.log('2. Update .env with your database credentials');
  console.log('3. Run "npm run dev" to start the development server');
  console.log('4. Visit http://localhost:5000/api/health to test the API');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}
