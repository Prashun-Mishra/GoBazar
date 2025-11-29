import config from '../src/config';
import emailService from '../src/services/emailService';

async function testResend() {
    console.log('Testing Resend Integration...');
    console.log('API Key present:', !!config.email.resendApiKey);
    console.log('From Email:', config.email.fromEmail);

    if (!config.email.resendApiKey) {
        console.error('❌ RESEND_API_KEY is missing in environment variables.');
        process.exit(1);
    }

    const targetEmail = config.email.adminEmail || 'mishra.prashun@gmail.com'; // Use admin email or fallback

    console.log(`Attempting to send email to ${targetEmail}...`);

    const result = await emailService.sendEmail({
        to: targetEmail,
        subject: 'Test Email from GoBazar (Resend)',
        text: 'This is a test email to verify Resend integration.',
        html: '<p>This is a <strong>test email</strong> to verify Resend integration.</p>',
    });

    if (result) {
        console.log('✅ Email sent successfully!');
    } else {
        console.error('❌ Failed to send email.');
    }
}

testResend().catch(console.error);
