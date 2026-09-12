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
      'border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-slate-100',
    elevated:
      'border border-slate-100 bg-white shadow-md shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/50 text-slate-900 dark:text-slate-100',
    subtle:
      'border border-slate-100 bg-slate-50/70 dark:border-slate-800/80 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100',
    gradient:
      'border border-emerald-100/60 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 dark:border-emerald-900/40 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 text-slate-900 dark:text-slate-100',
  };

  const hoverStyles = hoverEffect
    ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200/80 dark:hover:border-emerald-900/80'
    : 'transition-colors';

  return (
    <div
      className={`rounded-3xl ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
