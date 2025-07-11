import React from 'react'

const JsonDiffOutput = ({ jsonDiff }) => {
  if (!jsonDiff || !jsonDiff.success) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <p className="text-red-500 dark:text-red-400 text-center">
          {jsonDiff?.error || 'Invalid JSON format'}
        </p>
      </div>
    )
  }

  const { diff } = jsonDiff

  if (diff.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">No differences found in JSON</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">JSON Differences</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Found {diff.length} difference{diff.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {diff.map((change, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  change.type === 'added' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                  change.type === 'removed' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                  'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {change.type.toUpperCase()}
                </span>
                <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                  {change.path}
                </span>
              </div>
              
              <div className="space-y-2">
                {change.type === 'added' && (
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Added:</span>
                    <pre className="mt-1 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded text-sm font-mono overflow-x-auto text-gray-900 dark:text-gray-100">
                      {change.formatted}
                    </pre>
                  </div>
                )}
                
                {change.type === 'removed' && (
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Removed:</span>
                    <pre className="mt-1 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded text-sm font-mono overflow-x-auto text-gray-900 dark:text-gray-100">
                      {change.formatted}
                    </pre>
                  </div>
                )}
                
                {change.type === 'modified' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Old Value:</span>
                      <pre className="mt-1 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded text-sm font-mono overflow-x-auto text-gray-900 dark:text-gray-100">
                        {change.formatted.old}
                      </pre>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Value:</span>
                      <pre className="mt-1 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded text-sm font-mono overflow-x-auto text-gray-900 dark:text-gray-100">
                        {change.formatted.new}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JsonDiffOutput 