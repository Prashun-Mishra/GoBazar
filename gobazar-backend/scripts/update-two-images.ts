import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateTwoImages() {
    try {
        console.log('🖼️  Updating 2 product images...\n');

        // Update Nestlé a+ Thick & Creamy Dahi
        console.log('Updating: Nestlé a+ Thick & Creamy Dahi');
        const nestleUpdate = await withRetry(async () => {
            return await prisma.product.updateMany({
                where: { name: 'Nestlé a+ Thick & Creamy Dahi' },
                data: { images: ['https://m.media-amazon.com/images/I/31NSQ9Tu-aL._SX300_SY300_QL70_ML2_.jpg'] }
            });
        });
        console.log(nestleUpdate.count > 0 ? '  ✅ Updated\n' : '  ⚠️  Not found\n');

        // Update Mother Dairy Sweet Strawberry Flavoured Lassi
        console.log('Updating: Mother Dairy Sweet Strawberry Flavoured Lassi');
        const lassiUpdate = await withRetry(async () => {
            return await prisma.product.updateMany({
                where: { name: 'Mother Dairy Sweet Strawberry Flavoured Lassi' },
                data: { images: ['https://www.jiomart.com/images/product/600x600/490887558/mother-dairy-sweet-strawberry-flavoured-lassi-200-ml-bottle-product-images-o490887558-p590049056-0-202203151747.jpg'] }
            });
        });
        console.log(lassiUpdate.count > 0 ? '  ✅ Updated\n' : '  ⚠️  Not found\n');

        console.log('✅ Image update complete!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateTwoImages();
