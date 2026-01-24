import { PrismaClient } from '@prisma/client';

const dbUrl = 'postgresql://neondb_owner:npg_CD7b3mhtRlKE@ep-bold-lake-ad5fj4d1-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: dbUrl,
        },
    },
});

async function main() {
    console.log('🔌 Testing connection to:', dbUrl);
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
