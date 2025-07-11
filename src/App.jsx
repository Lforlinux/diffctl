import React, { useState, useEffect } from 'react'
import EditorPane from './components/EditorPane'
import DiffOutput from './components/DiffOutput'
import SideBySideDiff from './components/SideBySideDiff'
import JsonDiffOutput from './components/JsonDiffOutput'
import DiffStats from './components/DiffStats'
import ThemeToggle from './components/ThemeToggle'
import ModeIndicator from './components/ModeIndicator'
import { generateDiff } from './utils/diffUtils'
import { generateJsonDiff } from './utils/jsonDiffUtils'
import { detectDiffMode } from './utils/fileTypeDetector'

function App() {
  const [leftText, setLeftText] = useState('')
  const [rightText, setRightText] = useState('')
  const [diffResult, setDiffResult] = useState(null)
  const [jsonDiffResult, setJsonDiffResult] = useState(null)
  const [viewMode, setViewMode] = useState('unified') // 'unified' or 'side-by-side'
  const [detectedMode, setDetectedMode] = useState(null)
  const [isDark, setIsDark] = useState(false)

  const handleCompare = () => {
    // Clear previous results first
    setDiffResult(null)
    setJsonDiffResult(null)
    
    const detection = detectDiffMode(leftText, rightText)
    setDetectedMode(detection)
    console.log('Detection result:', detection)
    
    if (detection.mode === 'json') {
      const jsonDiff = generateJsonDiff(leftText, rightText)
      setJsonDiffResult(jsonDiff)
      console.log('JSON diff result:', jsonDiff)
    } else {
      const diff = generateDiff(leftText, rightText)
      setDiffResult(diff)
      console.log('Text diff result:', diff)
    }
  }

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleClear = () => {
    setLeftText('')
    setRightText('')
    setDiffResult(null)
    setJsonDiffResult(null)
    setDetectedMode(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            diffctl
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A smart, sysadmin-friendly diff checker for text and JSON.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <EditorPane
            title="Original Text"
            value={leftText}
            onChange={setLeftText}
            placeholder="Enter the original text or JSON here..."
          />
          <EditorPane
            title="Modified Text"
            value={rightText}
            onChange={setRightText}
            placeholder="Enter the modified text or JSON here..."
          />
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleCompare}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Compare
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear All
          </button>
        </div>

        {detectedMode && (
          <ModeIndicator detection={detectedMode} />
        )}
        
        {/* Simple status display */}
        {detectedMode && (
          <div className="mb-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm text-center">
            <p>Mode: {detectedMode.mode}</p>
            <p>Confidence: {Math.round(detectedMode.confidence * 100)}%</p>
            {detectedMode.warning && <p className="text-yellow-600">Warning: {detectedMode.warning}</p>}
          </div>
        )}

        {diffResult && detectedMode?.mode === 'text' && (
          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-4">
              <button
                onClick={() => setViewMode('unified')}
                className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  viewMode === 'unified'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Unified View
              </button>
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  viewMode === 'side-by-side'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Side-by-Side View
              </button>
            </div>
          </div>
        )}

        {diffResult && (
          <>
            <DiffStats diff={diffResult} diffMode="text" />
            {viewMode === 'unified' ? (
              <DiffOutput diff={diffResult} />
            ) : (
              <SideBySideDiff diff={diffResult} />
            )}
          </>
        )}
        
        {jsonDiffResult && (
          <>
            <DiffStats diff={jsonDiffResult.diff} diffMode="json" />
            <JsonDiffOutput jsonDiff={jsonDiffResult} />
          </>
        )}
      </div>
    </div>
  )
}

export default App 