import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('🔄 Merging Duplicate "Muesli" Subcategories...');

        // 1. Find all "Muesli" subcategories
        const muesliSubcats = await prisma.subCategory.findMany({
            where: {
                name: { equals: 'Muesli', mode: 'insensitive' }
            },
            include: {
                _count: { select: { products: true } }
            },
            orderBy: { createdAt: 'asc' } // Keep the oldest one
        });

        if (muesliSubcats.length <= 1) {
            console.log('✅ No duplicates found (or only 1 exists).');
            return;
        }

        console.log(`Found ${muesliSubcats.length} "Muesli" subcategories.`);

        // 2. Identify Target (Keep oldest) and Sources (Delete others)
        const [target, ...sources] = muesliSubcats;
        console.log(`🎯 Target (Keeping): ${target.name} (ID: ${target.id}) - Products: ${target._count.products}`);

        for (const source of sources) {
            console.log(`🗑️  Processing Duplicate: ${source.name} (ID: ${source.id}) - Products: ${source._count.products}`);

            // 3. Move products to Target
            if (source._count.products > 0) {
                const updateResult = await prisma.product.updateMany({
                    where: { subcategoryId: source.id },
                    data: { subcategoryId: target.id }
                });
                console.log(`   -> Moved ${updateResult.count} products to Target.`);
            }

            // 4. Delete Source
            await prisma.subCategory.delete({
                where: { id: source.id }
            });
            console.log(`   -> Deleted duplicate subcategory.`);
        }

        console.log('\n🎉 Merge Complete!');

    } catch (error) {
        console.error('❌ Error merging:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
