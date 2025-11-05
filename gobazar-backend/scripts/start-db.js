const { execSync } = require('child_process');

console.log('🐳 Starting PostgreSQL with Docker...\n');

try {
  // Check if Docker is installed
  execSync('docker --version', { stdio: 'pipe' });
  
  console.log('📦 Starting PostgreSQL container...');
  execSync('docker-compose up -d postgres', { stdio: 'inherit' });
  
  console.log('\n✅ PostgreSQL is starting up...');
  console.log('📊 Database will be available at: postgresql://postgres:password@localhost:5432/gobazar_db');
  console.log('\n⏳ Waiting for database to be ready...');
  
  // Wait a bit for PostgreSQL to start
  setTimeout(() => {
    console.log('\n🚀 Database should be ready now!');
    console.log('Run "npm run setup" to initialize the database schema and seed data.');
  }, 5000);
  
} catch (error) {
  console.log('❌ Docker not found or not running.');
  console.log('\nAlternative options:');
  console.log('1. Install PostgreSQL locally');
  console.log('2. Use a cloud database service like Supabase or Railway');
  console.log('3. Install Docker and run this script again');
}
