import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'subtle' | 'gradient';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  padding = 'md',
  variant = 'default',
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const variantStyles = {
    default:
      'border border-slate-200/90 bg-white dark:border-slate-800 dark:bg-[#1E293B] text-slate-900 dark:text-slate-100 shadow-[0_1px_3px_rgba(15,23,42,0.04)]',
    elevated:
      'border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-[#1E293B] text-slate-900 dark:text-slate-100',
    subtle:
      'border border-slate-200/60 bg-slate-50/70 dark:border-slate-800/80 dark:bg-[#1E293B]/70 text-slate-900 dark:text-slate-100',
    gradient:
      'border border-indigo-100/80 bg-gradient-to-br from-indigo-50/40 via-white to-sky-50/30 dark:border-indigo-900/30 dark:from-[#1E293B] dark:via-[#1E293B] dark:to-indigo-950/20 text-slate-900 dark:text-slate-100',
  };

  const hoverStyles = hoverEffect
    ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600/40'
    : 'transition-colors';

  return (
    <div
      className={`rounded-2xl ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
