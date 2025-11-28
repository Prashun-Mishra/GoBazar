import nodemailer from 'nodemailer';
import config from '@/config';
import { EmailOptions } from '@/types';

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    // IMPORTANT: Render (and many cloud platforms) block standard SMTP ports (25, 465, 587)
    // SendGrid SMTP on port 2525 bypasses these restrictions

    if (config.email.user && config.email.pass) {
      const isSendGrid = config.email.host.includes('sendgrid');
      const isGmail = config.email.host.includes('gmail');

      const transportConfig: any = {
        auth: {
          user: config.email.user,
          pass: config.email.pass,
        },
        // Connection timeout settings
        connectionTimeout: 30000, // 30 seconds
        greetingTimeout: 30000,
        socketTimeout: 30000,
        // Force IPv4 to avoid IPv6 connectivity issues
        family: 4,
      };

      if (isSendGrid) {
        console.log('📧 Using SendGrid SMTP (Port 2525) - optimized for cloud platforms like Render');
        transportConfig.host = 'smtp.sendgrid.net';
        transportConfig.port = 2525; // Alternative port that bypasses firewall restrictions
        transportConfig.secure = false; // Use STARTTLS
        transportConfig.requireTLS = true;
      } else if (isGmail) {
        console.log('📧 Detected Gmail configuration (Port 587) - may not work on Render due to firewall');
        transportConfig.host = 'smtp.gmail.com';
        transportConfig.port = 587;
        transportConfig.secure = false; // Use STARTTLS
        transportConfig.requireTLS = true;
      } else {
        transportConfig.host = config.email.host;
        transportConfig.port = config.email.port;
        transportConfig.secure = config.email.port === 465;
      }

      this.transporter = nodemailer.createTransport(transportConfig);
    } else {
      console.warn('⚠️ SMTP credentials missing. Email service will be disabled.');
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.transporter) {
      console.warn('Email service not configured (missing credentials). Skipping email:', options.subject);
      return true; // Return true to allow flow to continue
    }

    try {
      const info = await this.transporter.sendMail({
        from: `"GoBazar" <${config.email.user}>`,
        to: options.to,
        subject: options.subject,
        html: options.html || '',
        text: options.text,
      });

      console.log('Email sent:', info.messageId);
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

  async sendOrderStatusUpdate(email: string, orderDetails: { id: string; status: string; customerName?: string; estimatedDelivery?: string }): Promise<boolean> {
    const statusMessages: Record<string, string> = {
      RECEIVED: 'Your order has been received and is being processed.',
      PACKING: 'Your order is being packed and will be out for delivery soon.',
      ON_THE_WAY: 'Your order is on the way! Our delivery partner is heading to your location.',
      DELIVERED: 'Your order has been successfully delivered. Thank you for shopping with GoBazar!',
      CANCELED: 'Your order has been canceled. If you have any questions, please contact our support team.'
    };

    const statusColors: Record<string, string> = {
      RECEIVED: '#3B82F6',
      PACKING: '#F59E0B',
      ON_THE_WAY: '#8B5CF6',
      DELIVERED: '#10B981',
      CANCELED: '#EF4444'
    };

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GoBazar - Order Status Update</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .status-badge { 
            display: inline-block; 
            padding: 8px 16px; 
            border-radius: 20px; 
            color: white; 
            font-weight: bold;
            background-color: ${statusColors[orderDetails.status] || '#6B7280'};
          }
          .order-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Status Update</h1>
          </div>
          <div class="content">
            <h2>Hello ${orderDetails.customerName || 'Valued Customer'},</h2>
            
            <p>Your order status has been updated:</p>
            
            <div class="order-info">
              <h3>Order #${orderDetails.id}</h3>
              <p><strong>Status:</strong> <span class="status-badge">${orderDetails.status}</span></p>
              <p><strong>Update:</strong> ${statusMessages[orderDetails.status] || 'Your order status has been updated.'}</p>
              ${orderDetails.estimatedDelivery ? `<p><strong>Estimated Delivery:</strong> ${orderDetails.estimatedDelivery}</p>` : ''}
            </div>

            <p>You can track your order anytime by visiting our website or clicking the link below:</p>
            <p style="text-align: center;">
              <a href="${config.frontendUrl}/orders/${orderDetails.id}" 
                 style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Track Your Order
              </a>
            </p>

            <p>Thank you for choosing GoBazar!</p>
          </div>
          <div class="footer">
            <p>GoBazar - Fresh Groceries Delivered Fast</p>
            <p>If you have any questions, contact us at support@gobazar.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: `Order Status Update - ${orderDetails.status}`,
      html,
      text: `Your GoBazar order ${orderDetails.id} status has been updated to: ${orderDetails.status}. ${statusMessages[orderDetails.status]}`,
    });
  }

  async sendAdminOrderNotification(order: any): Promise<boolean> {
    if (!config.email.adminEmail) {
      console.warn('⚠️ Admin email not configured. Skipping admin notification.');
      return false;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Order Received</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .order-details { background: white; padding: 15px; border-radius: 5px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Order Received! 🚀</h1>
          </div>
          <div class="content">
            <p>A new order has been placed on GoBazar.</p>
            
            <div class="order-details">
              <p><strong>Order ID:</strong> ${order.id}</p>
              <p><strong>Customer:</strong> ${order.user?.name} (${order.user?.email})</p>
              <p><strong>Amount:</strong> ₹${order.total}</p>
              <p><strong>Items:</strong> ${order.items?.length || 0}</p>
              <p><strong>Status:</strong> ${order.status}</p>
            </div>
            
            <p><a href="${config.frontendUrl}/admin/orders/${order.id}">View Order in Admin Panel</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: config.email.adminEmail,
      subject: `New Order Alert - ${order.id} - ₹${order.total}`,
      html,
    });
  }

  async sendInvoice(email: string, order: any): Promise<boolean> {
    const companyName = "Kaonain Pursuit Overseas Exporter pvt limited";
    const invoiceDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    const itemsHtml = order.items.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} ${item.variant ? `(${item.variant.size || item.variant.weight})` : ''}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price * item.quantity}</td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice - ${order.id}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 800px; margin  0 auto; padding: 40px; background: white; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
          .company-info h1 { margin: 0; font-size: 24px; color: #2c3e50; }
          .invoice-title { text-align: right; }
          .invoice-title h2 { margin: 0; color: #7f8c8d; font-weight: 300; }
          .details-grid { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .bill-to, .ship-to { width: 45%; }
          .invoice-meta { text-align: right; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background: #f8f9fa; padding: 12px; text-align: left; font-weight: 600; color: #2c3e50; }
          .totals { width: 300px; margin-left: auto; }
          .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
          .grand-total { font-size: 18px; font-weight: bold; border-top: 2px solid #333; margin-top: 10px; padding-top: 10px; }
          .footer { margin-top: 50px; text-align: center; color: #7f8c8d; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="company-info">
              <h1>${companyName}</h1>
              <p>123 Export Lane, Business District<br>New Delhi, India 110001<br>GSTIN: 07AABCT1234A1Z5</p>
            </div>
            <div class="invoice-title">
              <h2>INVOICE</h2>
              <p>#${order.id}</p>
            </div>
          </div>

          <div class="details-grid">
            <div class="bill-to">
              <h3>Bill To:</h3>
              <p><strong>${order.user?.name}</strong><br>
              ${order.address?.street}<br>
              ${order.address?.city}, ${order.address?.state} - ${order.address?.pincode}<br>
              Phone: ${order.user?.phone}</p>
            </div>
            <div class="invoice-meta">
              <p><strong>Date:</strong> ${invoiceDate}</p>
              <p><strong>Payment Method:</strong> ${order.paymentMethod || 'Online'}</p>
              <p><strong>Order Status:</strong> ${order.status}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="totals">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>₹${order.subtotal}</span>
            </div>
            <div class="total-row">
              <span>Discount:</span>
              <span>-₹${order.discount}</span>
            </div>
            <div class="total-row">
              <span>Delivery Fee:</span>
              <span>₹${order.deliveryFee}</span>
            </div>
            <div class="total-row">
              <span>Tax (5%):</span>
              <span>₹${order.taxes}</span>
            </div>
            <div class="total-row grand-total">
              <span>Total:</span>
              <span>₹${order.total}</span>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for your business!</p>
            <p>For any queries, please contact support@gobazar.com</p>
            <p>&copy; ${new Date().getFullYear()} ${companyName}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: `Invoice #${order.id} - ${companyName}`,
      html,
    });
  }

  async testConnection(): Promise<boolean> {
    if (!this.transporter) {
      console.error('Email service not configured (missing credentials).');
      return false;
    }
    try {
      await this.transporter.verify();
      console.log('Email service (Nodemailer) is configured and ready');
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

export default new EmailService();
