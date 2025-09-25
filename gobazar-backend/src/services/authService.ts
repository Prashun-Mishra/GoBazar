import prisma from '@/config/database';
import { OTPUtil } from '@/utils/otp';
import { JWTUtil } from '@/utils/jwt';
import emailService from './emailService';
import { RegisterRequest, JWTPayload } from '@/types';

class AuthService {
  async sendOTP(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Generate OTP
      const otpCode = OTPUtil.generateOTP();
      const expiresAt = OTPUtil.generateExpiryTime();

      // Delete any existing OTPs for this email
      await prisma.oTP.deleteMany({
        where: { email, isUsed: false },
      });

      // Create new OTP record
      await prisma.oTP.create({
        data: {
          email,
          code: otpCode,
          expiresAt,
        },
      });

      // Send OTP via email
      const emailSent = await emailService.sendOTP(email, otpCode);

      if (!emailSent) {
        throw new Error('Failed to send OTP email');
      }

      return {
        success: true,
        message: 'OTP sent successfully to your email',
      };
    } catch (error) {
      console.error('Error sending OTP:', error);
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.',
      };
    }
  }

  async verifyOTP(email: string, code: string): Promise<{ success: boolean; token?: string; user?: any; message: string }> {
    try {
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
        return {
          success: false,
          message: 'Invalid OTP code',
        };
      }

      // Check if OTP is expired
      if (OTPUtil.isExpired(otpRecord.expiresAt)) {
        return {
          success: false,
          message: 'OTP has expired. Please request a new one.',
        };
      }

      // Mark OTP as used
      await prisma.oTP.update({
        where: { id: otpRecord.id },
        data: { isUsed: true },
      });

      // Check if user exists
      let user = await prisma.user.findUnique({
        where: { email },
        include: { addresses: true },
      });

      if (!user) {
        return {
          success: false,
          message: 'User not found. Please register first.',
        };
      }

      // Generate JWT token
      const tokenPayload: JWTPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const token = JWTUtil.generateToken(tokenPayload);

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
      console.error('Error verifying OTP:', error);
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
