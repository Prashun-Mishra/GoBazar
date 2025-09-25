import nodemailer from 'nodemailer';
import config from '@/config';
import { EmailOptions } from '@/types';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465, // true for 465, false for other ports
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"GoBazar" <${config.email.user}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', result.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendOTP(email: string, otp: string): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GoBazar - OTP Verification</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .otp-box { background: white; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px; border: 2px solid #4F46E5; }
          .otp-code { font-size: 32px; font-weight: bold; color: #4F46E5; letter-spacing: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>GoBazar</h1>
            <p>Your trusted grocery partner</p>
          </div>
          <div class="content">
            <h2>OTP Verification</h2>
            <p>Hello,</p>
            <p>You have requested to verify your email address. Please use the following OTP to complete your verification:</p>
            
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            
            <p><strong>Important:</strong></p>
            <ul>
              <li>This OTP is valid for ${config.otp.expiryMinutes} minutes only</li>
              <li>Do not share this OTP with anyone</li>
              <li>If you didn't request this OTP, please ignore this email</li>
            </ul>
            
            <p>Thank you for choosing GoBazar!</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 GoBazar. All rights reserved.</p>
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: 'GoBazar - OTP Verification',
      html,
      text: `Your GoBazar OTP is: ${otp}. This OTP is valid for ${config.otp.expiryMinutes} minutes only.`,
    });
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to GoBazar</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .welcome-box { background: white; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to GoBazar! 🎉</h1>
          </div>
          <div class="content">
            <div class="welcome-box">
              <h2>Hello ${name}!</h2>
              <p>Welcome to GoBazar - your trusted grocery partner. We're excited to have you on board!</p>
            </div>
            
            <h3>What's next?</h3>
            <ul>
              <li>Browse our wide range of fresh groceries</li>
              <li>Add items to your cart and place your first order</li>
              <li>Enjoy fast delivery right to your doorstep</li>
              <li>Save with exclusive deals and coupons</li>
            </ul>
            
            <p>If you have any questions or need help, our support team is always here to assist you.</p>
            
            <p>Happy shopping!</p>
            <p><strong>The GoBazar Team</strong></p>
          </div>
          <div class="footer">
            <p>&copy; 2024 GoBazar. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Welcome to GoBazar - Your Grocery Journey Starts Here!',
      html,
      text: `Welcome to GoBazar, ${name}! We're excited to have you on board. Start shopping for fresh groceries today!`,
    });
  }

  async sendOrderConfirmation(email: string, orderDetails: any): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - GoBazar</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .order-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmed! ✅</h1>
          </div>
          <div class="content">
            <div class="order-box">
              <h2>Thank you for your order!</h2>
              <p><strong>Order ID:</strong> ${orderDetails.id}</p>
              <p><strong>Total Amount:</strong> ₹${orderDetails.total}</p>
              <p><strong>Delivery Slot:</strong> ${orderDetails.deliverySlot}</p>
            </div>
            
            <p>Your order has been confirmed and is being prepared. You'll receive updates as your order progresses.</p>
            
            <p>Thank you for choosing GoBazar!</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 GoBazar. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: `Order Confirmed - ${orderDetails.id}`,
      html,
      text: `Your GoBazar order ${orderDetails.id} has been confirmed. Total: ₹${orderDetails.total}`,
    });
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('Email service connected successfully');
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

export default new EmailService();
