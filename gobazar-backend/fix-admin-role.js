const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixAdminRole() {
  try {
    console.log('🔧 Updating user role to ADMIN...');
    
    const updatedUser = await prisma.user.update({
      where: { email: 'gobazar.2025@gmail.com' },
      data: { 
        role: 'ADMIN',
        name: 'Admin User'
      }
    });

    console.log('✅ User role updated successfully!');
    console.log('   Email:', updatedUser.email);
    console.log('   Name:', updatedUser.name);
    console.log('   Role:', updatedUser.role);
    console.log('   ID:', updatedUser.id);
  } catch (error) {
    console.error('❌ Error updating user role:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAdminRole();
