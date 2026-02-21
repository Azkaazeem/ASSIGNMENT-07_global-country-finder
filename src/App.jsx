import { Outlet } from 'react-router-dom'
import Header from './Comp/Header'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet /> 
        {/* Outlet ki jagah par hamare pages render honge (Home ya CountryDetails) */}
      </main>
    </div>
  )
}

export default App