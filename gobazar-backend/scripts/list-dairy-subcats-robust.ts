import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) throw error;
        console.log(`⚠️ DB Error, retrying... (${retries} left)`);
        await new Promise(r => setTimeout(r, delay));
        return withRetry(fn, retries - 1, delay);
    }
}

async function main() {
    try {
        console.log('🔍 robust-listing subcategories...');

        // Find parent category
        const category = await withRetry(() => prisma.category.findFirst({
            where: {
                OR: [
                    { name: { contains: 'Dairy', mode: 'insensitive' } },
                    { name: { contains: 'Breakfast', mode: 'insensitive' } }
                ]
            },
            include: {
                subcategories: {
                    include: {
                        _count: {
                            select: { products: true }
                        }
                    },
                    orderBy: { name: 'asc' }
                }
            }
        }));

        if (!category) {
            console.log('❌ Category not found.');
            return;
        }

        console.log(`\nCategory: ${category.name} (ID: ${category.id})`);
        console.log(`Total Subcats: ${category.subcategories.length}`);
        console.log('------------------------------------------------');

        category.subcategories.forEach(sub => {
            console.log(`• "${sub.name}"`);
            console.log(`  ID: ${sub.id}`);
            console.log(`  Products: ${sub._count.products}`);
            console.log(`  Slug: ${sub.slug}`);
            console.log('  ---');
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
