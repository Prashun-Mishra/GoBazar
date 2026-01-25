import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateAmulFreshCreamImage() {
    try {
        console.log('🖼️  Updating Amul Fresh Cream image...\n');

        const updated = await withRetry(async () => {
            return await prisma.product.updateMany({
                where: { name: 'Amul Fresh Cream' },
                data: { images: ['https://tse3.mm.bing.net/th/id/OIP.izz6jYvRNQq2T9NjPtm4_QHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'] }
            });
        });

        console.log(updated.count > 0 ? '✅ Updated Amul Fresh Cream image!' : '⚠️  Product not found');
    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateAmulFreshCreamImage();
