import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.product.count();
        console.log(`Total products in database: ${count}`);

        // Optional: Breakdown by category
        const productsByCategory = await prisma.product.groupBy({
            by: ['categoryId'],
            _count: {
                id: true
            }
        });

        console.log('\nBreakdown by Category:');
        for (const group of productsByCategory) {
            const category = await prisma.category.findUnique({
                where: { id: group.categoryId }
            });
            console.log(`- ${category?.name || 'Unknown'}: ${group._count.id}`);
        }

    } catch (error) {
        console.error('Error counting products:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
