import { EcommerceDashboard } from './components/EcommerceDashboard'
import { EcommerceProvider } from './context/EcommerceContext'
import './App.css'

function App() {
  return (
    <EcommerceProvider>
      <div className="min-h-screen bg-background">
        <EcommerceDashboard />
      </div>
    </EcommerceProvider>
  )
}

export default App