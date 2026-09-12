import React from 'react';

export interface LoadingStateProps {
  count?: number;
  type?: 'cards' | 'lines' | 'learning-card';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  count = 3,
  type = 'cards',
  className = '',
}) => {
  if (type === 'learning-card') {
    return (
      <div className={`rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 animate-pulse space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-8 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="space-y-2">
          <div className="h-8 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-56 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-12 w-full rounded-2xl bg-slate-100 dark:bg-slate-800/60" />
        <div className="flex gap-2 pt-2">
          <div className="h-10 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  if (type === 'lines') {
    return (
      <div className={`space-y-3 animate-pulse ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-slate-200 dark:bg-slate-800" style={{ width: `${85 - i * 15}%` }} />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-pulse ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-3"
        >
          <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-6 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
};
