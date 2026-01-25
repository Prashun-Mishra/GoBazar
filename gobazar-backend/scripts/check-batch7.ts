import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkBatch7() {
    try {
        console.log('🔍 Checking Batch 7 products...\n');

        const productNames = [
            'Amul Fresh Cream',
            'Nestle Milkmaid Sweetened Condensed Milk',
            'Amul Mithai Mate Sweetened Condensed Milk',
            'Go Fresh Cream',
            'Milky Mist Fresh Cream',
            'Bambino Roasted Vermicelli',
            'MTR Roasted Vermicelli',
            'Anil Roasted Vermicelli',
            'Savorit Roasted Vermicelli',
            'Blue Bird Roasted Vermicelli',
            'Tata Sampann Thick Poha',
            'Rajdhani Poha (Thick)',
            'Fortune Indori Poha',
            'Safe Harvest Pesticide Free Thick Poha',
            'Super Saver Poha (Thick)',
            'Pintola All Natural Peanut Butter (Crunchy)',
            'Dr. Oetker FunFoods Peanut Butter (Creamy)',
            'MyFitness Chocolate Peanut Butter (Smooth)',
            'Sundrop Peanut Butter (Creamy)',
            'Alpino Natural Peanut Butter (Crunchy)'
        ];

        for (const name of productNames) {
            const product = await prisma.product.findFirst({
                where: { name }
            });

            if (product) {
                console.log(`✅ ${name}`);
            } else {
                console.log(`❌ MISSING: ${name}`);
            }
        }

        console.log(`\n📊 Total checked: ${productNames.length}`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkBatch7();
