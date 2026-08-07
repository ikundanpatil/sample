import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090B] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-[14px] gap-2',
    lg: 'text-base px-6 py-3.5 rounded-[14px] gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-white hover:bg-zinc-200 text-black border border-white font-semibold shadow-md focus:ring-white',
    secondary:
      'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700 hover:border-zinc-500 focus:ring-zinc-500',
    danger:
      'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-zinc-500 focus:ring-zinc-500',
    ghost:
      'bg-transparent hover:bg-zinc-800/80 text-zinc-300 hover:text-white border border-transparent focus:ring-zinc-500',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 text-current" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
