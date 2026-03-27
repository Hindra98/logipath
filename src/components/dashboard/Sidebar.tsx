import {
  Home,
  Settings,
  PieChart,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface LinkItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onClose: () => void;
}

import NavLink from '../ui/NavLink';
import Button from '../ui/Button';

const links: LinkItem[] = [
  { icon: Home, label: "Dashboard", href: "/user" },
  { icon: PieChart, label: "Analytics", href: "/user/analytics" },
  { icon: Settings, label: "Settings", href: "/user/settings" },
];

export default function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-200 ${
          mobileOpen ? "opacity-90 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed md:relative inset-y-0 left-0 z-30 flex flex-col bg-cameroun-green/75 text-white
          ${collapsed ? "w-16" : "w-64"}
          transform transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed ? (
            <a href="/home" className="text-lg font-bold text-cameroun-red">Brand</a>
          ) : <a href="/home" className="text-lg font-bold text-cameroun-red hidden md:flex justify-center w-full">B</a>}
          <Button
            variant="ghost"
            className={`md:hidden ${collapsed && "w-full flex items-center justify-center"}`}
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-2">
          {links.map((l) => (
            <NavLink
            className="text-white hover:bg-white/20"
              key={l.label}
              to={l.href!}
              icon={l.icon}
              collapsed={collapsed}
              onClick={onClose}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center p-2"
            onClick={onToggle}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </Button>
        </div>
      </aside>
    </>
  );
}
