import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  open: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, open }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className="flex items-center px-4 py-3 hover:bg-zinc-800 transition-all"
    >
      <Icon size={20} />
      <span className={`ml-3 text-sm font-medium transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}>
        {label}
      </span>
    </Link>
  );
};

export default SidebarItem;
