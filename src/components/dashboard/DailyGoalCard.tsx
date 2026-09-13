import React from 'react';
import { Target, Clock, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';
import { UserProgress } from '../../types';

export interface DailyGoalCardProps {
  progress: UserProgress;
  onNavigateToTab?: (tab: string) => void;
}

export const DailyGoalCard: React.FC<DailyGoalCardProps> = ({ progress }) => {
  const dailyGoalPercent = 80;
  const weeklyPracticePercent = 70;

  // Circular progress math (radius = 32, circumference = 2 * PI * 32 ≈ 201)
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (dailyGoalPercent / 100) * circumference;

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-[#1E293B] space-y-5 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5] dark:bg-indigo-950/60 dark:text-indigo-400">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-[#0F172A] dark:text-white leading-tight">
              Progress Overview
            </h3>
            <span className="text-[11px] text-[#475569] dark:text-slate-400 font-bangla">
              দৈনিক ও সাপ্তাহিক অগ্রগতি
            </span>
          </div>
        </div>

        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#10B981] dark:bg-emerald-950/60 dark:text-emerald-300 font-sans">
          On Track
        </span>
      </div>

      {/* Modern Circular Progress Highlight */}
      <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
            {/* Background Circle */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-slate-200 dark:text-slate-700"
            />
            {/* Progress Stroke */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="text-[#4F46E5] dark:text-[#818CF8] transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-base font-black text-[#0F172A] dark:text-white">
              {dailyGoalPercent}%
            </span>
            <span className="text-[9px] font-bold text-[#475569] dark:text-slate-400 -mt-0.5">
              DONE
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-1">
          <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">
            Daily Goal Status
          </h4>
          <p className="text-xs text-[#475569] dark:text-slate-400 font-bangla leading-relaxed">
            ৮/১০ টি শব্দ এবং ৪/৫ টি বাক্য অনুশীলন সম্পন্ন হয়েছে।
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#10B981] pt-0.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>আর মাত্র ২টি শব্দ বাকি</span>
          </div>
        </div>
      </div>

      {/* Simple Horizontal Progress Bars */}
      <div className="space-y-3.5 pt-1">
        {/* Daily Goal Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#4F46E5] dark:text-indigo-400" />
              <span>Daily Goal</span>
            </span>
            <span className="font-bold text-[#4F46E5] dark:text-indigo-400">
              {dailyGoalPercent}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-[#4F46E5] transition-all duration-500"
              style={{ width: `${dailyGoalPercent}%` }}
            />
          </div>
        </div>

        {/* Weekly Practice Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#0EA5E9] dark:text-sky-400" />
              <span>Weekly Practice</span>
            </span>
            <span className="font-bold text-[#0EA5E9] dark:text-sky-400">
              {weeklyPracticePercent}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-[#0EA5E9] transition-all duration-500"
              style={{ width: `${weeklyPracticePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2 Compact Metric Chips */}
      <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-[11px] text-[#475569] dark:text-slate-400 block">Total XP</span>
          <span className="text-sm font-black text-amber-600 dark:text-amber-400 mt-0.5 block">
            +{progress.xp || 140} XP
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-[11px] text-[#475569] dark:text-slate-400 block">Current Level</span>
          <span className="text-sm font-black text-[#4F46E5] dark:text-indigo-400 mt-0.5 block">
            Beginner A1
          </span>
        </div>
      </div>
    </div>
  );
};
