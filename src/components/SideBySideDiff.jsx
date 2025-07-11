import React from 'react'

const SideBySideDiff = ({ diff }) => {
  if (!diff || diff.length === 0) {
    return null
  }

  // Separate original and modified lines
  const originalLines = []
  const modifiedLines = []
  let originalLineNumber = 1
  let modifiedLineNumber = 1

  diff.forEach((part) => {
    if (part.removed) {
      // Only in original
      originalLines.push({
        content: part.value,
        lineNumber: originalLineNumber,
        type: 'removed'
      })
      originalLineNumber++
    } else if (part.added) {
      // Only in modified
      modifiedLines.push({
        content: part.value,
        lineNumber: modifiedLineNumber,
        type: 'added'
      })
      modifiedLineNumber++
    } else {
      // In both
      originalLines.push({
        content: part.value,
        lineNumber: originalLineNumber,
        type: 'unchanged'
      })
      modifiedLines.push({
        content: part.value,
        lineNumber: modifiedLineNumber,
        type: 'unchanged'
      })
      originalLineNumber++
      modifiedLineNumber++
    }
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Side-by-Side Comparison</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Original Text */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original</h4>
            <div className="bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto max-h-96 overflow-y-auto">
              <div className="font-mono text-sm">
                {originalLines.map((line, index) => (
                  <div key={`original-${index}`} className="flex">
                    <span className="text-gray-500 dark:text-gray-400 mr-4 select-none min-w-[3rem]">
                      {line.lineNumber}
                    </span>
                    <span className={`${
                      line.type === 'removed' ? 'diff-removed' : 
                      line.type === 'unchanged' ? 'diff-unchanged' : ''
                    }`}>
                      {line.content}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modified Text */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Modified</h4>
            <div className="bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto max-h-96 overflow-y-auto">
              <div className="font-mono text-sm">
                {modifiedLines.map((line, index) => (
                  <div key={`modified-${index}`} className="flex">
                    <span className="text-gray-500 dark:text-gray-400 mr-4 select-none min-w-[3rem]">
                      {line.lineNumber}
                    </span>
                    <span className={`${
                      line.type === 'added' ? 'diff-added' : 
                      line.type === 'unchanged' ? 'diff-unchanged' : ''
                    }`}>
                      {line.content}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBySideDiff 