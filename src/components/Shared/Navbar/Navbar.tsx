"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import Link from "next/link";
import Searchbar from "@/components/UI/SearchBar/Searchbar";
import dynamic from "next/dynamic";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );

  return (
    <nav className="w-full sticky top-0 z-50 bg-white ">
      {/* Top Bar */}
      <div className="relative flex flex-col lg:flex-row items-center p-4 gap-4 max-w-7xl mx-auto w-full">
        {/* Logo + Mobile Menu Icon */}
        <div className="flex w-full justify-between items-center lg:w-auto">
          <Link
            href="/"
            aria-label="TIS-News Home"
            className="text-2xl font-bold text-[#0896EF]"
          >
            TIS-News
          </Link>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="text-3xl lg:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>

        {/* Reusable Searchbar */}
          <Searchbar setMenuOpen={setMenuOpen} />

        {/* Auth Buttons */}
        <div className=" lg:flex items-center gap-4 ml-auto">
          <AuthButton />
        </div>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } lg:flex flex-wrap justify-center items-center px-4 py-2 max-w-6xl mx-auto text-sm sm:text-base transition-all duration-300 ease-in-out`}
        role="menubar"
        aria-label="Primary navigation"
      >
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-6 lg:flex gap-4 w-full justify-center items-center">
          {navItems.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              onClick={() => setMenuOpen(false)}
              className={`font-medium text-lg transition-colors duration-200 hover:text-[#0896EF] text-center ${
                pathname === path ? "text-[#0896EF]" : "text-black"
              }`}
              role="menuitem"
              aria-current={pathname === path ? "page" : undefined}
            >
              {name}
              <span className="ml-2 hidden md:inline" aria-hidden="true">
                |
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
