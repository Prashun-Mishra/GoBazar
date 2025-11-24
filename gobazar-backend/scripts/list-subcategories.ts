import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const subcategories = await prisma.subCategory.findMany({
        orderBy: { order: 'asc' },
        select: { name: true, slug: true, categoryId: true, image: true }
    });

    console.log('Subcategories:', JSON.stringify(subcategories, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
