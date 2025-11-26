
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            select: { name: true, slug: true }
        });

        console.log('Available Categories:');
        categories.forEach(cat => {
            console.log(`- ${cat.name} (${cat.slug})`);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
