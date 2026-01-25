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
        console.log('🔄 Merging "Museli" (typo) into "Muesli" (correct)...');

        // 1. Find Correct "Muesli" Subcategory
        let correctMuesli = await withRetry(() => prisma.subCategory.findFirst({
            where: { name: { equals: 'Muesli', mode: 'insensitive' } },
            include: { _count: { select: { products: true } } }
        }));

        // if not found, maybe create it? No, script logic implies it should exists
        if (!correctMuesli) {
            console.log("⚠️ 'Muesli' not found. Cannot merge target.");
            // Try creating it if missing?
            return;
        }
        console.log(`✅ Target: ${correctMuesli.name} (ID: ${correctMuesli.id})`);

        // 2. Find Incorrect "Museli" Subcategory
        let typoMuesli = await withRetry(() => prisma.subCategory.findFirst({
            where: { name: { equals: 'Museli', mode: 'insensitive' } },
            include: { _count: { select: { products: true } } }
        }));

        if (typoMuesli) {
            console.log(`⚠️ Found Typo Subcat: ${typoMuesli.name} (ID: ${typoMuesli.id}) - Products: ${typoMuesli._count.products}`);

            // Move products
            if (typoMuesli._count.products > 0) {
                await withRetry(() => prisma.product.updateMany({
                    where: { subcategoryId: typoMuesli!.id },
                    data: { subcategoryId: correctMuesli!.id }
                }));
                console.log(`   -> Moved products to 'Muesli'`);
            }

            // Delete
            await withRetry(() => prisma.subCategory.delete({
                where: { id: typoMuesli!.id }
            }));
            console.log(`   -> Deleted 'Museli'`);
        } else {
            console.log("✅ No 'Museli' typo found.");
        }

        // 3. Deduplicate exact "Muesli" duplicates (if any)
        const exactDuplicates = await withRetry(() => prisma.subCategory.findMany({
            where: { name: { equals: 'Muesli', mode: 'insensitive' } },
            orderBy: { createdAt: 'asc' }
        }));

        if (exactDuplicates.length > 1) {
            console.log(`⚠️ Found ${exactDuplicates.length} exact 'Muesli' duplicates. Deduplicating...`);
            const [primary, ...others] = exactDuplicates;

            for (const other of others) {
                await withRetry(() => prisma.product.updateMany({
                    where: { subcategoryId: other.id },
                    data: { subcategoryId: primary.id }
                }));
                await withRetry(() => prisma.subCategory.delete({
                    where: { id: other.id }
                }));
                console.log(`   -> Merged & Deleted duplicate ID: ${other.id}`);
            }
        }

        console.log('\n🎉 Deduplication Complete!');

    } catch (error) {
        console.error('❌ Error merging:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
