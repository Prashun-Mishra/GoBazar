import emailService from '../src/services/emailService';
import config from '../src/config';

async function testSubdomainEmail() {
    console.log('📧 Testing Resend with Subdomain...');
    console.log('=====================================');
    console.log('From Email:', config.email.fromEmail);
    console.log('Resend API Key:', config.email.resendApiKey ? '✅ Configured' : '❌ Missing');
    console.log('');

    // Replace with your actual email
    const testEmail = 'YOUR_EMAIL@gmail.com'; // ⚠️ CHANGE THIS!
    const testOTP = '123456';

    try {
        console.log(`📨 Sending test OTP to: ${testEmail}`);
        const success = await emailService.sendOTP(testEmail, testOTP);

        if (success) {
            console.log('');
            console.log('✅ Email sent successfully!');
            console.log('✅ Check your inbox for OTP email');
            console.log(`✅ From: ${config.email.fromEmail}`);
            console.log('');
            console.log('👉 If using subdomain (mail.gobazaar.in), you should see:');
            console.log('   From: no-reply@mail.gobazaar.in');
            console.log('');
            console.log('👉 Check spam folder if not in inbox');
        } else {
            console.log('');
            console.log('❌ Email sending failed');
            console.log('❌ Check Resend dashboard for errors');
            console.log('❌ Verify domain DNS records are configured');
        }
    } catch (error) {
        console.log('');
        console.error('❌ Error sending email:', error);
        console.log('');
        console.log('Possible issues:');
        console.log('1. RESEND_API_KEY missing or invalid');
        console.log('2. Domain not verified in Resend');
        console.log('3. FROM email domain mismatch');
    }
}

testSubdomainEmail();
