import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const sourceId = 'cmirahujl00078yud02uv6kxs'; // All Fruits & Vegetables Online
    const targetId = 'cmhorlcv80018qc6t5cttsxma'; // All Fruits & Vegetables

    try {
        console.log(`Moving products from ${sourceId} to ${targetId}...`);

        // Update products
        const updateResult = await prisma.product.updateMany({
            where: { subcategoryId: sourceId },
            data: { subcategoryId: targetId }
        });

        console.log(`Moved ${updateResult.count} products.`);

        // Delete source subcategory
        console.log(`Deleting subcategory ${sourceId}...`);
        await prisma.subCategory.delete({
            where: { id: sourceId }
        });

        console.log('Merge completed successfully.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
