import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const category = await prisma.category.findFirst({
        where: { slug: 'vegetables-fruits' },
        include: {
            _count: {
                select: { products: true },
            },
            products: {
                select: { name: true },
            }
        },
    });

    console.log(JSON.stringify(category, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
