import { Menu, X, Home, Newspaper, Settings } from 'lucide-react';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  open: boolean;
  toggle: () => void;
}

const menuItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Headlines', icon: Newspaper, href: '/headlines' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar({ open, toggle }: SidebarProps) {
  return (
    <aside className={`fixed top-0 left-0 h-full bg-zinc-900 text-white shadow-lg z-50 transition-all duration-300 ${open ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-800">
        <span className={`font-bold text-xl transition-opacity ${open ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
          NewsBlog
        </span>
        <button onClick={toggle} className="text-gray-300 hover:text-white">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <SidebarItem key={item.name} open={open} href={item.href} icon={item.icon} label={item.name} />
        ))}
      </nav>
    </aside>
  );
}
