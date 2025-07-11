/**
 * Detect if the input is valid JSON or regular text
 * @param {string} text - The text to analyze
 * @returns {Object} Object containing detection result and confidence
 */
export const detectFileType = (text) => {
  if (!text || text.trim() === '') {
    return { mode: 'text', confidence: 0 }
  }

  const trimmedText = text.trim()
  
  // Check if it starts and ends with JSON brackets/braces
  const startsWithJson = /^[{\[]/.test(trimmedText)
  const endsWithJson = /[}\]]$/.test(trimmedText)
  
  // Check for JSON-like structure
  const hasJsonStructure = startsWithJson && endsWithJson
  
  if (hasJsonStructure) {
    try {
      // Try to parse as JSON
      JSON.parse(trimmedText)
      return { mode: 'json', confidence: 0.9 }
    } catch (error) {
      // If JSON parsing fails, check if it looks like malformed JSON
      const hasJsonPatterns = /[{}\[\]]/.test(trimmedText) && 
                             /["']/.test(trimmedText) && 
                             /:/.test(trimmedText)
      
      if (hasJsonPatterns) {
        return { mode: 'json', confidence: 0.7, error: error.message }
      }
    }
  }
  
  // If it doesn't look like JSON, it's probably text
  if (!hasJsonStructure) {
    return { mode: 'text', confidence: 0.9 }
  }
  
  // Check for common text patterns that indicate it's not JSON
  const hasTextPatterns = /\n/.test(trimmedText) && 
                         !trimmedText.includes('"') &&
                         !trimmedText.includes('{') &&
                         !trimmedText.includes('}')
  
  if (hasTextPatterns) {
    return { mode: 'text', confidence: 0.9 }
  }
  
  // Default to text if uncertain
  return { mode: 'text', confidence: 0.8 }
}

/**
 * Detect file type for both inputs and determine the best diff mode
 * @param {string} leftText - Left input text
 * @param {string} rightText - Right input text
 * @returns {Object} Detection result for both inputs
 */
export const detectDiffMode = (leftText, rightText) => {
  const leftDetection = detectFileType(leftText)
  const rightDetection = detectFileType(rightText)
  
  // If both are detected as JSON with high confidence, use JSON diff
  if (leftDetection.mode === 'json' && rightDetection.mode === 'json' && 
      leftDetection.confidence > 0.7 && rightDetection.confidence > 0.7) {
    return {
      mode: 'json',
      confidence: Math.min(leftDetection.confidence, rightDetection.confidence),
      leftError: leftDetection.error,
      rightError: rightDetection.error
    }
  }
  
  // If both are detected as text with high confidence, use text diff
  if (leftDetection.mode === 'text' && rightDetection.mode === 'text' && 
      leftDetection.confidence > 0.7 && rightDetection.confidence > 0.7) {
    return {
      mode: 'text',
      confidence: Math.min(leftDetection.confidence, rightDetection.confidence)
    }
  }
  
  // If one is JSON and the other is text, prefer text diff for safety
  if (leftDetection.mode !== rightDetection.mode) {
    return {
      mode: 'text',
      confidence: 0.6,
      warning: 'Mixed content detected - using text diff mode'
    }
  }
  
  // Default to text diff
  return {
    mode: 'text',
    confidence: 0.5,
    warning: 'Unable to determine content type - using text diff mode'
  }
} 