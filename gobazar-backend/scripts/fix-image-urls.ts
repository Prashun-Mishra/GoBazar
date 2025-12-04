import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        // Find all products
        const products = await prisma.product.findMany();

        let fixedCount = 0;

        for (const product of products) {
            let needsUpdate = false;
            const newImages = product.images.map(url => {
                if (url.includes('cdn-cgi/image=f=auto')) {
                    needsUpdate = true;
                    return url.replace('cdn-cgi/image=f=auto', 'cdn-cgi/image/f=auto');
                }
                return url;
            });

            if (needsUpdate) {
                console.log(`Fixing images for: ${product.name}`);
                await prisma.product.update({
                    where: { id: product.id },
                    data: { images: newImages }
                });
                fixedCount++;
            }
        }

        console.log(`\n🎉 Fixed image URLs for ${fixedCount} products.`);

    } catch (error) {
        console.error('Error fixing images:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
