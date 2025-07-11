/**
 * Generate a diff between two text inputs with line numbers
 * @param {string} oldText - The original text
 * @param {string} newText - The modified text
 * @returns {Array} Array of diff parts with added/removed/unchanged properties and line numbers
 */
export const generateDiff = (oldText, newText) => {
  if (!oldText && !newText) {
    return []
  }
  
  if (!oldText) {
    return [{ value: newText, added: true, lineNumber: 1 }]
  }
  
  if (!newText) {
    return [{ value: oldText, removed: true, lineNumber: 1 }]
  }

  // Line-by-line diff implementation
  const oldLines = oldText.split('\n')
  const newLines = newText.split('\n')
  const result = []
  
  let i = 0, j = 0
  let lineNumber = 1
  
  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
      // Lines match
      result.push({ 
        value: oldLines[i] + '\n', 
        added: false, 
        removed: false, 
        lineNumber: lineNumber 
      })
      i++
      j++
      lineNumber++
    } else if (j < newLines.length && (i >= oldLines.length || oldLines[i] !== newLines[j])) {
      // Line added
      result.push({ 
        value: newLines[j] + '\n', 
        added: true, 
        removed: false, 
        lineNumber: lineNumber 
      })
      j++
      lineNumber++
    } else if (i < oldLines.length && (j >= newLines.length || oldLines[i] !== newLines[j])) {
      // Line removed
      result.push({ 
        value: oldLines[i] + '\n', 
        added: false, 
        removed: true, 
        lineNumber: lineNumber 
      })
      i++
      lineNumber++
    }
  }
  
  return result
}

/**
 * Get statistics about the diff
 * @param {Array} diff - The diff result array
 * @returns {Object} Object containing counts of added, removed, and unchanged parts
 */
export const getDiffStats = (diff) => {
  if (!diff || diff.length === 0) {
    return { added: 0, removed: 0, unchanged: 0 }
  }

  return diff.reduce((stats, part) => {
    if (part.added) {
      stats.added += part.value.length
    } else if (part.removed) {
      stats.removed += part.value.length
    } else {
      stats.unchanged += part.value.length
    }
    return stats
  }, { added: 0, removed: 0, unchanged: 0 })
} 