import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
    try {
        // 1. Get an admin user or create a token payload
        // We'll just create a payload assuming we are admin
        const payload = {
            userId: 'admin-test-id',
            email: 'admin@example.com',
            role: 'ADMIN'
        };

        const secret = process.env.JWT_SECRET || 'fallback-secret-key';
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        console.log('🔑 Generated Test Token');

        // 2. Call the API
        const url = 'http://127.0.0.1:5000/api/admin/products?limit=2000';
        console.log(`🌐 Calling API: ${url}`);

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = response.data;

        if (data.success) {
            console.log(`✅ Success!`);
            console.log(`📊 Total in DB (from metadata): ${data.pagination.total}`);
            console.log(`📦 Items returned in array: ${data.data.length}`);

            if (data.data.length === 50 && data.pagination.total > 50) {
                console.error('❌ ISSUE DETECTED: Returned items capped at 50 despite limit=2000');
            } else if (data.data.length > 50) {
                console.log('✅ API is returning more than 50 items.');
            } else {
                console.log('ℹ️ Total items are 50 or less.');
            }
        } else {
            console.error('❌ API returned error:', data);
        }

    } catch (error: any) {
        console.error('❌ Error Message:', error.message);
        if (error.code) console.error('Error Code:', error.code);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
            console.error('No response received from server');
        }
    } finally {
        await prisma.$disconnect();
    }
}

main();
