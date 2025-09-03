import { Suspense, lazy } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/ui/LoadingSpinner'
import './App.css'

// Lazy load the main component
const PerformanceOptimizationDemo = lazy(() => 
  import('./components/PerformanceOptimizationDemo').then(module => ({
    default: module.PerformanceOptimizationDemo
  }))
)

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="lg" />
          </div>
        }>
          <PerformanceOptimizationDemo />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

export default App