"use client";
import { useRouter } from "next/navigation"; // ✅ This is the new router for App Router (Next 13+)
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../button";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "World", path: "/news/world" },
  { name: "War", path: "/news/war" },
  { name: "Politics", path: "/news/politics" },
  { name: "Economy", path: "/news/economy" },
  { name: "Technology", path: "/news/technology" },
  { name: "Health", path: "/news/health" },
  { name: "Entertainment", path: "/news/entertainment" },
  { name: "Sports", path: "/news/sports" },
  { name: "National", path: "/news/national" },
  { name: "Investigative", path: "/news/investigative" },
  { name: "Education", path: "/news/education" },
  { name: "Science", path: "/news/science" },
];

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const [searchQuery, setSearchQuery] = useState("");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/search?searchTerm=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // clear input after search
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); 
    dispatch(logout());
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-white ">
      {/* Top Bar */}
      <div className="relative flex flex-col lg:flex-row items-center p-4 gap-4 max-w-7xl mx-auto w-full">
        {/* Logo + Mobile Menu Icon */}
        <div className="flex w-full justify-between items-center lg:w-auto">
          <div className="text-2xl font-medium">TIS-News</div>
          <button
            className="text-3xl lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>

        {/* Search Bar - Large Screen (Center) */}
        <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2 w-full max-w-md bg-[#D9E6ED] p-2 rounded-lg">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="flex-grow text-black bg-transparent outline-none px-2"
            placeholder="Search here..."
          />

          <button onClick={handleSearch}>
            <IoIosSearch className="text-2xl text-black" />
          </button>
        </div>

        {/* Search Bar - Mobile View */}
        <div className="flex lg:hidden items-center w-full bg-[#D9E6ED] p-2 rounded-lg">
          <input
            type="text"
            className="flex-grow text-black bg-transparent outline-none px-2"
            placeholder="Search here..."
          />
          <button>
            <IoIosSearch className="text-2xl text-black" />
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          {isClient && user ? (
            <>
              <Link href="/profile" className="text-lg font-medium">
                Profile
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            isClient && (
              <>
                <Link href="/signin" className="text-lg font-medium">
                  <Button>Sign In</Button>
                </Link>
                <Link href="/signup" className="text-lg font-medium">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } lg:flex flex-wrap justify-center items-center px-4 py-2 max-w-6xl mx-auto text-sm sm:text-base transition-all duration-300 ease-in-out`}
      >
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-6 lg:flex gap-4 w-full justify-center item-center">
          {navItems.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              onClick={() => setMenuOpen(false)}
              className={`font-medium text-lg transition-colors duration-200 hover:text-[#0896EF] text-center ${
                pathname === path ? "text-[#0896EF]" : "text-black"
              }`}
            >
              {name}
              <span className="ml-2 hidden md:inline">|</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
