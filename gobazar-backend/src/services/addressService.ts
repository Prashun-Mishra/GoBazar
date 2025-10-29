import prisma from '@/config/database';
import { Address, CreateAddressRequest } from '@/types';

class AddressService {
  async getAddresses(userId: string): Promise<Address[]> {
    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return addresses;
  }

  async getAddressById(addressId: string, userId: string): Promise<Address | null> {
    const address = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
      },
    });

    return address;
  }

  async createAddress(userId: string, addressData: CreateAddressRequest): Promise<{
    success: boolean;
    message: string;
    address?: Address;
  }> {
    try {
      // If this is set as default, unset other default addresses
      if (addressData.isDefault) {
        await prisma.address.updateMany({
          where: { userId },
          data: { isDefault: false },
        });
      }

      // If this is the first address, make it default
      const existingAddressCount = await prisma.address.count({
        where: { userId },
      });

      const isDefault = addressData.isDefault || existingAddressCount === 0;

      // Convert type to uppercase for Prisma enum
      const addressType = addressData.type.toUpperCase() as 'HOME' | 'WORK' | 'OTHER';
      
      console.log('🏠 [Address Service] Creating address with type:', addressType);

      const address = await prisma.address.create({
        data: {
          userId,
          type: addressType,
          street: addressData.street,
          city: addressData.city,
          state: addressData.state,
          pincode: addressData.pincode,
          landmark: addressData.landmark || '',
          isDefault,
        },
      });

      return {
        success: true,
        message: 'Address added successfully',
        address,
      };
    } catch (error) {
      console.error('Error creating address:', error);
      return {
        success: false,
        message: 'Failed to add address',
      };
    }
  }

  async updateAddress(addressId: string, userId: string, updateData: Partial<CreateAddressRequest>): Promise<{
    success: boolean;
    message: string;
    address?: Address;
  }> {
    try {
      // Check if address exists and belongs to user
      const existingAddress = await prisma.address.findFirst({
        where: {
          id: addressId,
          userId,
        },
      });

      if (!existingAddress) {
        return {
          success: false,
          message: 'Address not found',
        };
      }

      // If setting as default, unset other default addresses
      if (updateData.isDefault) {
        await prisma.address.updateMany({
          where: {
            userId,
            NOT: { id: addressId },
          },
          data: { isDefault: false },
        });
      }

      const address = await prisma.address.update({
        where: { id: addressId },
        data: updateData,
      });

      return {
        success: true,
        message: 'Address updated successfully',
        address,
      };
    } catch (error) {
      console.error('Error updating address:', error);
      return {
        success: false,
        message: 'Failed to update address',
      };
    }
  }

  async deleteAddress(addressId: string, userId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const address = await prisma.address.findFirst({
        where: {
          id: addressId,
          userId,
        },
      });

      if (!address) {
        return {
          success: false,
          message: 'Address not found',
        };
      }

      await prisma.address.delete({
        where: { id: addressId },
      });

      // If deleted address was default, make another address default
      if (address.isDefault) {
        const remainingAddresses = await prisma.address.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 1,
        });

        if (remainingAddresses.length > 0) {
          await prisma.address.update({
            where: { id: remainingAddresses[0].id },
            data: { isDefault: true },
          });
        }
      }

      return {
        success: true,
        message: 'Address deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting address:', error);
      return {
        success: false,
        message: 'Failed to delete address',
      };
    }
  }

  async setDefaultAddress(addressId: string, userId: string): Promise<{
    success: boolean;
    message: string;
    address?: Address;
  }> {
    try {
      const address = await prisma.address.findFirst({
        where: {
          id: addressId,
          userId,
        },
      });

      if (!address) {
        return {
          success: false,
          message: 'Address not found',
        };
      }

      // Unset all other default addresses
      await prisma.address.updateMany({
        where: {
          userId,
          NOT: { id: addressId },
        },
        data: { isDefault: false },
      });

      // Set this address as default
      const updatedAddress = await prisma.address.update({
        where: { id: addressId },
        data: { isDefault: true },
      });

      return {
        success: true,
        message: 'Default address updated successfully',
        address: updatedAddress,
      };
    } catch (error) {
      console.error('Error setting default address:', error);
      return {
        success: false,
        message: 'Failed to set default address',
      };
    }
  }

  async getDefaultAddress(userId: string): Promise<Address | null> {
    const address = await prisma.address.findFirst({
      where: {
        userId,
        isDefault: true,
      },
    });

    return address;
  }

  async validatePincode(pincode: string): Promise<{
    valid: boolean;
    serviceable: boolean;
    message: string;
  }> {
    // Basic pincode validation
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    
    if (!pincodeRegex.test(pincode)) {
      return {
        valid: false,
        serviceable: false,
        message: 'Invalid pincode format',
      };
    }

    // In a real application, you would check against a database of serviceable pincodes
    // For now, we'll assume all valid pincodes are serviceable
    const serviceablePincodes = [
      '110001', '110002', '110003', '110004', '110005', // Delhi
      '400001', '400002', '400003', '400004', '400005', // Mumbai
      '560001', '560002', '560003', '560004', '560005', // Bangalore
      '600001', '600002', '600003', '600004', '600005', // Chennai
      '700001', '700002', '700003', '700004', '700005', // Kolkata
      '500001', '500002', '500003', '500004', '500005', // Hyderabad
    ];

    const isServiceable = serviceablePincodes.includes(pincode) || pincode.startsWith('11') || pincode.startsWith('40');

    return {
      valid: true,
      serviceable: isServiceable,
      message: isServiceable 
        ? 'Delivery available in this area' 
        : 'Sorry, we do not deliver to this pincode yet',
    };
  }
}

export default new AddressService();
