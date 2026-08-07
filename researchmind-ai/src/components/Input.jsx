import React from 'react';

const Input = ({
  type = 'text',
  label = null,
  error = null,
  helperText = null,
  icon: Icon = null,
  options = [],
  rows = 4,
  className = '',
  ...props
}) => {
  const baseInputStyles =
    'w-full bg-[#09090B] text-[#FAFAFA] placeholder-zinc-500 border border-zinc-800 rounded-[14px] px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-zinc-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {type === 'select' ? (
          <select
            className={`${baseInputStyles} ${Icon ? 'pl-10' : ''} ${className} appearance-none bg-no-repeat bg-right pr-10`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23A1A1AA'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundSize: '1.25rem',
              backgroundPosition: 'right 0.75rem center',
            }}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value || opt} value={opt.value || opt} className="bg-[#18181B] text-zinc-200">
                {opt.label || opt}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            rows={rows}
            className={`${baseInputStyles} ${Icon ? 'pl-10' : ''} ${className} resize-none`}
            {...props}
          />
        ) : (
          <input
            type={type}
            className={`${baseInputStyles} ${Icon ? 'pl-10' : ''} ${className}`}
            {...props}
          />
        )}
      </div>

      {error && <span className="text-xs text-white font-medium underline">{error}</span>}
      {helperText && !error && <span className="text-xs text-zinc-400">{helperText}</span>}
    </div>
  );
};

export default Input;
