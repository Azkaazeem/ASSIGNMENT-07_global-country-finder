import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition">
          🌍 Global Country Finder
        </Link>
      </div>
    </header>
  )
}