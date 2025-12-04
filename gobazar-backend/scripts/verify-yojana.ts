import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const products = await prisma.product.findMany({
            where: {
                brand: {
                    contains: 'Yojana',
                    mode: 'insensitive'
                }
            },
            select: {
                name: true,
                brand: true,
                images: true
            }
        });

        console.log(`Found ${products.length} products for brand 'Yojana':`);
        products.forEach(p => {
            console.log(`- ${p.name}`);
            console.log(`  Brand: ${p.brand}`);
            console.log(`  Images:`);
            p.images.forEach(img => console.log(`    ${img}`));
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
