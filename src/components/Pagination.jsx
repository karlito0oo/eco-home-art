import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showPageNumbers = true, // Option to show/hide page numbers
  maxPageNumbers = 5 // Maximum number of page numbers to show
}) => {
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxPageNumbers) {
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* First Page */}
      {showPageNumbers && currentPage > 2 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-50"
        >
          1
        </button>
      )}

      {/* Ellipsis */}
      {showPageNumbers && currentPage > 3 && (
        <span className="px-2">...</span>
      )}

      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-3 py-1 rounded flex items-center gap-1
          ${currentPage === 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      {showPageNumbers && getPageNumbers().map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded ${
            currentPage === number
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-3 py-1 rounded flex items-center gap-1
          ${currentPage === totalPages 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
      >
        <span className="hidden sm:inline">Next</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Ellipsis */}
      {showPageNumbers && currentPage < totalPages - 2 && (
        <span className="px-2">...</span>
      )}

      {/* Last Page */}
      {showPageNumbers && currentPage < totalPages - 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-50"
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};

export default Pagination;
