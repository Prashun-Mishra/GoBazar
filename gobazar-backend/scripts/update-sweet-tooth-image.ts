import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateSweetToothImage() {
    const newImageUrl = 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-7_3.png';

    try {
        // Find and update the Sweet Tooth category
        const category = await prisma.category.updateMany({
            where: {
                OR: [
                    { name: { contains: 'Sweet', mode: 'insensitive' } },
                    { slug: { contains: 'sweet', mode: 'insensitive' } },
                ]
            },
            data: {
                image: newImageUrl,
            },
        });

        console.log('✅ Updated Sweet Tooth category image');
        console.log('Categories updated:', category.count);

        // Verify the update
        const updated = await prisma.category.findFirst({
            where: {
                OR: [
                    { name: { contains: 'Sweet', mode: 'insensitive' } },
                    { slug: { contains: 'sweet', mode: 'insensitive' } },
                ]
            },
        });

        if (updated) {
            console.log('Category:', updated.name);
            console.log('New Image:', updated.image);
        }

    } catch (error) {
        console.error('Error updating category:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateSweetToothImage();
