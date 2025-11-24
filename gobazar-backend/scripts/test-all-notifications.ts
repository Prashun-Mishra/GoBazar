import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import config from '../src/config';

const prisma = new PrismaClient();

async function testAllNotifications() {
    try {
        console.log('🧪 Testing All Order Notifications...\n');

        // Get test user
        const user = await prisma.user.findFirst({
            where: { email: 'gobazar.2025@gmail.com' },
            include: { addresses: true }
        });

        if (!user || !user.addresses[0]) {
            console.error('❌ Test user or address not found');
            return;
        }

        // Get test product
        const product = await prisma.product.findFirst({
            where: { id: 'prod-onion-1' },
            include: { variants: true }
        });

        if (!product || !product.variants[0]) {
            console.error('❌ Test product not found');
            return;
        }

        console.log('✅ Test data found');
        console.log(`   User: ${user.email}`);
        console.log(`   Product: ${product.name}\n`);

        // Generate auth token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            config.jwt.secret,
            { expiresIn: '1h' }
        );

        console.log('🎫 Token generated\n');

        // Test 1: Create Order (triggers 3 emails)
        console.log('📧 Test 1: Creating Order...');
        console.log('   Expected emails:');
        console.log('   - Order Confirmation to user');
        console.log('   - Invoice to user');
        console.log('   - Admin Order Alert\n');

        const orderPayload = {
            userId: user.id,
            addressId: user.addresses[0].id,
            items: [{
                productId: product.id,
                variantId: product.variants[0].id,
                quantity: 2
            }],
            paymentMethod: 'COD',
            deliverySlot: 'Today, 6 PM - 8 PM'
        };

        const createOrderResponse = await fetch('http://localhost:3001/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderPayload)
        });

        const orderResult = await createOrderResponse.json();

        if (!orderResult.success || !orderResult.data) {
            console.error('❌ Failed to create order:', orderResult.error);
            return;
        }

        const orderId = orderResult.data.id;
        console.log(`✅ Order created: ${orderId}\n`);
        console.log('   Wait 5 seconds before status updates...\n');
        await sleep(5000);

        // Test 2: Update to PACKING
        console.log('📧 Test 2: Updating to PACKING...');
        console.log('   Expected: Status Update Email\n');

        await updateOrderStatus(orderId, 'PACKING');
        await sleep(3000);

        // Test 3: Update to ON_THE_WAY
        console.log('📧 Test 3: Updating to ON_THE_WAY...');
        console.log('   Expected: Status Update Email\n');

        await updateOrderStatus(orderId, 'ON_THE_WAY');
        await sleep(3000);

        // Test 4: Update to DELIVERED
        console.log('📧 Test 4: Updating to DELIVERED...');
        console.log('   Expected: Status Update Email\n');

        await updateOrderStatus(orderId, 'DELIVERED');

        console.log('\n✅ All tests completed!');
        console.log('\n📬 Check the following inbox:');
        console.log(`   ${user.email}`);
        console.log('\n📊 Expected total emails: 7');
        console.log('   - 1 Order Confirmation');
        console.log('   - 1 Invoice');
        console.log('   - 1 Admin Alert (to ADMIN_EMAIL)');
        console.log('   - 1 PACKING status update');
        console.log('   - 1 ON_THE_WAY status update');
        console.log('   - 1 DELIVERED status update');

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

async function updateOrderStatus(orderId: string, status: string) {
    const response = await fetch(`http://localhost:3001/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
    });

    const result = await response.json();
    if (result.success) {
        console.log(`   ✅ Status updated to ${status}`);
    } else {
        console.log(`   ❌ Failed to update status: ${result.error}`);
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

testAllNotifications();
