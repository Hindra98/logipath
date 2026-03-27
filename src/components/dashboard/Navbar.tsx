import { Menu } from 'lucide-react';
import Button from '../ui/Button';

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="flex items-center justify-between bg-white border-b border-cameroun-green/30 p-4">
      <Button
        variant="ghost"
        className="md:hidden text-cameroun-green p-0"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6" />
      </Button>
      <h1 className="text-lg font-semibold text-cameroun-green">Dashboard</h1>
      {/* optional right side: user, notifications, ... */}
      <div />
    </header>
  );
}
