
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('🔌 Connecting to Database...');
        // Try a simple count
        const productCount = await prisma.product.count();
        console.log(`✅ Connection Successful!`);
        console.log(`📦 Product Count: ${productCount}`);

        // Try to fetch one product to ensure read access
        const firstProduct = await prisma.product.findFirst();
        if (firstProduct) {
            console.log('✅ Read Data Successful');
            console.log('First Product:', firstProduct.name);
        } else {
            console.log('ℹ️ No products found (DB is accessible but empty)');
        }

    } catch (error: any) {
        console.error('❌ Database Connection Failed');
        console.error('Error Code:', error.code);
        console.error('Message:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
