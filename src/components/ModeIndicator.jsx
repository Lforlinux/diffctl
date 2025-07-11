import React from 'react'

const ModeIndicator = ({ detection }) => {
  if (!detection) return null

  const { mode, confidence, warning, leftError, rightError } = detection

  return (
    <div className="mb-4">
      <div className="flex items-center justify-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          mode === 'json' 
            ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' 
            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
        }`}>
          {mode === 'json' ? 'JSON' : 'Text'} Diff Mode
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {Math.round(confidence * 100)}% confidence
        </span>
      </div>
      
      {(warning || leftError || rightError) && (
        <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded text-xs text-yellow-800 dark:text-yellow-200">
          {warning && <div>{warning}</div>}
          {leftError && <div>Left input: {leftError}</div>}
          {rightError && <div>Right input: {rightError}</div>}
        </div>
      )}
    </div>
  )
}

export default ModeIndicator 