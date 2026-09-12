import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  subLabel?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  subLabel,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <div className="flex items-center justify-between text-xs font-semibold">
          <label htmlFor={generatedId} className="text-slate-800 dark:text-slate-200">
            {label}
          </label>
          {subLabel && <span className="text-slate-400 font-normal">{subLabel}</span>}
        </div>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center text-slate-400">
            {leftIcon}
          </div>
        )}

        <input
          id={generatedId}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 ${
            leftIcon ? 'pl-9' : ''
          } ${rightIcon ? 'pr-9' : ''} ${
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
          } ${className}`}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 flex items-center text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-[11px] font-medium text-rose-500">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};
