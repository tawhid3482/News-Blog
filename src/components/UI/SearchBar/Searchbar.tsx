/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const Searchbar = ({
  setMenuOpen,
}: {
  setMenuOpen?: (value: boolean) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; title: string; image: string }[]
  >([]);
  const router = useRouter();

  // Fetch live suggestions with debounce
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (searchQuery.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/s1/search-news?searchTerm=${encodeURIComponent(
            searchQuery.trim()
          )}`
        );

        const hits = res.data?.data?.hits || [];
        const formattedSuggestions = hits.map((hit: any) => ({
          id: hit.id,
          title: hit.title,
          image: hit.image,
        }));
        setSuggestions(formattedSuggestions);
      } catch (error) {
        console.error("Live search error:", error);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(
        `/search?searchTerm=${encodeURIComponent(searchQuery.trim())}`
      );
      setSearchQuery("");
      setSuggestions([]);
      setMenuOpen?.(false);
    }
  };

  const navigateToSearch = (title: string) => {
    // Get first word safely
    const firstWord =
      title && title.trim().length > 0 ? title.trim().split(" ")[0] : "";

    if (firstWord) {
      router.push(`/search?searchTerm=${encodeURIComponent(firstWord)}`);
    } else {
      // fallback: use full searchQuery if firstWord not found
      if (searchQuery.trim()) {
        router.push(
          `/search?searchTerm=${encodeURIComponent(searchQuery.trim())}`
        );
      }
    }

    setSuggestions([]);
    setSearchQuery("");
    setMenuOpen?.(false);
  };

  return (
    <>
      {/* Desktop Search */}
      <div className="hidden lg:ml-80 lg:flex flex-col items-center relative w-full max-w-96 z-50">
        {/* Search input */}
        <div className="w-full bg-[#D9E6ED] p-2 rounded-t-lg flex items-center">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow text-black bg-transparent outline-none px-2"
            placeholder="Search here..."
            aria-label="Search news"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            onClick={handleSearch}
            aria-label="Search button"
            className="focus:outline-none"
          >
            <IoIosSearch className="text-2xl text-black" />
          </button>
        </div>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-md max-h-60 overflow-y-auto mt-1">
            {suggestions.map((item) => (
              <div
                key={item.id}
                onClick={() => navigateToSearch(item.title)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <Image
                  width={40}
                  height={40}
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 object-cover rounded"
                />
                <p className="text-sm text-gray-800">{item.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Search */}
      <div className="flex lg:hidden flex-col w-full relative z-50">
        {/* Search input */}
        <div className="flex items-center bg-[#D9E6ED] p-2 rounded-t-lg mt-2">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow text-black bg-transparent outline-none px-2"
            placeholder="Search here..."
            aria-label="Search news"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            onClick={handleSearch}
            aria-label="Search button"
            className="focus:outline-none"
          >
            <IoIosSearch className="text-2xl text-black" />
          </button>
        </div>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-md max-h-60 overflow-y-auto mt-1">
            {suggestions.map((item) => (
              <div
                key={item.id}
                onClick={() => navigateToSearch(item.title)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <Image
                  width={40}
                  height={40}
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 object-cover rounded"
                />
                <p className="text-sm text-gray-800">{item.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
