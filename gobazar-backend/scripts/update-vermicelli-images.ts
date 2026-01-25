import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateAllVermicelliImages() {
    try {
        console.log('🖼️  Updating ALL Vermicelli product images...\n');

        const productImages = [
            {
                name: 'Bambino Roasted Vermicelli',
                imageUrl: 'https://www.rajgrocerystore.hk/wp-content/uploads/2022/05/81UQ2peb2ZL._SY879_.jpg'
            },
            {
                name: 'MTR Roasted Vermicelli',
                imageUrl: 'https://th.bing.com/th/id/OIP.zzkpQ_ZTpdMBcA8g2N8jawHaHa?o=7&cb=defcache2rm=3&defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Anil Roasted Vermicelli',
                imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.xBRpnvnpA-kcIayNFapwZQHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Savorit Roasted Vermicelli',
                imageUrl: 'https://th.bing.com/th/id/OIP.BWo_LjcTjYSsOb438ilADwHaIq?o=7&cb=defcache2rm=3&defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Blue Bird Roasted Vermicelli',
                imageUrl: 'https://th.bing.com/th/id/OIP.WTcDXwucpGXiix_qqdVKFgAAAA?o=7&cb=defcache2rm=3&defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
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

        console.log('✅ All Vermicelli images updated!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateAllVermicelliImages();
