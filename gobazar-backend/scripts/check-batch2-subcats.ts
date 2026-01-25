import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('🔍 Checking for Granola and Muesli subcategories...');

        const subcats = await prisma.subCategory.findMany({
            where: {
                name: { in: ['Granola', 'Muesli'], mode: 'insensitive' }
            },
            include: {
                category: true
            }
        });

        console.log(`Found ${subcats.length} subcategories:`);
        subcats.forEach(s => {
            console.log(`- ${s.name} (Slug: ${s.slug}, ID: ${s.id}, Category: ${s.category.name})`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
