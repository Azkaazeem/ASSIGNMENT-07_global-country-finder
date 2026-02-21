export default function Pagination({ totalItems, itemsPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-10 gap-4 flex-wrap pb-10">
      <button 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg disabled:bg-gray-400 hover:bg-blue-700 transition"
      >
        Previous
      </button>
      
      <span className="font-semibold text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg disabled:bg-gray-400 hover:bg-blue-700 transition"
      >
        Next
      </button>
    </div>
  )
}