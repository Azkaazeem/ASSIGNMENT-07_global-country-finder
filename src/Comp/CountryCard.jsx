import { Link } from 'react-router-dom'

export default function CountryCard({ country }) {
  return (
    <Link to={`/country/${country.name.common}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <img 
        src={country.flags.svg} 
        alt={`Flag of ${country.name.common}`} 
        className="w-full h-40 object-cover border-b"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 truncate">{country.name.common}</h2>
        <p className="text-gray-700"><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
        <p className="text-gray-700"><span className="font-semibold">Region:</span> {country.region}</p>
        <p className="text-gray-700"><span className="font-semibold">Capital:</span> {country.capital ? country.capital[0] : 'N/A'}</p>
      </div>
    </Link>
  )
}