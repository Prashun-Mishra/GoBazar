import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) throw error;
        console.log(`⚠️ Retry... (${retries} left)`);
        await new Promise(r => setTimeout(r, delay));
        return withRetry(fn, retries - 1, delay);
    }
}

async function main() {
    try {
        console.log('🖼️  Updating Cereal Images with User Provided URLs...\n');

        const updates = [
            {
                name: 'Kellogg’s Corn Flakes with Immuno Nutrients',
                image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=900/da/cms-assets/cms/product/90aeff9c-22f2-4661-941d-cea2515453e8.png'
            },
            {
                name: 'Nestlé Munch Choco Fills Cereal',
                image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=900/da/cms-assets/cms/product/01e92a08-b40b-4d6f-aca7-8537cd382447.png'
            },
            {
                name: 'Quaker Rolled Instant Oats',
                image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=900/da/cms-assets/cms/product/c8549033-8ab5-4411-981f-233d1bb37498.jpg'
            },
            {
                name: 'Bagrry’s 100% Jumbo Rolled Oats',
                image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=900/da/cms-assets/cms/product/5f35fb39-a363-4fd4-8e8b-ca08bcce186c.png'
            }
        ];

        for (const item of updates) {
            await withRetry(async () => {
                const updated = await prisma.product.updateMany({
                    where: { name: { contains: item.name } },
                    data: { images: [item.image] }
                });
                console.log(`✅ Updated: ${item.name}`);
                console.log(`   -> New Image: ${item.image}`);
            });
        }

        console.log('\n🎉 Images updated successfully!');

    } catch (error) {
        console.error('❌ Error updating images:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
