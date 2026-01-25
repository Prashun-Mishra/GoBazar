import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateAllBreakfastMixImages() {
    try {
        console.log('🖼️  Updating ALL Breakfast Mixes product images...\n');

        const productImages = [
            {
                name: 'MTR Rava Idli Mix',
                imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.nqNGqUZ9vW5Gg8vTHlwuaAHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Gits Dosai Mix',
                imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.5HszHhHVgBrmyEOiVCS3rAHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Tata Sampann Multigrain Chilla Mix',
                imageUrl: 'https://cdn.fcglcdn.com/brainbees/images/products/583x720/8906003a.webp'
            },
            {
                name: 'Betty Crocker Pancake Mix (Classic)',
                imageUrl: 'https://m.media-amazon.com/images/I/71X+spg1nzL.jpg'
            },
            {
                name: 'Aashirvaad Instant Veggie Upma Mix',
                imageUrl: 'https://m.media-amazon.com/images/I/514aZ7E7wPL._SX300_SY300_QL70_ML2_.jpg'
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

        console.log('✅ All Breakfast Mixes images updated!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateAllBreakfastMixImages();
