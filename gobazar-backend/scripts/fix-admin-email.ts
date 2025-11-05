import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixAdminEmail() {
  try {
    console.log('🔧 Fixing admin email configuration...\n');
    
    // Step 1: Update new email to ADMIN role
    console.log('1️⃣ Setting gobazar.2025@gmail.com as ADMIN...');
    const newAdmin = await prisma.user.update({
      where: { email: 'gobazar.2025@gmail.com' },
      data: { role: 'ADMIN' },
    });
    console.log(`✅ Updated ${newAdmin.email} to ADMIN role\n`);

    // Step 2: Demote old admin to USER role (optional)
    console.log('2️⃣ Demoting old admin (animelover200p@gmail.com) to USER...');
    const oldAdmin = await prisma.user.update({
      where: { email: 'animelover200p@gmail.com' },
      data: { role: 'USER' },
    });
    console.log(`✅ Updated ${oldAdmin.email} to USER role\n`);

    // Step 3: Verify the changes
    console.log('3️⃣ Verifying changes...');
    const adminUsers = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    console.log(`\n✅ Current admin users (${adminUsers.length}):`);
    adminUsers.forEach((user) => {
      console.log(`  - ${user.email} (${user.name})`);
    });

    console.log('\n🎉 Admin email configuration updated successfully!');
    console.log('You can now login with: gobazar.2025@gmail.com');

  } catch (error) {
    console.error('❌ Error fixing admin email:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAdminEmail();
