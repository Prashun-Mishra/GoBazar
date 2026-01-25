import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateMithaiMateImage() {
    try {
        console.log('🖼️  Updating Mithai Mate image...\n');

        const updated = await withRetry(async () => {
            return await prisma.product.updateMany({
                where: { name: 'Amul Mithai Mate Sweetened Condensed Milk' },
                data: { images: ['https://www.jiomart.com/images/product/600x600/490983577/amul-mithai-mate-sweetened-condensed-milk-200-g-tin-product-images-o490983577-p490983577-0-202204070409.jpg'] }
            });
        });

        console.log(updated.count > 0 ? '✅ Updated Mithai Mate image!' : '⚠️  Product not found');
    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateMithaiMateImage();
