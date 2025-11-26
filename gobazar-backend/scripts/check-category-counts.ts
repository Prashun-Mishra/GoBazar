
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const slugs = [
        'vegetables-fruits',
        'dairy-breakfast',
        'munchies',
        'cold-drinks-juices',
        'bakery-biscuits',
        'chicken-meat-fish'
    ];

    console.log('Checking product counts for categories:');

    for (const slug of slugs) {
        const category = await prisma.category.findUnique({
            where: { slug }
        });

        if (!category) {
            console.log(`❌ Category not found: ${slug}`);
            continue;
        }

        const count = await prisma.product.count({
            where: {
                categoryId: category.id,
                isActive: true
            }
        });

        console.log(`- ${slug}: ${count} products`);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
