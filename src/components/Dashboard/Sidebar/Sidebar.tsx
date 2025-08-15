// Sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons"; // টাইপ ইম্পোর্ট
import { FaBars, FaTimes, FaFileAlt } from "react-icons/fa"; // React-icons এর আইকনগুলো
import SidebarItem from "./SidebarItem";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";

interface SidebarProps {
  open: boolean;
  toggle: () => void;
  role: UserRole;
}

export default function Sidebar({ open, toggle, role }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-zinc-900 text-white shadow-lg z-50 transition-all duration-300 ${
        open ? "w-64" : "w-18"
      }`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800">
        {open && (
          <Link href="/">
            <span className="font-bold text-xl transition-opacity">TIS-News</span>
          </Link>
        )}
        <button
          onClick={toggle}
          className={`text-gray-300 hover:text-white cursor-pointer ${
            !open ? "mx-auto" : ""
          }`}
        >
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100%-4rem)]">
        <nav className="mt-4 px-1 sm:px-2 space-y-1">
          {drawerItems(role)?.map((item, index) => {
            const linkPath = `/dashboard/${item.path}`;
            const active = pathname === linkPath;
            const IconComponent: IconType = item.icon ?? FaFileAlt; // ডিফল্ট আইকন React-icons এর

            return (
              <SidebarItem
                key={index}
                icon={IconComponent}
                label={item.title}
                href={linkPath}
                open={open}
                active={active}
              />
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
