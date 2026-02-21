import { Link } from 'react-router-dom'

export default function CountryCard({ country }) {
  return (
    <Link 
      to={`/country/${country.name.common}`} 
      /* Added group class, translate-y, and enhanced shadow for floating effect */
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="overflow-hidden">
        <img 
          src={country.flags.svg} 
          alt={`Flag of ${country.name.common}`} 
          /* Added scale-110 on group hover for smooth image zoom */
          className="w-full h-40 object-cover border-b group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>
      <div className="p-4">
        {/* Title color changes on hover */}
        <h2 className="text-xl font-bold mb-2 truncate group-hover:text-blue-600 transition-colors duration-300">
          {country.name.common}
        </h2>
        <p className="text-gray-700"><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
        <p className="text-gray-700"><span className="font-semibold">Region:</span> {country.region}</p>
        <p className="text-gray-700"><span className="font-semibold">Capital:</span> {country.capital ? country.capital[0] : 'N/A'}</p>
      </div>
    </Link>
  )
}