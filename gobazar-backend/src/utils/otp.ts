import crypto from 'crypto';
import config from '@/config';

export class OTPUtil {
  static generateOTP(): string {
    const { length } = config.otp;
    const digits = '0123456789';
    let otp = '';
    
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    
    return otp;
  }

  static generateExpiryTime(): Date {
    const { expiryMinutes } = config.otp;
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + expiryMinutes);
    return expiryTime;
  }

  static isExpired(expiryTime: Date): boolean {
    return new Date() > expiryTime;
  }

  static generateSecureOTP(): string {
    const { length } = config.otp;
    const buffer = crypto.randomBytes(Math.ceil(length / 2));
    return buffer.toString('hex').slice(0, length).toUpperCase();
  }

  static hashOTP(otp: string): string {
    return crypto.createHash('sha256').update(otp).digest('hex');
  }

  static verifyOTP(inputOTP: string, hashedOTP: string): boolean {
    const inputHash = this.hashOTP(inputOTP);
    return inputHash === hashedOTP;
  }
}
