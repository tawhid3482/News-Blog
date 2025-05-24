"use client";

import { useState } from "react";
import { Bell, Mail, MoreVertical } from "lucide-react";
import Image from "next/image";
import { removeUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

export default function AppNavbar({
  userName,
  userImage,
}: {
  userName: string;
  userImage: string;
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    removeUser();
    router.push("/");
  };

  return (
    <header className="bg-gray-200 shadow-md px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-10">
      {/* Left Side */}
      <div>
      
        <h1 className="text-lg uppercase md:text-xl lg:text-2xl font-bold text-[#0896EF]">
          Hi, {userName}
        </h1>
      </div>

      {/* Right Side */}
      <div className="relative">
        {/* Desktop View */}
        <div className="hidden sm:flex items-center space-x-4">
          <button className="hover:text-[#0896EF] cursor-pointer transition">
            <Mail size={24} />
          </button>
          <button className="hover:text-[#0896EF] cursor-pointer transition ">
            <Bell size={24} />
          </button>
          <Link
            href={"/"}
            className="hover:text-[#0896EF] cursor-pointer transition"
          >
            <FaHome size={24} />
          </Link>
          {userImage && (
            <div className="relative">
              <Image
                onClick={() => setShowDropdown(!showDropdown)}
                src={userImage || '/default-user.png'}
                alt="User"
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-20 text-center">
                  <div className="px-4 py-2 cursor-pointer border-b hover:text-[#0896EF] ">
                    Setting
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 hover:text-[#0896EF] cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile View */}
        <div className="sm:hidden">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="hover:text-zinc-600 transition"
          >
            <MoreVertical size={24} />
          </button>
          {showMobileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-30">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                <Mail size={18} /> <span>Messages</span>
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                <Bell size={18} /> <span>Notifications</span>
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Image
                  src={userImage}
                  alt="User"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>Profile</span>
              </div>
              {showDropdown && (
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
