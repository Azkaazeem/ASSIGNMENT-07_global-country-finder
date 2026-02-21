import { Link } from 'react-router-dom'

export default function Header() {
  return (
    /* Added sticky, top-0, and z-index so the header stays visible on scroll */
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <Link 
          to="/" 
          /* Added scale transform on hover for a subtle pop effect */
          className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-transform duration-300 hover:scale-105 inline-block"
        >
          Global Country Finder
        </Link>
      </div>
    </header>
  )
}