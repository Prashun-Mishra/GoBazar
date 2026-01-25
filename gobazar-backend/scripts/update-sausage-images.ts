import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateAllSausageImages() {
    try {
        console.log('🖼️  Updating ALL Sausage, Salami & Ham product images...\n');

        const productImages = [
            {
                name: 'Prasuma Chicken Salami (Plain)',
                imageUrl: 'https://cdn.grofers.com/da/cms-assets/cms/product/61110bea-c58d-4f10-b020-8e8980c6e5da.jpg'
            },
            {
                name: 'Zorabian Chicken Sausages (Spicy)',
                imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.WWw_DReeaUH7nUJCQpA_tgHaGt?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Licious Chicken Lyoner (Classic)',
                imageUrl: 'https://dao54xqhg9jfa.cloudfront.net/OMS-ProductMerchantdising/a5b86e56-3e55-2c1d-ef59-99c7484d7de8/original/cold_cut-03.jpg'
            },
            {
                name: 'Venky\'s Chicken Frankfurters',
                imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.hMbDmYzsi4UrtQDyyDFj-wHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'Meatzaa Chicken Ham Slices',
                imageUrl: 'https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/c9562ba2-f3bd-4410-abba-6bdc36004778.jpg?ts=1722594295'
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

        console.log('✅ All Sausage, Salami & Ham images updated!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateAllSausageImages();
