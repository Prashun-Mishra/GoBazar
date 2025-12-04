import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const category = await prisma.category.findFirst({
            where: {
                name: {
                    contains: 'Dairy & Breakfast',
                    mode: 'insensitive'
                }
            },
            include: {
                products: {
                    select: { name: true, subcategory: { select: { name: true } } }
                }
            }
        });

        if (!category) {
            console.log('Category not found');
            return;
        }

        console.log(`Category: ${category.name}`);
        console.log(`Total Products: ${category.products.length}`);
        console.log('Products:');
        category.products.forEach(p => {
            console.log(`- ${p.name} (${p.subcategory?.name})`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
