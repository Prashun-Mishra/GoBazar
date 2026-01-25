import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('🔍 Fuzzy Search for Subcategories...');

        // Search for anything looking like Muesli or Granola
        const subcats = await prisma.subCategory.findMany({
            where: {
                OR: [
                    { name: { contains: 'mus', mode: 'insensitive' } }, // catches 'museli'
                    { name: { contains: 'mue', mode: 'insensitive' } }, // catches 'muesli'
                    { name: { contains: 'gra', mode: 'insensitive' } }
                ]
            },
            include: {
                category: true,
                _count: { select: { products: true } }
            }
        });

        console.log(`Found ${subcats.length} matches:`);
        subcats.forEach(s => {
            console.log(`- [${s.name}] (ID: ${s.id})`);
            console.log(`  Category: ${s.category.name}`);
            console.log(`  Products: ${s._count.products}`);
            console.log(`  Slug: ${s.slug}`);
            console.log('---');
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
