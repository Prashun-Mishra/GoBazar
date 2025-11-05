/**
 * Utility functions for handling API responses consistently across the application
 */

/**
 * Normalizes API response data to handle different response formats from backend
 * @param data - Raw API response data
 * @returns Normalized array of items
 */
export function normalizeApiResponse<T>(data: any): T[] {
  // Handle different response formats:
  // 1. { products: [...] } - New backend format
  // 2. { data: [...] } - Alternative backend format
  // 3. [...] - Direct array (old format or fallback)
  const items = data?.products || data?.data || data
  
  // Ensure we always return an array
  return Array.isArray(items) ? items : []
}

/**
 * Handles API errors consistently
 * @param error - Error object
 * @param context - Context where the error occurred (for logging)
 * @returns Empty array as fallback
 */
export function handleApiError(error: any, context: string): [] {
  console.error(`API Error in ${context}:`, error)
  return []
}

/**
 * Fetches data from API with consistent error handling and response normalization
 * @param url - API endpoint URL
 * @param context - Context for error logging
 * @returns Promise resolving to normalized array
 */
export async function fetchApiData<T>(url: string, context: string): Promise<T[]> {
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    return normalizeApiResponse<T>(data)
  } catch (error) {
    return handleApiError(error, context)
  }
}

/**
 * Fetches products with consistent error handling
 * @param params - Optional query parameters
 * @returns Promise resolving to array of products
 */
export async function fetchProducts(params?: URLSearchParams): Promise<any[]> {
  const url = params ? `/api/products?${params.toString()}` : '/api/products'
  return fetchApiData(url, 'fetchProducts')
}

/**
 * Fetches categories with consistent error handling
 * @returns Promise resolving to array of categories
 */
export async function fetchCategories(): Promise<any[]> {
  return fetchApiData('/api/categories', 'fetchCategories')
}

/**
 * Fetches subcategories with consistent error handling
 * @param categoryId - Optional category ID to filter by
 * @returns Promise resolving to array of subcategories
 */
export async function fetchSubcategories(categoryId?: string): Promise<any[]> {
  const url = categoryId ? `/api/subcategories?categoryId=${categoryId}` : '/api/subcategories'
  return fetchApiData(url, 'fetchSubcategories')
}

/**
 * Fetches recommendations with consistent error handling
 * @param params - Query parameters for recommendations
 * @returns Promise resolving to array of recommended products
 */
export async function fetchRecommendations(params: URLSearchParams): Promise<any[]> {
  return fetchApiData(`/api/recommendations?${params.toString()}`, 'fetchRecommendations')
}
