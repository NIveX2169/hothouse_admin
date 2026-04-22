// components/common/Pagination.jsx
import React from 'react';
// Material UI Icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Pagination = ({ pageNum, limit, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / limit) || 1;

  // Logic to calculate the range of 10 numbers to show
  const getPageNumbers = () => {
    const maxVisible = 10;
    let start = Math.max(1, pageNum - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust if we are at the end of the list
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-zinc-100 rounded-b-2xl">
      {/* 1. Left Side: Summary */}
      <div className="hidden lg:block">
        <p className="text-sm text-zinc-500 font-medium">
          Showing page <span className="text-zinc-900 font-bold">{pageNum}</span> of{" "}
          <span className="text-zinc-900 font-bold">{totalPages}</span>
        </p>
      </div>

      {/* 2. Center: Page Numbers */}
      <div className="flex flex-1 justify-center items-center gap-1 md:gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(pageNum - 1)}
          disabled={pageNum <= 1}
          className="p-2 rounded-xl border border-zinc-200 text-zinc-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-white transition-all flex items-center justify-center"
        >
          <ChevronLeftIcon sx={{ fontSize: 20 }} />
        </button>

        {/* First Page shortcut if not in range */}
        {pageNumbers[0] > 1 && (
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onPageChange(1)}
              className="w-10 h-10 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-600 hover:border-red-600 hover:text-red-600 transition-all"
            >
              1
            </button>
            <MoreHorizIcon sx={{ fontSize: 18 }} className="text-zinc-400" />
          </div>
        )}

        {/* Direct Page Numbers */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all border
              ${pageNum === number 
                ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-200 scale-110 z-10" 
                : "bg-white border-zinc-200 text-zinc-600 hover:border-red-600 hover:text-red-600"
              }`}
          >
            {number}
          </button>
        ))}

        {/* Last Page shortcut if not in range */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <div className="hidden md:flex items-center gap-1">
            <MoreHorizIcon sx={{ fontSize: 18 }} className="text-zinc-400" />
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-10 h-10 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-600 hover:border-red-600 hover:text-red-600 transition-all"
            >
              {totalPages}
            </button>
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(pageNum + 1)}
          disabled={pageNum >= totalPages}
          className="p-2 rounded-xl border border-zinc-200 text-zinc-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-white transition-all flex items-center justify-center"
        >
          <ChevronRightIcon sx={{ fontSize: 20 }} />
        </button>
      </div>

      {/* 3. Right Side: Total Count Placeholder */}
      <div className="hidden lg:block text-right w-32">
        {/* Empty or add total items here */}
      </div>
    </div>
  );
};

export default Pagination;