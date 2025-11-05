/**
 * Utility functions for text formatting and processing
 */

/**
 * Formats product description with proper line breaks and paragraph structure
 * @param text - Raw text input
 * @returns Formatted text with proper paragraphs
 */
export function formatProductDescription(text: string): string[] {
  if (!text) return []
  
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0) // Remove empty lines
}

/**
 * Truncates text to a specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Extracts the first paragraph from a multi-line text
 * @param text - Multi-line text
 * @returns First paragraph only
 */
export function getFirstParagraph(text: string): string {
  if (!text) return ''
  return text.split('\n')[0].trim()
}

/**
 * Formats text for display with proper line breaks and basic formatting
 * @param text - Raw text input
 * @returns Array of formatted paragraphs as strings
 */
export function formatTextWithLineBreaks(text: string): string[] {
  if (!text) return []
  
  return formatProductDescription(text)
}

/**
 * Cleans and formats product description for admin preview
 * @param text - Raw description text
 * @returns Cleaned and formatted text
 */
export function cleanProductDescription(text: string): string {
  if (!text) return ''
  
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n\n') // Add double line breaks between paragraphs
}

/**
 * Validates if text has proper formatting
 * @param text - Text to validate
 * @returns Validation result with suggestions
 */
export function validateTextFormatting(text: string): {
  isValid: boolean
  suggestions: string[]
} {
  const suggestions: string[] = []
  
  if (!text || text.trim().length === 0) {
    return { isValid: false, suggestions: ['Description is required'] }
  }
  
  if (text.length < 20) {
    suggestions.push('Description should be at least 20 characters long')
  }
  
  if (text.length > 2000) {
    suggestions.push('Description should be less than 2000 characters')
  }
  
  // Check for proper sentence structure
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  if (sentences.length === 0) {
    suggestions.push('Add proper sentences with punctuation')
  }
  
  // Check for excessive line breaks
  const lineBreaks = (text.match(/\n/g) || []).length
  if (lineBreaks > 10) {
    suggestions.push('Too many line breaks - consider combining related content')
  }
  
  return {
    isValid: suggestions.length === 0,
    suggestions
  }
}
