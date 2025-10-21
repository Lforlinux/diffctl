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
    <div className="min-h-screen">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2" style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'}}>
            diffctl
          </h1>
          <p className="text-white" style={{opacity: 0.9, textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'}}>
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
            className="btn-primary"
          >
            <span className="btn-icon">🔍</span>
            Compare
          </button>
          <button
            onClick={handleClear}
            className="btn-secondary"
          >
            <span className="btn-icon">🗑️</span>
            Clear All
          </button>
        </div>

        {detectedMode && (
          <ModeIndicator detection={detectedMode} />
        )}
        
        {/* Simple status display */}
        {detectedMode && (
          <div className="mb-4 p-4 card text-center">
            <p className="text-2d3436 dark:text-ddd">Mode: {detectedMode.mode}</p>
            <p className="text-2d3436 dark:text-ddd">Confidence: {Math.round(detectedMode.confidence * 100)}%</p>
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
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                Unified View
              </button>
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  viewMode === 'side-by-side'
                    ? 'btn-primary'
                    : 'btn-secondary'
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