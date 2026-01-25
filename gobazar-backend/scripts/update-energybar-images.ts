import { PrismaClient } from '@prisma/client';
import { withRetry } from '../src/utils/retry';

const prisma = new PrismaClient();

async function updateAllEnergyBarImages() {
    try {
        console.log('🖼️  Updating ALL Energy Bars product images...\n');

        const productImages = [
            {
                name: 'Yoga Bar 20g Protein Bar (Chocolate Brownie)',
                imageUrl: 'https://newassets.apollo247.com/pub/media/catalog/product/y/o/yog0045.jpg'
            },
            {
                name: 'RiteBite Max Protein Active (Choco Slim)',
                imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.ZnxcuoYkslk9AoPVVE7WlwHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3'
            },
            {
                name: 'The Whole Truth - Peanut Butter Protein Bar',
                imageUrl: 'https://m.media-amazon.com/images/I/71iKqVc73jL._SL1500_.jpg'
            },
            {
                name: 'Monkey Bar Vegan Energy Bar (Dark Cocoa & Hazelnut)',
                imageUrl: 'https://m.media-amazon.com/images/I/610YaSHBtHL._SL1080_.jpg'
            },
            {
                name: 'Kellogg\'s K-Energy Bar (Choco & Nut)',
                imageUrl: 'https://www.bigbasket.com/media/uploads/p/m/40204197_2-kelloggs-k-energy-bar-choco-nutty.jpg'
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

        console.log('✅ All Energy Bars images updated!');
    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

updateAllEnergyBarImages();
