import prisma from '@/config/database';
import { OTPUtil } from '@/utils/otp';
import { JWTUtil } from '@/utils/jwt';
import emailService from './emailService';
import { RegisterRequest, JWTPayload } from '@/types';

class AuthService {
  async sendOTP(email: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log(`📧 [Auth Service] Sending OTP to: ${email}`);
      
      // Generate OTP
      const otpCode = OTPUtil.generateOTP();
      const expiresAt = OTPUtil.generateExpiryTime();
      
      console.log(`🔢 [Auth Service] Generated OTP: ${otpCode}, expires at: ${expiresAt}`);

      // Delete any existing OTPs for this email
      try {
        await prisma.oTP.deleteMany({
          where: { email, isUsed: false },
        });
        console.log(`🗑️ [Auth Service] Deleted old OTPs for email: ${email}`);
      } catch (deleteError) {
        console.warn(`⚠️ [Auth Service] Warning deleting old OTPs:`, deleteError);
        // Continue anyway, as this is not critical
      }

      // Create new OTP record
      const createdOTP = await prisma.oTP.create({
        data: {
          email,
          code: otpCode,
          expiresAt,
        },
      });
      
      console.log(`💾 [Auth Service] OTP saved to database with ID: ${createdOTP.id}`);

      // Send OTP via email (non-blocking - don't wait for response)
      console.log(`📨 [Auth Service] Attempting to send email...`);
      emailService.sendOTP(email, otpCode).catch((err) => {
        console.error(`⚠️ [Auth Service] Email sending failed (non-blocking):`, err);
      });
      
      console.log(`✅ [Auth Service] OTP generated and saved (email sending in background)`);

      return {
        success: true,
        message: 'OTP sent successfully to your email',
      };
    } catch (error) {
      console.error('❌ [Auth Service] Error sending OTP:', error);
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.',
      };
    }
  }

  async verifyOTP(email: string, code: string): Promise<{ success: boolean; token?: string; user?: any; message: string }> {
    try {
      console.log(`🔐 [Auth Service] Verifying OTP for email: ${email}, code: ${code}`);
      
      // First, check all OTPs for this email to debug
      const allOTPs = await prisma.oTP.findMany({
        where: { email },
        orderBy: { createdAt: 'desc' },
      });
      console.log(`📋 [Auth Service] Found ${allOTPs.length} OTP records for email: ${email}`);
      allOTPs.forEach((otp, index) => {
        console.log(`  OTP ${index + 1}: code=${otp.code}, isUsed=${otp.isUsed}, expiresAt=${otp.expiresAt}`);
      });
      
      // Find the OTP record
      const otpRecord = await prisma.oTP.findFirst({
        where: {
          email,
          code,
          isUsed: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!otpRecord) {
        console.log(`❌ [Auth Service] No valid OTP found for email: ${email}, code: ${code}`);
        return {
          success: false,
          message: 'Invalid OTP code',
        };
      }
      
      console.log(`✅ [Auth Service] OTP record found, checking expiry...`);

      // Check if OTP is expired
      if (OTPUtil.isExpired(otpRecord.expiresAt)) {
        console.log(`❌ [Auth Service] OTP expired for email: ${email}`);
        return {
          success: false,
          message: 'OTP has expired. Please request a new one.',
        };
      }

      console.log(`✅ [Auth Service] OTP is valid, marking as used...`);
      
      // Mark OTP as used
      await prisma.oTP.update({
        where: { id: otpRecord.id },
        data: { isUsed: true },
      });

      // Check if user exists
      console.log(`🔍 [Auth Service] Checking if user exists: ${email}`);
      let user = await prisma.user.findUnique({
        where: { email },
        include: { addresses: true },
      });

      if (!user) {
        console.log(`👤 [Auth Service] User not found, creating new user...`);
        // Auto-create user with email
        // Generate a unique temporary phone number to avoid constraint violation
        const tempPhone = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        user = await prisma.user.create({
          data: {
            email: email,
            name: email.split('@')[0], // Use email prefix as default name
            phone: tempPhone, // Temporary unique phone, user can update later
            role: 'USER',
          },
          include: { addresses: true },
        });
        
        console.log(`✅ [Auth Service] New user created: ${user.id}`);
        
        // Send welcome email
        await emailService.sendWelcomeEmail(user.email, user.name);
      } else {
        console.log(`✅ [Auth Service] Existing user found: ${user.id}, role: ${user.role}`);
      }

      // Generate JWT token
      const tokenPayload: JWTPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const token = JWTUtil.generateToken(tokenPayload);
      
      console.log(`🎉 [Auth Service] Login successful for: ${email}, role: ${user.role}`);
      console.log(`📋 [Auth Service] Returning user object with role: ${user.role}`);

      return {
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          addresses: user.addresses,
        },
        message: 'Login successful',
      };
    } catch (error) {
      console.error('❌ [Auth Service] Error verifying OTP:', error);
      return {
        success: false,
        message: 'Failed to verify OTP. Please try again.',
      };
    }
  }

  async register(userData: RegisterRequest): Promise<{ success: boolean; message: string; user?: any }> {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { phone: userData.phone },
          ],
        },
      });

      if (existingUser) {
        return {
          success: false,
          message: existingUser.email === userData.email 
            ? 'Email already registered' 
            : 'Phone number already registered',
        };
      }

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: 'USER',
        },
        include: { addresses: true },
      });

      // Send welcome email
      await emailService.sendWelcomeEmail(newUser.email, newUser.name);

      return {
        success: true,
        message: 'Registration successful',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          addresses: newUser.addresses,
        },
      };
    } catch (error) {
      console.error('Error registering user:', error);
      return {
        success: false,
        message: 'Registration failed. Please try again.',
      };
    }
  }

  async getUserProfile(userId: string): Promise<{ success: boolean; user?: any; message: string }> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { addresses: true },
      });

      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          addresses: user.addresses,
          createdAt: user.createdAt,
        },
        message: 'Profile retrieved successfully',
      };
    } catch (error) {
      console.error('Error getting user profile:', error);
      return {
        success: false,
        message: 'Failed to retrieve profile',
      };
    }
  }

  async updateProfile(userId: string, updateData: { name?: string; phone?: string }): Promise<{ success: boolean; user?: any; message: string }> {
    try {
      // Check if phone number is already taken by another user
      if (updateData.phone) {
        const existingUser = await prisma.user.findFirst({
          where: {
            phone: updateData.phone,
            NOT: { id: userId },
          },
        });

        if (existingUser) {
          return {
            success: false,
            message: 'Phone number already registered',
          };
        }
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        include: { addresses: true },
      });

      return {
        success: true,
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          role: updatedUser.role,
          addresses: updatedUser.addresses,
        },
        message: 'Profile updated successfully',
      };
    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        message: 'Failed to update profile',
      };
    }
  }
}

export default new AuthService();
