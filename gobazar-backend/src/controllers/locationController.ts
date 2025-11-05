import { Request, Response } from 'express';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Address {
  road?: string;
  suburb?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  [key: string]: any;
}

interface LocationData {
  id?: string;
  displayName: string;
  address: Address;
  coordinates: Coordinates;
}

class LocationController {
  /**
   * Search for locations by query
   * @route GET /api/location/search
   * @access Public
   */
  async searchLocations(req: Request, res: Response): Promise<Response> {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required',
        });
      }

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q as string)}&addressdetails=1&limit=5`,
        {
          headers: {
            'User-Agent': 'GoBazar-App/1.0'
          }
        }
      );

      const locations = response.data.map((item: any) => ({
        id: item.place_id?.toString(),
        displayName: item.display_name,
        address: {
          road: item.address?.road || '',
          suburb: item.address?.suburb || '',
          city: item.address?.city || item.address?.town || item.address?.village || '',
          state: item.address?.state || '',
          postcode: item.address?.postcode || '',
          country: item.address?.country || '',
        },
        coordinates: {
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
        },
      }));

      return res.json({
        success: true,
        data: locations,
      });
    } catch (error) {
      console.error('Location search error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to search locations',
      });
    }
  }

  /**
   * Get current location details from coordinates
   * @route GET /api/location/current
   * @access Public
   */
  async getCurrentLocation(req: Request, res: Response): Promise<Response> {
    try {
      const { latitude, longitude } = req.query;

      if (!latitude || !longitude) {
        return res.status(400).json({
          success: false,
          error: 'Latitude and longitude are required',
        });
      }

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'GoBazar-App/1.0'
          }
        }
      );

      const { address, place_id } = response.data;
      
      const locationData: LocationData = {
        id: place_id?.toString(),
        displayName: response.data.display_name,
        address: {
          road: address?.road || '',
          suburb: address?.suburb || '',
          city: address?.city || address?.town || address?.village || '',
          state: address?.state || '',
          postcode: address?.postcode || '',
          country: address?.country || '',
        },
        coordinates: {
          latitude: parseFloat(latitude as string),
          longitude: parseFloat(longitude as string),
        },
      };

      return res.json({
        success: true,
        data: locationData,
      });
    } catch (error) {
      console.error('Get current location error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to get current location',
      });
    }
  }

  /**
   * Get popular locations from database
   * @route GET /api/location/popular
   * @access Public
   */
  async getPopularLocations(_req: Request, res: Response): Promise<Response> {
    try {
      const popularLocations = await prisma.popularLocation.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      });

      return res.json({
        success: true,
        data: popularLocations,
      });
    } catch (error) {
      console.error('Get popular locations error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to get popular locations',
      });
    }
  }

  /**
   * Save user's selected location
   * @route POST /api/location/save
   * @access Private
   */
  async saveUserLocation(req: Request, res: Response): Promise<Response> {
    try {
      const userId = (req as any).user?.id;
      const { location } = req.body as { location: LocationData };

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated',
        });
      }

      if (!location || !location.coordinates || !location.displayName) {
        return res.status(400).json({
          success: false,
          error: 'Invalid location data',
        });
      }

      const userLocation = await prisma.userLocation.upsert({
        where: { userId },
        update: {
          displayName: location.displayName,
          address: location.address as any,
          latitude: location.coordinates.latitude,
          longitude: location.coordinates.longitude,
        },
        create: {
          userId,
          displayName: location.displayName,
          address: location.address as any,
          latitude: location.coordinates.latitude,
          longitude: location.coordinates.longitude,
        },
      });

      return res.json({
        success: true,
        data: userLocation,
      });
    } catch (error) {
      console.error('Save location error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to save location',
      });
    }
  }

  /**
   * Get user's saved location
   * @route GET /api/location/user
   * @access Private
   */
  async getUserLocation(req: Request, res: Response): Promise<Response> {
    try {
      const userId = (req as any).user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated',
        });
      }

      const userLocation = await prisma.userLocation.findUnique({
        where: { userId },
      });

      if (!userLocation) {
        return res.status(404).json({
          success: false,
          error: 'No saved location found',
        });
      }

      return res.json({
        success: true,
        data: userLocation,
      });
    } catch (error) {
      console.error('Get user location error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to get user location',
      });
    }
  }

  /**
   * Add a popular location (Admin only)
   * @route POST /api/location/popular
   * @access Admin
   */
  async addPopularLocation(req: Request, res: Response): Promise<Response> {
    try {
      const { name, address, city, state, latitude, longitude, order } = req.body;

      if (!name || !address || !city || !state || !latitude || !longitude) {
        return res.status(400).json({
          success: false,
          error: 'All fields are required',
        });
      }

      const popularLocation = await prisma.popularLocation.create({
        data: {
          name,
          address,
          city,
          state,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          order: order || 0,
        },
      });

      return res.json({
        success: true,
        data: popularLocation,
      });
    } catch (error) {
      console.error('Add popular location error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to add popular location',
      });
    }
  }
}

export default new LocationController();
