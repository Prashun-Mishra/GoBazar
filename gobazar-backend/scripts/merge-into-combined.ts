import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) throw error;
        console.log(`⚠️ DB Error, retrying... (${retries} left)`);
        await new Promise(r => setTimeout(r, delay));
        return withRetry(fn, retries - 1, delay);
    }
}

async function main() {
    try {
        console.log('🔄 Merging into "Muesli & Granola"...');

        // 1. Find Target "Muesli & Granola"
        const target = await withRetry(() => prisma.subCategory.findFirst({
            where: { name: { contains: 'Muesli & Granola', mode: 'insensitive' } },
            include: { _count: { select: { products: true } } }
        }));

        if (!target) {
            console.error('❌ Target "Muesli & Granola" not found!');
            return;
        }
        console.log(`🎯 Target: ${target.name} (ID: ${target.id})`);

        // 2. Find Sources to Merge (Separate "Muesli" and "Granola" subcats)
        const sources = await withRetry(() => prisma.subCategory.findMany({
            where: {
                name: { in: ['Muesli', 'Granola', 'Museli'], mode: 'insensitive' },
                NOT: { id: target.id } // exclude target itself
            },
            include: { _count: { select: { products: true } } }
        }));

        console.log(`Found ${sources.length} duplicate subcategories to merge.`);

        for (const source of sources) {
            console.log(`Processing: ${source.name} (ID: ${source.id}) - Products: ${source._count.products}`);

            // Move products
            if (source._count.products > 0) {
                const result = await withRetry(() => prisma.product.updateMany({
                    where: { subcategoryId: source.id },
                    data: { subcategoryId: target.id }
                }));
                console.log(`   -> Moved ${result.count} products to Target.`);
            }

            // Delete source
            await withRetry(() => prisma.subCategory.delete({
                where: { id: source.id }
            }));
            console.log(`   -> Deleted subcategory available.`);
        }

        console.log('\n🎉 Merge Complete!');

    } catch (error) {
        console.error('❌ Error merging:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
