import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'cancel';
}

export default function Button({
  children,
  variant = 'primary',
  className,
  ...rest
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center cursor-pointer rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 p-1';
  const variantClasses = {
    primary: 'bg-cameroun-green text-white hover:bg-cameroun-green/90 focus:ring-cameroun-green/50',
    secondary: 'bg-cameroun-yellow text-cameroun-green hover:bg-cameroun-yellow/90 focus:ring-cameroun-yellow/50',
    ghost: 'bg-transparent text-cameroun-green hover:bg-cameroun-green/10 focus:ring-cameroun-green/50',
    destructive: 'bg-cameroun-red text-white hover:bg-cameroun-red/90 focus:ring-cameroun-red/50',
    cancel: 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500',
  };

  return (
    <button className={clsx(base, variantClasses[variant], className)} {...rest}>
      {children}
    </button>
  );
}
