import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateButterImages() {
    try {
        console.log('🖼️  Updating Butter product images...\n');

        // Product name to image URL mapping
        const productImages = [
            {
                name: 'Amul Salted Butter',
                imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.waYHw4EZR6G78E2DZEP_PAHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Amul Salted Butter – Family Pack',
                imageUrl: 'https://m.media-amazon.com/images/I/61duEBwvXdL._SX679_.jpg'
            },
            {
                name: 'Amul Garlic & Herbs Butter',
                imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.s7XsmBpbq1fJwJEiATilRAHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Mother Dairy Salted Butter',
                imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.WbcBsHXMydfaRZAOaE3lQgHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Pintola Unsweetened Creamy Almond Butter',
                imageUrl: 'https://th.bing.com/th/id/OIP.C9mnPjhKeoL7FZlV-XMFGQHaHa?o=7&cb=defcache2rm=3&defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
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
                console.log(`  ⚠️  Not found\n`);
            }
        }

        console.log('✅ Butter image update complete!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateButterImages();
