import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Kuch galat ho gaya.</h1>
      <p className="text-gray-700 mb-4">Sorry, ek unexpected error aagaya hai.</p>
      <p className="text-gray-500 italic mb-8">
        {error.statusText || error.message}
      </p>
      <Link to="/" className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition">
        Go Back Home
      </Link>
    </div>
  );
}