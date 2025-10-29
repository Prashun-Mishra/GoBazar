import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    console.log('🔍 Checking admin users in database...\n');
    
    const adminUsers = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    if (adminUsers.length === 0) {
      console.log('❌ No admin users found in database');
    } else {
      console.log(`✅ Found ${adminUsers.length} admin user(s):\n`);
      adminUsers.forEach((user, index) => {
        console.log(`Admin ${index + 1}:`);
        console.log(`  ID: ${user.id}`);
        console.log(`  Name: ${user.name}`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Phone: ${user.phone}`);
        console.log(`  Role: ${user.role}`);
        console.log(`  Created: ${user.createdAt}`);
        console.log('');
      });
    }

    // Also check for the old email
    const oldEmailUser = await prisma.user.findUnique({
      where: { email: 'animelover200p@gmail.com' },
    });

    if (oldEmailUser) {
      console.log('⚠️  Old email still exists in database:');
      console.log(`  Email: ${oldEmailUser.email}`);
      console.log(`  Role: ${oldEmailUser.role}`);
      console.log('');
    }

    // Check for new email
    const newEmailUser = await prisma.user.findUnique({
      where: { email: 'gobazar.2025@gmail.com' },
    });

    if (newEmailUser) {
      console.log('✅ New admin email found:');
      console.log(`  Email: ${newEmailUser.email}`);
      console.log(`  Role: ${newEmailUser.role}`);
    } else {
      console.log('❌ New admin email (gobazar.2025@gmail.com) NOT found in database');
    }

  } catch (error) {
    console.error('❌ Error checking admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
