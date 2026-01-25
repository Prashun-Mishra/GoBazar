import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateLassiImage() {
    try {
        console.log('🖼️  Updating Strawberry Lassi image...\n');

        const update = await withRetry(async () => {
            return await prisma.product.updateMany({
                where: { name: 'Mother Dairy Sweet Strawberry Flavoured Lassi' },
                data: { images: ['https://www.bigbasket.com/media/uploads/p/l/40004524_7-mother-dairy-lassi-strawberry-asli-refreshment.jpg'] }
            });
        });

        console.log(update.count > 0 ? '✅ Updated Strawberry Lassi image!' : '⚠️  Product not found');
    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateLassiImage();
