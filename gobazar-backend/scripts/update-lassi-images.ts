import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateAllLassiImages() {
    try {
        console.log('🖼️  Updating ALL Lassi, Shakes & More product images...\n');

        const productImages = [
            {
                name: 'Amul Kool Cafe',
                imageUrl: 'https://www.jiomart.com/images/product/600x600/491062295/amul-kool-cafe-flavoured-milk-200-ml-bottle-product-images-o491062295-p590124533-0-202204070206.jpg'
            },
            {
                name: 'Cavin\'s Strawberry Milkshake',
                imageUrl: 'https://www.jiomart.com/images/product/600x600/491376655/cavin-s-strawberry-milkshake-180-ml-tetra-pak-product-images-o491376655-p491376655-4-202203170344.jpg'
            },
            {
                name: 'Amul Rose Lassi',
                imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2025/11/561811434/KT/LX/QM/47294185/200ml-amul-high-protein-rose-lassi-1000x1000.png'
            },
            {
                name: 'Hershey\'s Milkshake - Chocolate',
                imageUrl: 'https://m.media-amazon.com/images/I/51IDNg4bNEL._SL1000_.jpg'
            },
            {
                name: 'Paper Boat Thandai',
                imageUrl: 'https://m.media-amazon.com/images/I/71PWXgVOvXL._SL1500_.jpg'
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

        console.log('✅ All Lassi, Shakes & More images updated!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateAllLassiImages();
