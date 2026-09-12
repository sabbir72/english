import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100 or current
  max?: number;
  label?: string;
  subLabel?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'emerald' | 'blue' | 'amber' | 'purple';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  subLabel,
  showPercentage = false,
  size = 'md',
  color = 'emerald',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const colorStyles = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || subLabel || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            {label && <span className="text-slate-800 dark:text-slate-200">{label}</span>}
            {subLabel && <span className="text-slate-400 font-normal">({subLabel})</span>}
          </div>
          {showPercentage && (
            <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
              {percentage}%
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 ${heightStyles[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full rounded-full ${colorStyles[color]} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
