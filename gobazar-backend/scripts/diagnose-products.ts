import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function diagnoseProducts() {
    try {
        console.log('🔍 Product Diagnostics\n');

        // 1. Check total products
        const totalProducts = await prisma.product.count();
        const activeProducts = await prisma.product.count({ where: { isActive: true } });
        const inactiveProducts = totalProducts - activeProducts;

        console.log('📊 Product Counts:');
        console.log(`   Total: ${totalProducts}`);
        console.log(`   Active: ${activeProducts}`);
        console.log(`   Inactive: ${inactiveProducts}\n`);

        // 2. List first 10 products with their status
        const products = await prisma.product.findMany({
            take: 10,
            select: {
                id: true,
                name: true,
                isActive: true,
                stock: true,
                category: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
            },
        });

        console.log('📝 Sample Products (first 10):');
        products.forEach((p, i) => {
            console.log(`   ${i + 1}. ${p.name}`);
            console.log(`      ID: ${p.id}`);
            console.log(`      Active: ${p.isActive ? '✅' : '❌'}`);
            console.log(`      Stock: ${p.stock}`);
            console.log(`      Category: ${p.category?.name} (${p.category?.slug})`);
            console.log('');
        });

        // 3. Check categories
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                isActive: true,
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });

        console.log('🏷️  Categories:');
        categories.forEach((cat) => {
            console.log(`   ${cat.name} (${cat.slug}): ${cat._count.products} products ${cat.isActive ? '✅' : '❌ INACTIVE'}`);
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

diagnoseProducts();
