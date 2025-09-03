import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { PerformanceMonitor } from './utils/PerformanceMonitor'
import './index.css'

// Initialize performance monitoring
PerformanceMonitor.init()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)