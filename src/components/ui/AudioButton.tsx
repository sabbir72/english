import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakText, stopSpeaking } from '../../utils/speech';

export interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'subtle' | 'ghost' | 'primary';
  className?: string;
  label?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'md',
  variant = 'subtle',
  className = '',
  label,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakText(text, 1.0, () => {
        setIsPlaying(false);
      });
    }
  };

  const sizeStyles = {
    sm: 'p-1.5 text-xs gap-1',
    md: 'p-2 text-xs sm:text-sm gap-1.5',
    lg: 'p-2.5 text-sm gap-2',
  };

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const variantStyles = {
    subtle:
      'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:hover:bg-emerald-950/60 dark:hover:text-emerald-300 text-slate-600 dark:text-slate-300',
    ghost:
      'hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800 dark:hover:text-emerald-400 text-slate-400 dark:text-slate-400',
    primary:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs active:bg-emerald-700',
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-xl font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95 cursor-pointer ${
        sizeStyles[size]
      } ${variantStyles[variant]} ${isPlaying ? 'ring-2 ring-emerald-500 animate-pulse' : ''} ${className}`}
      aria-label={`Listen pronunciation of ${text}`}
      title={`Listen pronunciation of "${text}"`}
    >
      <Volume2 className={`${iconSizes[size]} ${isPlaying ? 'text-emerald-600 dark:text-emerald-400 animate-bounce' : ''}`} />
      {label && <span>{label}</span>}
    </button>
  );
};
