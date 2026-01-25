import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateAllBatterImages() {
    try {
        console.log('🖼️  Updating ALL Batter product images...\n');

        const productImages = [
            {
                name: 'ID Idli & Dosa Batter',
                imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/images/products/full_screen/pro_17772.jpg?ts=1685979844'
            },
            {
                name: 'MTR Dosa Batter',
                imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.4pc4B8JEm17QxgNafHhzPAHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'ID Vada Batter',
                imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.aDWP_CKxeRsvcdv-lWn0ywHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Asal Idli/Dosa Batter',
                imageUrl: 'https://m.media-amazon.com/images/I/71ta34POD1L._SL1500_.jpg'
            },
            {
                name: 'Rishta Idli & Dosa Batter',
                imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.E40knGE626v9kZIKbuXjXQAAAA?cb=defcache2defcache=1&w=300&h=300&rs=1&pid=ImgDetMain&o=7&rm=3'
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

        console.log('✅ All Batter images updated!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateAllBatterImages();
