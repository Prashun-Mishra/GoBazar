import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateAllHoneyImages() {
    try {
        console.log('🖼️  Updating ALL Honey & Chyawanprash product images...\n');

        const productImages = [
            {
                name: 'Dabur Honey',
                imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71bhzDVhxRS._SL1500_.jpg'
            },
            {
                name: 'Dabur Chyawanprash',
                imageUrl: 'https://m.media-amazon.com/images/I/71tH6y4K-SL.jpg'
            },
            {
                name: 'Saffola Honey',
                imageUrl: 'https://images.marico.in/800x0/uploads/saffola-honey-gold-glass-500g-2-6017.jpg'
            },
            {
                name: 'Baidyanath Chyawanprash Special',
                imageUrl: 'https://www.baidyanathayurved.com/cdn/shop/files/BCP_Special_1kgRAJPACK-Copy.jpg?v=1760354993&width=1080'
            },
            {
                name: 'Organic India Honey',
                imageUrl: 'https://www.bigbasket.com/media/uploads/p/l/40138001_2-organic-india-wild-forest-honey.jpg'
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

        console.log('✅ All Honey & Chyawanprash images updated!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateAllHoneyImages();
