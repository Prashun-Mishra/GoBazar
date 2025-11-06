const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    const adminUser = await prisma.user.findUnique({
      where: { email: 'gobazar.2025@gmail.com' }
    });

    if (adminUser) {
      console.log('✅ Admin user found:');
      console.log('   Email:', adminUser.email);
      console.log('   Name:', adminUser.name);
      console.log('   Role:', adminUser.role);
      console.log('   ID:', adminUser.id);
    } else {
      console.log('❌ Admin user NOT found in database');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
