import React from 'react';

const Badge = ({ children, variant = 'info', size = 'md', glow = false, icon: Icon = null, className = '' }) => {
  const variantStyles = {
    success: 'bg-zinc-800 text-zinc-100 border-zinc-600',
    warning: 'bg-zinc-800 text-zinc-200 border-zinc-700',
    info: 'bg-zinc-900 text-white border-zinc-700',
    cyan: 'bg-zinc-800 text-white border-zinc-600',
    danger: 'bg-zinc-900 text-zinc-300 border-zinc-700',
    neutral: 'bg-zinc-900 text-zinc-300 border-zinc-800',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 rounded-full gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1 rounded-full gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {glow && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-white"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      )}
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
