"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // example: "/news/politics" or "/search"
  extraQuery?: Record<string, string>; // example: { searchTerm: "something" }
}

const Pagination = ({
  currentPage,
  totalPages,
  basePath,
  extraQuery = {},
}: PaginationProps) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  // Build query string
  const createQueryString = (page: number) => {
    const params = new URLSearchParams({ ...extraQuery, page: page.toString() });
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center gap-4 my-8">
      {/* Prev Button */}
      {currentPage > 1 ? (
        <Link
          href={createQueryString(prevPage)}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Prev
        </Link>
      ) : (
        <span className="px-4 py-2 border rounded opacity-50 cursor-not-allowed">
          Prev
        </span>
      )}

      {/* Page Info */}
      <span className="px-4 py-2 border rounded bg-[#0896EF] text-white">
        {currentPage} / {totalPages}
      </span>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createQueryString(nextPage)}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 border rounded opacity-50 cursor-not-allowed">
          Next
        </span>
      )}
    </div>
  );
};

export default Pagination;
