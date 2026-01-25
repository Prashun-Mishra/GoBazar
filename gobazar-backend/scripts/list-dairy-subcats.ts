import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('🔍 Listing subcategories for "Dairy & Breakfast"...');

        // Find parent category first to be sure
        const category = await prisma.category.findFirst({
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
                    }
                }
            }
        });

        if (!category) {
            console.log('❌ Category not found.');
            return;
        }

        console.log(`\nCategory: ${category.name} (ID: ${category.id})`);
        console.log('Subcategories:');

        category.subcategories.forEach(sub => {
            console.log(`  - [${sub.name}] (ID: ${sub.id}) - Products: ${sub._count.products} - Slug: ${sub.slug}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
