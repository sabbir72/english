import React from 'react';

export type BadgeVariant = 'emerald' | 'blue' | 'amber' | 'purple' | 'rose' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 rounded-md gap-1',
    md: 'text-xs px-2.5 py-1 rounded-lg gap-1.5',
  };

  const variantStyles = {
    emerald:
      'bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60',
    blue:
      'bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/60',
    amber:
      'bg-amber-50 text-amber-800 border border-amber-200/60 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60',
    purple:
      'bg-purple-50 text-purple-700 border border-purple-200/60 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/60',
    rose:
      'bg-rose-50 text-rose-700 border border-rose-200/60 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/60',
    neutral:
      'bg-slate-100 text-slate-700 border border-slate-200/60 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700/60',
  };

  const dotColors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
    rose: 'bg-rose-500',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center font-bold tracking-tight select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
