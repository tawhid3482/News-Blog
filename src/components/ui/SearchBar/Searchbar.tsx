"use client";

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";

const Searchbar = ({
  setMenuOpen,
}: {
  setMenuOpen?: (value: boolean) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(
        `/search?searchTerm=${encodeURIComponent(searchQuery.trim())}`
      );
      setSearchQuery("");
      setMenuOpen?.(false); // Optional chaining if it's provided
    }
  };

  return (
    <>
      {/* Search Bar - Large Screen */}
      <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2 w-full max-w-md bg-[#D9E6ED] p-2 rounded-lg">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="flex-grow text-black bg-transparent outline-none px-2"
          placeholder="Search here..."
          aria-label="Search news"
        />
        <button
          onClick={handleSearch}
          aria-label="Search button"
          className="focus:outline-none"
        >
          <IoIosSearch className="text-2xl text-black" />
        </button>
      </div>

      {/* Search Bar - Mobile View */}
      <div className="flex lg:hidden items-center w-full bg-[#D9E6ED] p-2 rounded-lg mt-2 lg:mt-0">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="flex-grow text-black bg-transparent outline-none px-2"
          placeholder="Search here..."
          aria-label="Search news"
        />
        <button
          onClick={handleSearch}
          aria-label="Search button"
          className="focus:outline-none"
        >
          <IoIosSearch className="text-2xl text-black" />
        </button>
      </div>
    </>
  );
};

export default Searchbar;
