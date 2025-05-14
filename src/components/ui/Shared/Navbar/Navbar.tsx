"use client";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../button";

const navItems = [
  { name: "Home", path: "/" },
  { name: "World", path: "/news/world" },
  { name: "Politics", path: "/news/politics" },
  { name: "Economy", path: "/news/economy" },
  { name: "Technology", path: "/news/technology" },
  { name: "Health", path: "/news/health" },
  { name: "Entertainment", path: "/news/entertainment" },
  { name: "Sports", path: "/news/sports" },
  { name: "Science", path: "/news/science" },
  { name: "National", path: "/news/national" },
  { name: "Investigative", path: "/news/investigative" },
  { name: "Education", path: "/news/education" },
];

const Navbar = () => {
  const pathname = usePathname();
  const user = false;
  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-white">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center items-center p-4 gap-4 max-w-7xl mx-auto ">
        {/* Logo */}
        <div className="text-2xl font-medium text-center lg:text-left">
          TIS-News
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md bg-[#D9E6ED] p-2 rounded-lg mx-auto lg:mx-0">
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
        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/profile" className="text-lg font-medium">
              Profile
            </Link>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/signin" className="text-lg font-medium ">
              <Button>Sign In</Button>
            </Link>
            <Link href="/signup" className="text-lg font-medium ">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center items-center gap-4 px-4 py-2 text-sm sm:text-base">
        {navItems.map(({ name, path }) => (
          <Link
            key={name}
            href={path}
            className={`font-medium text-lg transition-colors duration-200 hover:text-[#0896EF] ${
              pathname === path ? "text-[#0896EF]" : "text-black"
            }`}
          >
            {name} <span className="ml-4">|</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
