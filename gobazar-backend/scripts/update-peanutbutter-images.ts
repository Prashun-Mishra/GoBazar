import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateAllPeanutButterImages() {
    try {
        console.log('🖼️  Updating ALL Peanut Butter product images...\n');

        const productImages = [
            {
                name: 'Pintola All Natural Peanut Butter (Crunchy)',
                imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81oNoF43kuL._SL1500_.jpg'
            },
            {
                name: 'Dr. Oetker FunFoods Peanut Butter (Creamy)',
                imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.Ea2TGBYFjr21WxGaMMBw4gHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'MyFitness Chocolate Peanut Butter (Smooth)',
                imageUrl: 'https://assets.hyugalife.com/catalog/product/h/v/hvov72n7_1_.jpg'
            },
            {
                name: 'Sundrop Peanut Butter (Creamy)',
                imageUrl: 'https://m.media-amazon.com/images/I/81dR2Ca85rL.jpg'
            },
            {
                name: 'Alpino Natural Peanut Butter (Crunchy)',
                imageUrl: 'https://images-eu.ssl-images-amazon.com/images/I/81WS6LaKLOL._AC_UL160_SR160,160_.jpg'
            }
        ];

        for (const { name, imageUrl } of productImages) {
            console.log(`Updating: ${name}`);

            const updated = await withRetry(async () => {
                return await prisma.product.updateMany({
                    where: { name },
                    data: { images: [imageUrl] }
                });
            });

            if (updated.count > 0) {
                console.log(`  ✅ Updated\n`);
            } else {
                console.log(`  ⚠️  Not found: ${name}\n`);
            }
        }

        console.log('✅ All Peanut Butter images updated!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateAllPeanutButterImages();
