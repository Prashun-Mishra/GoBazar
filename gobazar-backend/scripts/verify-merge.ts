import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const subcategories = await prisma.subCategory.findMany({
            where: {
                name: {
                    contains: 'All Fruits & Vegetables',
                    mode: 'insensitive'
                }
            },
            include: {
                _count: {
                    select: { products: true }
                },
                products: {
                    select: { name: true }
                }
            }
        });

        console.log('Found subcategories:');
        subcategories.forEach(sub => {
            console.log(`ID: ${sub.id}`);
            console.log(`Name: ${sub.name}`);
            console.log(`Slug: ${sub.slug}`);
            console.log(`Products Count: ${sub._count.products}`);
            console.log('Products:', sub.products.map(p => p.name).join(', '));
            console.log('---');
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
