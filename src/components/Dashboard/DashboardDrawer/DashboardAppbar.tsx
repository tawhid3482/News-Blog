/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Bell, Mail, MoreVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHome, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { removeUser } from "@/services/auth.services";
import { useGetAllNotificationQuery } from "@/redux/features/notification/notificationApi";

export default function AppNavbar({
  userName,
  userImage,
}: {
  userName: string;
  userImage: string;
}) {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: notification } = useGetAllNotificationQuery({});
  // console.log(notification);

  const handleLogout = async () => {
    removeUser();
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="bg-gray-200 shadow-md px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Left Side */}
      <div>
        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#0896EF]">
          Hi, {userName}
        </h1>
      </div>

      {/* Right Side */}
      <div className="relative flex items-center space-x-3 sm:space-x-5">
        {/* Desktop & Tablet Menu */}
        <div className="hidden sm:flex items-center space-x-6">
          {/* Mail Icon & Popup */}
          <div className="relative">
            <button
              onClick={() => {
                setShowContact(!showContact);
                setShowNotifications(false);
                setShowDropdown(false);
              }}
              className="hover:text-[#0896EF] cursor-pointer transition"
              aria-label="Contact Info"
            >
              <Mail size={24} />
            </button>

            {showContact && (
              <div className="absolute right-0 top-8 w-72 bg-white border rounded shadow-lg z-40 p-4 text-sm space-y-3">
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span className="break-all">tisnews3482@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>01853505787</span>
                </div>
                <div className="flex items-center space-x-2 ">
                  <FaWhatsapp size={16} className="text-green-600" />
                  <span>01826853371</span>
                </div>
              </div>
            )}
          </div>

          {/* Bell Notification */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowContact(false);
                setShowDropdown(false);
              }}
              className="hover:text-[#0896EF] cursor-pointer transition relative"
              aria-label="Notifications"
            >
              <Bell size={24} />
              {notification && notification.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                  {notification.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-8 w-80 max-h-64 overflow-y-auto bg-white border rounded shadow-lg z-40 p-4">
                <h3 className="font-semibold mb-2">Notifications</h3>
                {notification && notification.length > 0 ? (
                  <ul className="text-sm space-y-2">
                    {notification?.map((note: any) => (
                      <li
                        key={note.id}
                        className="border-b pb-2 last:border-none"
                        title={new Date(note.createdAt).toLocaleString()}
                      >
                        📢 {note.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center">No notifications</p>
                )}
              </div>
            )}
          </div>

          {/* Home Link */}
          <Link
            href="/"
            className="hover:text-[#0896EF] cursor-pointer transition"
            aria-label="Home"
          >
            <FaHome size={24} />
          </Link>

          {/* Profile Dropdown */}
          {userImage && (
            <div className="relative">
              <Image
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  setShowContact(false);
                  setShowNotifications(false);
                }}
                src={userImage || "/default-user.png"}
                alt="User"
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
                tabIndex={0}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-40 text-center">
                  <div className="px-4 py-2 cursor-pointer border-b hover:text-[#0896EF]">
                    Settings
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 hover:text-[#0896EF] cursor-pointer w-full "
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden relative">
          <button
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
              setShowContact(false);
              setShowNotifications(false);
              setShowDropdown(false);
            }}
            className="hover:text-zinc-600 transition"
            aria-label="Menu"
          >
            <MoreVertical size={24} />
          </button>

          {showMobileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50 divide-y">
              {/* Contact */}
              <div
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                onClick={() => {
                  setShowContact(!showContact);
                  setShowNotifications(false);
                  setShowDropdown(false);
                }}
              >
                <Mail size={20} /> <span>Contact</span>
              </div>
              {showContact && (
                <div className="px-4 py-2 bg-gray-50 text-sm space-y-2">
                  <div className="flex items-center space-x-2">
                    <span>📧</span>
                    <span>TIS-News@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📞</span>
                    <span>01853505787</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaWhatsapp size={16} className="text-green-600" />
                    <span>01826853371</span>
                  </div>
                </div>
              )}

              {/* Notifications */}
              <div
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowContact(false);
                  setShowDropdown(false);
                }}
              >
                <Bell size={20} />
                <span>Notifications</span>
                {notification && notification.length > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs rounded-full px-2">
                    {notification.length}
                  </span>
                )}
              </div>
              {showNotifications && (
                <div className="px-4 py-2 max-h-48 overflow-y-auto bg-gray-50 text-sm">
                  {notification && notification.length > 0 ? (
                    <ul>
                      {notification?.map((note: any) => (
                        <li
                          key={note.id}
                          className="border-b py-1 last:border-none"
                          title={new Date(note.createdAt).toLocaleString()}
                        >
                          📢 {note.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-center">
                      No notifications
                    </p>
                  )}
                </div>
              )}

              {/* Home */}
              <Link
                href="/"
                className="block px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <FaHome size={20} />
                  <span>Home</span>
                </div>
              </Link>

              {/* Profile */}
              <div
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  setShowContact(false);
                  setShowNotifications(false);
                }}
              >
                <Image
                  src={userImage || "/default-user.png"}
                  alt="User"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>Profile</span>
              </div>
              {showDropdown && (
                <div className="px-4 py-2 bg-gray-50 text-sm">
                  <div className="cursor-pointer py-1 border-b hover:text-[#0896EF]">
                    Settings
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left cursor-pointer py-1 hover:text-[#0896EF]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
