// SidebarItem.tsx
import Link from "next/link";
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: IconType; // React-icons এর icon type
  label: string;
  href: string;
  open: boolean;
  active?: boolean;
}

export default function SidebarItem({
  icon: Icon,
  label,
  href,
  open,
  active,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center ${
        open ? "justify-start px-4" : "justify-center"
      } h-12 transition-all ${
        active
          ? "bg-zinc-800 text-blue-500 border-r-4 border-blue-500"
          : "hover:bg-zinc-800"
      }`}
    >
      <Icon size={28} />
      {open && (
        <span className="ml-3 text-lg font-medium transition-opacity">{label}</span>
      )}
    </Link>
  );
}
