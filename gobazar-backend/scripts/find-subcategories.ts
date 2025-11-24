import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const subcategories = await prisma.subCategory.findMany({
        where: {
            category: {
                slug: {
                    in: ['pharma-wellness', 'cleaning-essentials', 'home-office', 'personal-care', 'pet-care']
                }
            }
        },
        orderBy: [
            { categoryId: 'asc' },
            { order: 'asc' }
        ],
        select: { name: true, slug: true, category: { select: { name: true, slug: true } } }
    });

    console.log('Found Subcategories:', JSON.stringify(subcategories, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
