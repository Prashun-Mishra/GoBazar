import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) throw error;
        console.log(`⚠️ Retry... (${retries} left)`);
        await new Promise(r => setTimeout(r, delay));
        return withRetry(fn, retries - 1, delay);
    }
}

async function main() {
    try {
        console.log('🧹 Starting Content Cleanup (Robust Mode)...\n');

        // 1. Update Product Images to Unsplash (Reliable)
        const updates = [
            {
                name: 'Kellogg’s Corn Flakes with Immuno Nutrients',
                image: 'https://images.unsplash.com/photo-1579717544078-43d8393e8876?w=600&q=80'
            },
            {
                name: 'Nestlé Munch Choco Fills Cereal',
                image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=600&q=80'
            },
            {
                name: 'Quaker Rolled Instant Oats',
                image: 'https://images.unsplash.com/photo-1615485925763-86786288924b?w=600&q=80'
            },
            {
                name: 'Bagrry’s 100% Jumbo Rolled Oats',
                image: 'https://images.unsplash.com/photo-1517093725459-7170a41da1db?w=600&q=80'
            }
        ];

        for (const item of updates) {
            await withRetry(async () => {
                const updated = await prisma.product.updateMany({
                    where: { name: { contains: item.name } },
                    data: { images: [item.image] }
                });
                console.log(`✅ Updated image for: ${item.name} (${updated.count} items)`);
            });
        }

        // 2. Identify and Delete Empty Subcategories
        const subcatsToDelete = ['Kids Cereals', 'Corn Flakes', 'Oats & Porridge'];

        for (const subName of subcatsToDelete) {
            await withRetry(async () => {
                const subcat = await prisma.subCategory.findFirst({
                    where: { name: { equals: subName, mode: 'insensitive' } }
                });

                if (subcat) {
                    console.log(`Processing subcategory removal: ${subName}`);

                    const unlinked = await prisma.product.updateMany({
                        where: { subcategoryId: subcat.id },
                        data: { subcategoryId: null }
                    });
                    console.log(`  - Unlinked ${unlinked.count} products`);

                    await prisma.subCategory.delete({
                        where: { id: subcat.id }
                    });
                    console.log(`  - Deleted subcategory: ${subName}`);
                } else {
                    console.log(`⚠️ Subcategory not found (already deleted?): ${subName}`);
                }
            });
        }

        console.log('\n🎉 Cleanup complete!');

    } catch (error) {
        console.error('❌ Error during cleanup:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
