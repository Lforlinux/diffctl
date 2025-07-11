import React from 'react'

const DiffOutput = ({ diff }) => {
  if (!diff || diff.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">No diff found</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Diff Result</h3>
      </div>
      <div className="p-4">
        <div className="bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto">
          <div className="font-mono text-sm">
            {diff.map((part, index) => {
              let className = 'diff-unchanged'
              if (part.added) {
                className = 'diff-added'
              } else if (part.removed) {
                className = 'diff-removed'
              }
              
              return (
                <div key={index} className="flex">
                  <span className="text-gray-500 dark:text-gray-400 mr-4 select-none min-w-[3rem]">
                    {part.lineNumber}
                  </span>
                  <span className={className}>
                    {part.value}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiffOutput 