import React from 'react';
import {
  Sparkles,
  BookOpen,
  Layers,
  Wand2,
  Headphones,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame,
  Zap,
} from 'lucide-react';
import { NavigationTab, LanguageMode } from '../../types';

export interface ModernStudyStripProps {
  onNavigate: (tab: NavigationTab | string) => void;
  onOpenRoutine: () => void;
  languageMode?: LanguageMode;
}

export const ModernStudyStrip: React.FC<ModernStudyStripProps> = ({
  onNavigate,
  onOpenRoutine,
  languageMode = 'bn',
}) => {
  const isBn = languageMode === 'bn';

  const shortcuts = [
    {
      id: 'smart-book',
      badge: 'বইয়ের পাতা',
      title: '১০০ পাতার বই',
      subtitle: 'গল্প ও স্মার্ট শব্দ',
      icon: <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
      color: 'bg-indigo-50 hover:bg-indigo-100/70 border-indigo-200/80 text-indigo-950 dark:bg-indigo-950/40 dark:border-indigo-800/60 dark:text-indigo-200',
    },
    {
      id: 'oxford-3000',
      badge: 'পেজিনেশন',
      title: '৩০০০ স্পেশাল শব্দ',
      subtitle: 'CEFR A1-B2 লেভেল',
      icon: <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
      color: 'bg-emerald-50 hover:bg-emerald-100/70 border-emerald-200/80 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800/60 dark:text-emerald-200',
    },
    {
      id: 'builder',
      badge: '৫টি ব্লক',
      title: 'বাক্য নির্মাতা',
      subtitle: 'নিজের বাক্য সাজান',
      icon: <Wand2 className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
      color: 'bg-amber-50 hover:bg-amber-100/70 border-amber-200/80 text-amber-950 dark:bg-amber-950/40 dark:border-amber-800/60 dark:text-amber-200',
    },
    {
      id: 'book',
      badge: '৫০ অধ্যায়',
      title: 'স্পোকেন বই',
      subtitle: 'আগের মূল বই',
      icon: <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />,
      color: 'bg-purple-50 hover:bg-purple-100/70 border-purple-200/80 text-purple-950 dark:bg-purple-950/40 dark:border-purple-800/60 dark:text-purple-200',
    },
    {
      id: 'reading',
      badge: 'অডিও রিডিং',
      title: 'রিডিং বুক',
      subtitle: 'অর্থসহ গল্প পাঠ',
      icon: <Headphones className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
      color: 'bg-sky-50 hover:bg-sky-100/70 border-sky-200/80 text-sky-950 dark:bg-sky-950/40 dark:border-sky-800/60 dark:text-sky-200',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#1E293B] p-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Zap className="h-3.5 w-3.5" />
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white">
            {isBn ? 'কুইক স্টাডি শর্টকাট' : 'Quick Study Shortcuts'}
          </h3>
          <span className="text-xs text-slate-400 hidden md:inline">
            • সরাসরি ক্লিক করে অনুশীলন শুরু করুন
          </span>
        </div>

        <button
          onClick={onOpenRoutine}
          className="self-start sm:self-auto text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <Clock className="h-3.5 w-3.5" />
          <span>দৈনিক ১৫ মিনিট রুটিন চার্ট খুলুন</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {shortcuts.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`group text-left p-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer ${item.color}`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="p-1 rounded-lg bg-white/80 dark:bg-slate-800/80 shadow-2xs">
                {item.icon}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-white/70 dark:bg-slate-800/80">
                {item.badge}
              </span>
            </div>
            <div className="text-xs font-black truncate block">
              {item.title}
            </div>
            <div className="text-[11px] opacity-75 truncate block mt-0.5 font-sans">
              {item.subtitle}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
