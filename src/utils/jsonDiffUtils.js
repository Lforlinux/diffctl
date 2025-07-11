/**
 * Generate a diff between two JSON objects
 * @param {string} oldJson - The original JSON string
 * @param {string} newJson - The modified JSON string
 * @returns {Object} Object containing the diff result and formatted output
 */
export const generateJsonDiff = (oldJson, newJson) => {
  try {
    // Parse JSON strings
    const oldObj = oldJson ? JSON.parse(oldJson) : {}
    const newObj = newJson ? JSON.parse(newJson) : {}
    
    // Generate diff using a recursive comparison
    const diff = compareObjects(oldObj, newObj)
    
    return {
      success: true,
      diff: diff,
      oldFormatted: JSON.stringify(oldObj, null, 2),
      newFormatted: JSON.stringify(newObj, null, 2)
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      diff: []
    }
  }
}

/**
 * Recursively compare two objects and generate diff
 * @param {Object} oldObj - Original object
 * @param {Object} newObj - New object
 * @param {string} path - Current path in the object
 * @returns {Array} Array of diff changes
 */
const compareObjects = (oldObj, newObj, path = '') => {
  const changes = []
  
  // Get all keys from both objects
  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)])
  
  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key
    const oldValue = oldObj[key]
    const newValue = newObj[key]
    
    // Key doesn't exist in old object (added)
    if (!(key in oldObj)) {
      changes.push({
        type: 'added',
        path: currentPath,
        oldValue: undefined,
        newValue: newValue,
        formatted: formatValue(newValue)
      })
    }
    // Key doesn't exist in new object (removed)
    else if (!(key in newObj)) {
      changes.push({
        type: 'removed',
        path: currentPath,
        oldValue: oldValue,
        newValue: undefined,
        formatted: formatValue(oldValue)
      })
    }
    // Values are different
    else if (!isEqual(oldValue, newValue)) {
      // If both are objects, recurse
      if (isObject(oldValue) && isObject(newValue)) {
        changes.push(...compareObjects(oldValue, newValue, currentPath))
      } else {
        changes.push({
          type: 'modified',
          path: currentPath,
          oldValue: oldValue,
          newValue: newValue,
          formatted: {
            old: formatValue(oldValue),
            new: formatValue(newValue)
          }
        })
      }
    }
  }
  
  return changes
}

/**
 * Check if two values are equal
 * @param {*} a - First value
 * @param {*} b - Second value
 * @returns {boolean} True if equal
 */
const isEqual = (a, b) => {
  if (a === b) return true
  if (a == null || b == null) return a === b
  if (typeof a !== typeof b) return false
  if (typeof a === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return false
}

/**
 * Check if value is an object
 * @param {*} value - Value to check
 * @returns {boolean} True if object
 */
const isObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * Format a value for display
 * @param {*} value - Value to format
 * @returns {string} Formatted value
 */
const formatValue = (value) => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return `"${value}"`
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }
  return String(value)
} 