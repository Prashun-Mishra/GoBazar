import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateAllPohaImages() {
    try {
        console.log('🖼️  Updating ALL Poha product images...\n');

        const productImages = [
            {
                name: 'Tata Sampann Thick Poha',
                imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.UuzryOzUFBy2bxyHQ5ef7AHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Rajdhani Poha (Thick)',
                imageUrl: 'https://m.media-amazon.com/images/I/71eh+WsLRkL._SX679_.jpg'
            },
            {
                name: 'Fortune Indori Poha',
                imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.Q6TmrCGGaCqjyJY_xozMZwHaIi?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Safe Harvest Pesticide Free Thick Poha',
                imageUrl: 'https://m.media-amazon.com/images/I/717jUVT2PHL._SL1500_.jpg'
            },
            {
                name: 'Super Saver Poha (Thick)',
                imageUrl: 'https://www.bigbasket.com/media/uploads/p/xl/40160072_2-super-saver-red-avalpoha.jpg'
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

        console.log('✅ All Poha images updated!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateAllPohaImages();
