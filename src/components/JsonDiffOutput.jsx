import React from 'react'

const JsonDiffOutput = ({ jsonDiff }) => {
  if (!jsonDiff || !jsonDiff.success) {
    return (
      <div className="card p-6">
        <p className="text-red-500 dark:text-red-400 text-center">
          {jsonDiff?.error || 'Invalid JSON format'}
        </p>
      </div>
    )
  }

  const { diff } = jsonDiff

  if (diff.length === 0) {
    return (
      <div className="card p-6">
        <p className="text-636e72 text-center">No differences found in JSON</p>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
        <h3 className="text-lg font-semibold text-2d3436 dark:text-white">JSON Differences</h3>
        <p className="text-sm text-636e72 dark:text-gray-400 mt-1">
          Found {diff.length} difference{diff.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {diff.map((change, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  change.type === 'added' ? 'diff-added' :
                  change.type === 'removed' ? 'diff-removed' :
                  'diff-unchanged'
                }`}>
                  {change.type.toUpperCase()}
                </span>
                <span className="text-sm font-mono text-636e72 dark:text-gray-400">
                  {change.path}
                </span>
              </div>
              
              <div className="space-y-2">
                {change.type === 'added' && (
                  <div>
                    <span className="text-sm font-medium text-2d3436 dark:text-gray-300">Added:</span>
                    <pre className="mt-1 p-2 diff-added rounded text-sm font-mono overflow-x-auto">
                      {change.formatted}
                    </pre>
                  </div>
                )}
                
                {change.type === 'removed' && (
                  <div>
                    <span className="text-sm font-medium text-2d3436 dark:text-gray-300">Removed:</span>
                    <pre className="mt-1 p-2 diff-removed rounded text-sm font-mono overflow-x-auto">
                      {change.formatted}
                    </pre>
                  </div>
                )}
                
                {change.type === 'modified' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-2d3436 dark:text-gray-300">Old Value:</span>
                      <pre className="mt-1 p-2 diff-removed rounded text-sm font-mono overflow-x-auto">
                        {change.formatted.old}
                      </pre>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-2d3436 dark:text-gray-300">New Value:</span>
                      <pre className="mt-1 p-2 diff-added rounded text-sm font-mono overflow-x-auto">
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