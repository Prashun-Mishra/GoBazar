import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('🔍 Diagnosing Content Issues...\n');

        // 1. Check recent products
        const recentProducts = await prisma.product.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            select: { id: true, name: true, images: true, subcategoryId: true, subcategory: { select: { name: true } } }
        });

        console.log('📦 Recent Products (Top 10):');
        recentProducts.forEach(p => {
            console.log(`- [${p.name}] Subcat: ${p.subcategory?.name} | Images: ${p.images.length} | First Image: ${p.images[0]?.substring(0, 50)}...`);
        });

        // 2. Check subcategories with missing or empty images
        const subcategories = await prisma.subCategory.findMany({
            where: {
                OR: [
                    { image: null },
                    { image: '' }
                ]
            },
            select: { id: true, name: true, image: true, category: { select: { name: true } } }
        });

        console.log('\n📂 Subcategories missing images:');
        subcategories.forEach(s => {
            console.log(`- [${s.name}] (Cat: ${s.category.name}) ID: ${s.id}`);
        });

    } catch (error) {
        console.error('❌ Error diagnsosing:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
