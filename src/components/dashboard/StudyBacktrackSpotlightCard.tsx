import React, { useState, useEffect } from 'react';
import {
  History,
  Calendar,
  CheckCircle2,
  ListTodo,
  ArrowRight,
  Sparkles,
  Flame,
  Plus,
  Volume2,
  Clock,
  Target,
} from 'lucide-react';
import {
  getStoredStudyLogs,
  getStoredNextQueue,
  getTodayDateStr,
  getYesterdayDateStr,
} from '../../utils/backtrackStorage';
import { speakText } from '../../utils/speech';

interface StudyBacktrackSpotlightCardProps {
  onOpenBacktrack: () => void;
}

export const StudyBacktrackSpotlightCard: React.FC<StudyBacktrackSpotlightCardProps> = ({
  onOpenBacktrack,
}) => {
  const [todayItems, setTodayItems] = useState<any[]>([]);
  const [yesterdayItems, setYesterdayItems] = useState<any[]>([]);
  const [queueItems, setQueueItems] = useState<any[]>([]);

  useEffect(() => {
    const logs = getStoredStudyLogs();
    const queue = getStoredNextQueue();

    const todayStr = getTodayDateStr();
    const yestStr = getYesterdayDateStr();

    const todayLog = logs.find((l) => l.date === todayStr);
    const yestLog = logs.find((l) => l.date === yestStr);

    if (todayLog) setTodayItems(todayLog.items);
    if (yestLog) setYesterdayItems(yestLog.items);
    setQueueItems(queue);
  }, []);

  return (
    <div
      id="study-backtrack-spotlight-card"
      className="relative overflow-hidden rounded-3xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/90 via-white to-sky-50/60 p-5 sm:p-6 shadow-xs dark:border-indigo-900/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left header */}
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100/80 px-2.5 py-0.5 text-[11px] font-bold text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
            <History className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>নতুন ফিচার: দৈনিক ব্যাকট্র্যাক ও কিউ</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>আজকের পড়ার ব্যাকট্র্যাক ও কালকের স্টাডি কিউ</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
            গতকাল আপনি কোন শব্দগুলো পড়েছেন তার রেকর্ড সংরক্ষণ রয়েছে, যাতে আজকে অপ্রয়োজনীয় পুনরাবৃত্তি ছাড়াই নতুন কিছু শিখতে পারেন এবং আগামীকালের পড়ার কিউ সাজিয়ে রাখতে পারেন।
          </p>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-auto">
          <button
            onClick={onOpenBacktrack}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <span>সম্পূর্ণ ব্যাকট্র্যাক ও কিউ দেখুন</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* 3 Interactive Highlight Strips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        {/* 1. Today's Studied Items */}
        <div
          onClick={onOpenBacktrack}
          className="cursor-pointer rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 p-3.5 shadow-2xs hover:border-indigo-400 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>আজকের পড়া সম্পন্ন ({todayItems.length}টি)</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Today</span>
          </div>
          <div className="space-y-1">
            {todayItems.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate pr-2">
                  • {item.title}
                </span>
                <span className="text-[10px] text-slate-400 shrink-0">{item.timeString || 'আজ'}</span>
              </div>
            ))}
            {todayItems.length > 2 && (
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold block pt-0.5">
                + আরও {todayItems.length - 2}টি আইটেম বিস্তারিত দেখুন
              </span>
            )}
          </div>
        </div>

        {/* 2. Yesterday's Studied Record */}
        <div
          onClick={onOpenBacktrack}
          className="cursor-pointer rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 p-3.5 shadow-2xs hover:border-amber-400 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>গতকালকের পড়ার রেকর্ড ({yesterdayItems.length}টি)</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Yesterday</span>
          </div>
          <div className="space-y-1">
            {yesterdayItems.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate pr-2">
                  • {item.title}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">আয়ত্তকৃত</span>
              </div>
            ))}
            {yesterdayItems.length > 2 && (
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block pt-0.5">
                + আরও {yesterdayItems.length - 2}টি অতীতের রেকর্ড দেখুন
              </span>
            )}
          </div>
        </div>

        {/* 3. Tomorrow's Next Queue */}
        <div
          onClick={onOpenBacktrack}
          className="cursor-pointer rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 p-3.5 shadow-2xs hover:border-emerald-400 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
              <ListTodo className="h-3.5 w-3.5" />
              <span>পরবর্তী স্টাডি কিউ ({queueItems.length}টি)</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Tomorrow</span>
          </div>
          <div className="space-y-1">
            {queueItems.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate pr-2">
                  • {item.title}
                </span>
                <span className="text-[10px] text-rose-500 font-bold shrink-0">
                  {item.priority === 'high' ? 'High' : 'Normal'}
                </span>
              </div>
            ))}
            {queueItems.length > 2 && (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block pt-0.5">
                + আরও {queueItems.length - 2}টি কিউ তালিকাভুক্ত
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
