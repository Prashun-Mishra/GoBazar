import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateGoFreshCreamImage() {
    try {
        console.log('🖼️  Updating Go Fresh Cream image...\n');

        const updated = await withRetry(async () => {
            return await prisma.product.updateMany({
                where: { name: 'Go Fresh Cream' },
                data: { images: ['https://m.media-amazon.com/images/I/51j9XxpKnkL._SL1000_.jpg'] }
            });
        });

        console.log(updated.count > 0 ? '✅ Updated Go Fresh Cream image!' : '⚠️  Product not found');
    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateGoFreshCreamImage();
