import { PrismaClient } from '@prisma/client';

const dbUrl = process.env.DATABASE_URL;

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: dbUrl,
        },
    },
});

async function main() {
    console.log('🔌 Testing connection to database...');
    try {
        const count = await prisma.product.count();
        console.log('✅ Connection successful!');
        console.log(`📊 Current Product Count: ${count}`);
    } catch (error) {
        console.error('❌ Connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
