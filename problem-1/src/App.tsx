import { ComponentLibrary } from './components/ComponentLibrary'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <ComponentLibrary />
      </div>
    </div>
  )
}

export default App