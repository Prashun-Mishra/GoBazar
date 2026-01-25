import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateCheeseImages() {
    try {
        console.log('🖼️  Updating Cheese product images...\n');

        // Product name to image URL mapping
        const productImages = [
            {
                name: 'Amul Cheese Slices',
                imageUrl: 'https://m.media-amazon.com/images/I/71zF7ZBe4lL._SL1500_.jpg'
            },
            {
                name: 'Amul Pizza Mozzarella Cheese',
                imageUrl: 'https://www.bigbasket.com/media/uploads/p/l/100019887_3-amul-pizza-cheese-mozzarella.jpg'
            },
            {
                name: 'Amul Cheese Cubes',
                imageUrl: 'https://cdn.shopify.com/s/files/1/0551/4133/5088/products/amul-cheese-chiplets-200-g-carton-2-20210405_1024x1024.jpg?v=1641461494'
            },
            {
                name: 'Amul Processed Cheese Block',
                imageUrl: 'https://ik.imagekit.io/wlfr/wellness/images/products/261227-1.jpg/tr:w-3840,dpr-1,c-at_max,cm-pad_resize,ar-1210-700,pr-true,f-webp,q-80,l-image,i-Wellness_logo_BDwqbQao9.png,lfo-bottom_right,w-200,h-90,c-at_least,cm-pad_resize,l-end'
            },
            {
                name: 'D\'lecta Processed Cheese Slices',
                imageUrl: 'https://www.bigbasket.com/media/uploads/p/xl/40237192_1-dlecta-cheese-slices-processed-spread.jpg'
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
                console.log(`  ⚠️  Not found\n`);
            }
        }

        console.log('✅ Cheese image update complete!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateCheeseImages();
