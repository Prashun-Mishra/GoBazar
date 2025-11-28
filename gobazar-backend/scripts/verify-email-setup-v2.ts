import emailService from '../src/services/emailService';
import config from '../src/config';

async function verifySetup() {
    console.log('🔍 Verifying Email Setup (Optimized)...');
    console.log('--------------------------------');
    console.log(`Host: ${config.email.host}`);
    console.log(`Port: ${config.email.port}`);
    console.log(`User: ${config.email.user}`);
    console.log(`Pass: ${config.email.pass ? '********' : '(missing)'}`);
    console.log('--------------------------------');

    const isConnected = await emailService.testConnection();

    if (isConnected) {
        console.log('✅ Email service is connected and ready!');
    } else {
        console.error('❌ Email service connection failed.');
    }
}

verifySetup();
