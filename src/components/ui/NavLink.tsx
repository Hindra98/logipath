import { type ReactNode } from 'react';
import { Link } from 'react-router';
import clsx from 'clsx';

interface NavLinkProps {
  to: string;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: ReactNode;
  collapsed?: boolean;
  onClick?: () => void;
}

export default function NavLink({ to, className, icon: Icon, children, collapsed, onClick }: NavLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={clsx(
        'flex items-center p-2 rounded transition-colors',
        'text-cameroun-green hover:bg-cameroun-green/30',
        className,
        collapsed && 'justify-center',
      )}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {!collapsed && <span className="ml-3">{children}</span>}
    </Link>
  );
}
