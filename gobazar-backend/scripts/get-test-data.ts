import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const user = await prisma.user.findFirst({
            where: { email: 'gobazar.2025@gmail.com' },
            include: { addresses: true }
        });

        const product = await prisma.product.findFirst({
            where: { id: 'prod-onion-1' },
            include: { variants: true }
        });

        if (!user || !product) {
            console.error('User or product not found');
            return;
        }

        console.log('userId:', user.id);
        console.log('email:', user.email);
        console.log('addressId:', user.addresses[0].id);
        console.log('productId:', product.id);
        console.log('variantId:', product.variants[0].id);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
