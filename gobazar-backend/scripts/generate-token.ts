import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import config from '../src/config';

const prisma = new PrismaClient();

async function main() {
    try {
        const user = await prisma.user.findUnique({
            where: { email: 'gobazar.2025@gmail.com' }
        });

        if (!user) {
            console.error('User not found');
            return;
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            config.jwt.secret,
            { expiresIn: '1h' }
        );

        const fs = require('fs');
        fs.writeFileSync('token.txt', token);
        console.log('Token written to token.txt');

    } catch (error) {
        console.error('Error generating token:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
