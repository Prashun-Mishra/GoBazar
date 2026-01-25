import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateCurdYogurtImages() {
    try {
        console.log('🖼️  Updating Curd & Yogurt product images...\n');

        // Product name to image URL mapping
        const productImages = [
            {
                name: 'Epigamia Natural Greek Yogurt',
                imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.LduVw3caSKMPcJYqt6mHrwHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Mother Dairy Classic Fresh Curd',
                imageUrl: 'https://m.media-amazon.com/images/I/71-9oabrOaL._SX385_.jpg'
            },
            {
                name: 'Nestlé a+ Thick & Creamy Dahi',
                imageUrl: 'https://www.jiomart.com/images/product/600x600/490016374/nestle-a-slim-dahi-400-g-container-0-20211021.jpg'
            },
            {
                name: 'Epigamia Blueberry Flavoured Yogurt',
                imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.utTJ7MskeWYCjvTZDDg39AHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Mother Dairy Sweet Strawberry Flavoured Lassi',
                imageUrl: 'https://www.jiomart.com/images/product/600x600/490800892/mother-dairy-sweetened-lassi-200-ml-bottle-product-images-o490800892-p590041375-1-202203170857.jpg'
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
                console.log(`  ✅ Updated: ${name}\n`);
            } else {
                console.log(`  ⚠️  Not found: ${name}\n`);
            }
        }

        console.log('✅ Curd & Yogurt image update complete!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateCurdYogurtImages();
