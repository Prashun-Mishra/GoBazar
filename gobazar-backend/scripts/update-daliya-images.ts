import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateAllDaliyaImages() {
    try {
        console.log('🖼️  Updating ALL Daliya & Other Grains product images...\n');

        const productImages = [
            {
                name: 'Patanjali Wheat Daliya',
                imageUrl: 'https://th.bing.com/th/id/OIP.TGxYvlzhoUwPE7t_pbjhiwHaHa?o=7&cb=defcache2rm=3&defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Organic Tattva Wheat Daliya',
                imageUrl: 'https://m.media-amazon.com/images/I/71a5llM7MBL._SL1500_.jpg'
            },
            {
                name: 'Safe Harvest Pearl Millet (Bajra)',
                imageUrl: 'https://m.media-amazon.com/images/I/41CmyoX1SJL._SX300_SY300_QL70_ML2_.jpg'
            },
            {
                name: 'Manna Ragi Malt',
                imageUrl: 'https://m.media-amazon.com/images/I/91uNY6w3p4L._SL1500_.jpg'
            },
            {
                name: 'India Gate Quinoa',
                imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.Su3d9Buj7FLJ2sz0QACRYgHaHi?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
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

        console.log('✅ All Daliya & Other Grains images updated!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateAllDaliyaImages();
