import React from 'react';
import { Flame, Check, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';

export interface StreakCardProps {
  streakCount?: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({ streakCount = 3 }) => {
  // Weekly streak days (Monday to Sunday)
  const days = [
    { name: 'M', full: 'Mon', completed: true },
    { name: 'T', full: 'Tue', completed: true },
    { name: 'W', full: 'Wed', completed: true }, // Today
    { name: 'T', full: 'Thu', completed: false, isToday: true },
    { name: 'F', full: 'Fri', completed: false },
    { name: 'S', full: 'Sat', completed: false },
    { name: 'S', full: 'Sun', completed: false },
  ];

  return (
    <Card hoverEffect padding="md" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500">
            <Flame className="h-5 w-5 fill-amber-500 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {streakCount} Day Streak
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Keep learning every day.
            </p>
          </div>
        </div>

        <span className="rounded-xl bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 text-[11px] font-bold text-amber-800 dark:text-amber-300">
          সক্রিয়
        </span>
      </div>

      {/* Weekly Streak Indicator */}
      <div className="pt-1">
        <div className="flex items-center justify-between gap-1.5">
          {days.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400">
                {day.name}
              </span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold transition-colors ${
                  day.completed
                    ? 'bg-amber-500 text-white shadow-xs'
                    : day.isToday
                    ? 'border-2 border-dashed border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {day.completed ? (
                  <Check className="h-4 w-4 stroke-[3]" />
                ) : (
                  <span>·</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans border-t border-slate-100 dark:border-slate-800 pt-2.5">
        🔥 ধারাবাহিকভাবে প্রতিদিন চর্চা করলে শব্দ ও বাক্য স্মৃতিতে স্থায়ী হয়।
      </p>
    </Card>
  );
};
