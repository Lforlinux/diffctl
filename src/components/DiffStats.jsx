import React from 'react'

const DiffStats = ({ diff, diffMode }) => {
  if (!diff || diff.length === 0) {
    return null
  }

  let stats = {
    added: 0,
    removed: 0,
    unchanged: 0,
    total: 0,
    percentage: 0
  }

  if (diffMode === 'json') {
    // JSON diff statistics
    const added = diff.filter(change => change.type === 'added').length
    const removed = diff.filter(change => change.type === 'removed').length
    const modified = diff.filter(change => change.type === 'modified').length
    
    stats = {
      added,
      removed,
      modified,
      total: diff.length,
      percentage: diff.length > 0 ? Math.round((added + removed + modified) / diff.length * 100) : 0
    }
  } else {
    // Text diff statistics
    diff.forEach(part => {
      if (part.added) {
        stats.added += part.value.split('\n').length - 1
      } else if (part.removed) {
        stats.removed += part.value.split('\n').length - 1
      } else {
        stats.unchanged += part.value.split('\n').length - 1
      }
    })
    
    stats.total = stats.added + stats.removed + stats.unchanged
    stats.percentage = stats.total > 0 ? Math.round((stats.added + stats.removed) / stats.total * 100) : 0
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Diff Statistics</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.added}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {diffMode === 'json' ? 'Properties Added' : 'Lines Added'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.removed}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {diffMode === 'json' ? 'Properties Removed' : 'Lines Removed'}
            </div>
          </div>
          
          {diffMode === 'json' && (
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.modified}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Properties Modified</div>
            </div>
          )}
          
          {diffMode === 'text' && (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.unchanged}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lines Unchanged</div>
            </div>
          )}
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.percentage}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Changed</div>
          </div>
        </div>
        
        {diffMode === 'text' && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Lines:</span>
              <span className="font-medium dark:text-white">{stats.total}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600 dark:text-gray-400">Change Rate:</span>
              <span className="font-medium dark:text-white">
                {stats.added + stats.removed > 0 ? 
                  `${Math.round((stats.added + stats.removed) / stats.total * 100)}%` : 
                  '0%'
                }
              </span>
            </div>
          </div>
        )}
        
        {diffMode === 'json' && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Changes:</span>
              <span className="font-medium dark:text-white">{stats.total}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600 dark:text-gray-400">Change Rate:</span>
              <span className="font-medium dark:text-white">{stats.percentage}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiffStats 