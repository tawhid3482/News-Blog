// components/DashboardDrawer.tsx
import { ReactNode, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

interface DashboardDrawerProps {
  children: ReactNode;
}

export default function DashboardDrawer({ children }: DashboardDrawerProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-900">
      <Sidebar open={open} toggle={() => setOpen(!open)} />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 flex-1 min-h-screen ${open ? 'ml-64' : 'ml-16'}`}
      >
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
