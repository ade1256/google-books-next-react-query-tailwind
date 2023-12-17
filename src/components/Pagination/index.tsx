import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxResults: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxResults,
}) => {
  return (
    <div className="flex items-center justify-center my-4">
      <button
        onClick={() => onPageChange(currentPage - maxResults)}
        disabled={currentPage <= 1}
        className={`px-4 py-2 rounded-l text-white ${
          currentPage <= 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Prev
      </button>
      <div className="px-4 py-2 bg-white text-gray-700">
        page {currentPage === 0 ? "1" : Math.floor(currentPage / maxResults)} of{" "}
        {totalPages} total items
      </div>
      <button
        onClick={() => onPageChange(currentPage + maxResults)}
        disabled={
          currentPage === totalPages ||
          currentPage > totalPages ||
          totalPages === 1
        }
        className={`px-4 py-2 rounded-r text-white ${
          currentPage === totalPages ||
          currentPage > totalPages ||
          totalPages === 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
