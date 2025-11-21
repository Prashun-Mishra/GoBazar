import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function activateAllProducts() {
    try {
        console.log('🔄 Activating all products...');

        // Update all products to isActive: true
        const result = await prisma.product.updateMany({
            where: {
                isActive: false,
            },
            data: {
                isActive: true,
            },
        });

        console.log(`✅ Activated ${result.count} products`);

        // Also activate all product variants
        const variantResult = await prisma.productVariant.updateMany({
            where: {
                isActive: false,
            },
            data: {
                isActive: true,
            },
        });

        console.log(`✅ Activated ${variantResult.count} product variants`);

        // Get all products count to verify
        const totalProducts = await prisma.product.count();
        const activeProducts = await prisma.product.count({
            where: { isActive: true },
        });

        console.log(`\n📊 Summary:`);
        console.log(`   Total products: ${totalProducts}`);
        console.log(`   Active products: ${activeProducts}`);
        console.log(`   Inactive products: ${totalProducts - activeProducts}`);

    } catch (error) {
        console.error('❌ Error activating products:', error);
    } finally {
        await prisma.$disconnect();
    }
}

activateAllProducts();
