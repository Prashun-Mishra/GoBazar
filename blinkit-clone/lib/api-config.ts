/**
 * Centralized API configuration for backend URL
 * Uses environment variable or defaults to localhost for development
 */

export const getBackendUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL

  if (apiUrl) {
    return apiUrl
  }

  // Fallback for development/production if env var is missing
  if (typeof window === 'undefined') {
    if (process.env.NODE_ENV === 'production') {
      return 'https://gobazar-backend.onrender.com'
    }
    return 'http://localhost:3001'
  }

  return 'http://localhost:3001'
}

export const BACKEND_URL = getBackendUrl()

console.log('🔗 Backend URL configured as:', BACKEND_URL)
