import React from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <BookOpen className="h-8 w-8 text-slate-400" />,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`rounded-3xl border border-dashed border-slate-200 bg-white p-8 sm:p-12 text-center dark:border-slate-800 dark:bg-slate-900/50 space-y-4 ${className}`}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        {icon}
      </div>
      <div className="space-y-1 max-w-sm mx-auto">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
