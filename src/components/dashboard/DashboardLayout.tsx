import { type ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => setCollapsed((c) => !c);
  const handleMobileToggle = () => setMobileOpen((o) => !o);
  const handleCloseMobile = () => setMobileOpen(false);

  return (
    <div className="flex h-screen bg-cameroun-green/10">
      <Sidebar
        collapsed={collapsed}
        onToggle={handleToggle}
        mobileOpen={mobileOpen}
        onClose={handleCloseMobile}
      />
      <div className="flex flex-col flex-1">
        <Navbar onMenuClick={handleMobileToggle} />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
