/**
 * Centralized API configuration for backend URL
 * Uses environment variable or defaults to localhost for development
 */

export const getBackendUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL
  
  if (apiUrl) {
    return apiUrl
  }
  
  // Fallback for development
  if (typeof window === 'undefined') {
    return 'http://localhost:5000'
  }
  
  return 'http://localhost:5000'
}

export const BACKEND_URL = getBackendUrl()

console.log('🔗 Backend URL configured as:', BACKEND_URL)
