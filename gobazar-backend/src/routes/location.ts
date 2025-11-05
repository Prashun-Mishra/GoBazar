import { Router } from 'express';
import locationController from '@/controllers/locationController';
import { authenticateToken } from '@/middleware/auth';

const router = Router();

/**
 * @route   GET /api/location/search
 * @desc    Search for locations by query
 * @access  Public
 */
router.get('/search', locationController.searchLocations);

/**
 * @route   GET /api/location/current
 * @desc    Get current location details from coordinates
 * @access  Public
 */
router.get('/current', locationController.getCurrentLocation);

/**
 * @route   GET /api/location/popular
 * @desc    Get list of popular locations
 * @access  Public
 */
router.get('/popular', locationController.getPopularLocations);

/**
 * @route   POST /api/location/popular
 * @desc    Add a popular location (Admin only)
 * @access  Admin
 */
router.post('/popular', authenticateToken, locationController.addPopularLocation);

/**
 * @route   POST /api/location/save
 * @desc    Save user's selected location
 * @access  Private
 */
router.post('/save', authenticateToken, locationController.saveUserLocation);

/**
 * @route   GET /api/location/user
 * @desc    Get user's saved location
 * @access  Private
 */
router.get('/user', authenticateToken, locationController.getUserLocation);

export default router;
