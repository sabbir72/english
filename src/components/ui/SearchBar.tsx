import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onClear?: () => void;
  placeholder?: string;
  shortcutBadge?: string;
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search words, sentences, grammar topics...',
  shortcutBadge,
  className = '',
  autoFocus = false,
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/80 py-2.5 pl-10 pr-16 text-xs sm:text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900/80 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-900"
      />
      <div className="absolute right-3 flex items-center gap-1.5">
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              if (onClear) onClear();
            }}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Clear search query"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {shortcutBadge && !value && (
          <kbd className="hidden sm:inline-flex items-center rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-500 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            {shortcutBadge}
          </kbd>
        )}
      </div>
    </div>
  );
};
