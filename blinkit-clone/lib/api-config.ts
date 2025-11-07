/**
 * Centralized API configuration for backend URL
 * Uses environment variable or defaults to localhost for development
 */

export const getBackendUrl = (): string => {
  // In production, use NEXT_PUBLIC_API_URL from environment
  if (typeof window === 'undefined') {
    // Server-side: use BACKEND_URL or NEXT_PUBLIC_API_URL
    return process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
  }
  
  // Client-side: use NEXT_PUBLIC_API_URL
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
}

export const BACKEND_URL = getBackendUrl()
