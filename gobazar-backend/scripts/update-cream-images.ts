import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateAllCreamImages() {
    try {
        console.log('🖼️  Updating ALL Cream & Condensed Milk product images...\n');

        const productImages = [
            {
                name: 'Amul Fresh Cream',
                imageUrl: 'https://www.bigbasket.com/media/uploads/p/l/40102603_3-amul-fresh-cream-25-milk-fat-low-fat.jpg'
            },
            {
                name: 'Amul Mithai Mate Sweetened Condensed Milk',
                imageUrl: 'https://dailycart.com/cdn/shop/files/41HeAIZ5YjS.jpg?v=1755203819&width=500'
            },
            {
                name: 'Nestle Milkmaid Sweetened Condensed Milk',
                imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.ptSYpdQjST-0iVETjlpJxQHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Milky Mist Fresh Cream',
                imageUrl: 'https://www.bigbasket.com/media/uploads/p/l/40121096_4-milky-mist-cream-fresh.jpg'
            },
            {
                name: 'Go Fresh Cream',
                imageUrl: 'https://m.media-amazon.com/images/I/51j9XxpKnkL._SL1000_.jpg'
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

        console.log('✅ All Cream & Condensed Milk images updated!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateAllCreamImages();
