import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('🔍 Checking Categories...');
        const categories = await prisma.category.findMany({
            include: { subcategories: true }
        });

        // Find "Dairy & Breakfast" or similar
        const breakfastCat = categories.find(c =>
            c.name.includes('Breakfast') ||
            c.name.includes('Dairy') ||
            c.slug.includes('dairy')
        );

        if (!breakfastCat) {
            console.error('❌ "Dairy & Breakfast" category not found!');
            return;
        }

        console.log(`✅ Found Category: ${breakfastCat.name} (ID: ${breakfastCat.id})`);

        // Check/Create Subcategories
        const targetSubcats = ['Granola', 'Muesli'];
        const existingSubcats = breakfastCat.subcategories.map(s => s.name);

        for (const target of targetSubcats) {
            if (existingSubcats.some(s => s.toLowerCase() === target.toLowerCase())) {
                console.log(`  - Subcategory exists: ${target}`);
            } else {
                console.log(`  - Creating missing subcategory: ${target}`);
                await prisma.subCategory.create({
                    data: {
                        name: target,
                        slug: target.toLowerCase().replace(/ /g, '-'),
                        categoryId: breakfastCat.id,
                        image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/ccc5c5d5-decd-432e-853a-dcfb2f51dfba.png" // Temporary image from batch
                    }
                });
            }
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
