import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const category = await prisma.category.findFirst({
            where: {
                name: {
                    contains: 'Vegetables & Fruits',
                    mode: 'insensitive'
                }
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
            console.log('Category not found');
            return;
        }

        console.log(`Category: ${category.name} (${category.id})`);
        console.log('Subcategories:');
        category.subcategories.forEach(sub => {
            console.log(`- [${sub.id}] ${sub.name} (Slug: ${sub.slug}) - Products: ${sub._count.products}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
