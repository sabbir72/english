import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Dumbbell,
  Flame,
  CheckCircle2,
  Volume2,
  Sparkles,
  Award,
} from 'lucide-react';
import { speakText } from '../../utils/speech';

export interface HeroBannerProps {
  onStartLearning: () => void;
  onPracticeNow: () => void;
  streak?: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartLearning,
  onPracticeNow,
  streak = 7,
}) => {
  return (
    <div
      id="hero-banner"
      className="relative overflow-hidden rounded-2xl border border-indigo-100/90 bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/30 p-6 sm:p-8 md:p-10 shadow-[0_2px_10px_rgba(15,23,42,0.03)] dark:border-slate-800 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-indigo-950/20 transition-all"
    >
      {/* Very subtle ambient glows */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl dark:bg-indigo-500/10" />
      <div className="pointer-events-none absolute -left-8 -bottom-8 h-56 w-56 rounded-full bg-sky-500/5 blur-3xl dark:bg-sky-500/10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Headline, Subtitle, CTAs */}
        <div className="lg:col-span-7 space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-indigo-900 shadow-2xs dark:border-indigo-900/60 dark:bg-[#1E293B]/90 dark:text-indigo-200">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-sans">Smart English for Bangla Speakers</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium font-bangla">সহজ ও কার্যকর</span>
          </div>

          {/* Exact Headline: Learn English Smarter. Speak Better. */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#0F172A] dark:text-white leading-[1.18]">
            Learn English Smarter.{' '}
            <span className="text-[#4F46E5] dark:text-[#818CF8]">
              Speak Better.
            </span>
          </h1>

          {/* Exact Subtitle: Practice vocabulary, grammar, sentences, reading and real conversations every day. */}
          <p className="text-base sm:text-lg text-[#475569] dark:text-slate-300 leading-relaxed max-w-xl">
            Practice vocabulary, grammar, sentences, reading and real conversations every day.
          </p>

          {/* CTAs: Start Learning (Primary) & Practice Now (Secondary) */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Primary Button */}
            <button
              onClick={onStartLearning}
              className="inline-flex items-center gap-2.5 rounded-xl bg-[#4F46E5] px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#3730A3] hover:shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Start Learning</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={onPracticeNow}
              className="inline-flex items-center gap-2.5 rounded-xl border border-indigo-200 bg-white px-6 py-3.5 text-sm font-bold text-[#4F46E5] shadow-xs hover:bg-indigo-50/60 hover:border-indigo-300 dark:border-indigo-900/60 dark:bg-[#1E293B] dark:text-indigo-400 dark:hover:bg-slate-800 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <Dumbbell className="h-4 w-4 text-[#4F46E5] dark:text-indigo-400" />
              <span>Practice Now</span>
            </button>
          </div>

          {/* Small Feature Checklist */}
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
              <span className="font-bangla">বাংলা অর্থ ও সহজ উচ্চারণ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
              <span className="font-bangla">বাক্য গঠন ও রুটিন</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
              <span className="font-bangla">দৈনিক স্পিকিং প্র্যাকটিস</span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Vocabulary Card, Daily Streak Card, Progress Indicator */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* 1. Daily Streak Card */}
          <div className="rounded-2xl border border-amber-200/80 bg-white/95 p-4 shadow-sm dark:border-amber-900/40 dark:bg-[#1E293B] transition-all hover:border-amber-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <Flame className="h-5 w-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-[#0F172A] dark:text-white">
                      {streak} Day Streak
                    </span>
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-bangla">
                      চলমান
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] dark:text-slate-400 font-bangla">
                    অসাধারণ ধারাবাহিকতা! প্রতিদিন ১৫ মিনিট শিখুন
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-amber-600 dark:text-amber-400">🔥 +50 XP</span>
              </div>
            </div>
          </div>

          {/* 2. Floating Vocabulary Card: "Confident / আত্মবিশ্বাসী" */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#1E293B] transition-all hover:border-indigo-300 dark:hover:border-indigo-600/40">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-[#0F172A] dark:text-white">Confident</span>
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-[#4F46E5] dark:bg-indigo-950/70 dark:text-indigo-300">
                    adjective
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono text-slate-400">/ˈkɒnfɪdənt/</span>
                  <span className="text-xs font-bold text-[#10B981] dark:text-emerald-400 font-bangla">
                    উচ্চারণ: কনফিডেন্ট
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-[#475569] dark:text-slate-300 font-bangla">
                  বাংলা: <span className="font-bold text-[#4F46E5] dark:text-indigo-400">আত্মবিশ্বাসী / নিঃসংশয়</span>
                </p>
              </div>

              <button
                onClick={() => speakText('Confident', 'US')}
                className="rounded-xl p-2 text-[#4F46E5] hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-slate-800 transition-colors"
                title="উচ্চারণ শুনুন"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>

            {/* Sentence usage preview */}
            <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>&ldquo;I feel confident speaking English.&rdquo;</span>
              <button
                onClick={() => speakText('I feel confident speaking English.', 'US')}
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-semibold"
              >
                শুনুন
              </button>
            </div>
          </div>

          {/* 3. Progress Indicator Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-[#1E293B]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46E5] dark:text-indigo-400">
                  <Award className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A] dark:text-white">
                  Daily Learning Goal
                </span>
              </div>
              <span className="text-xs font-black text-[#4F46E5] dark:text-indigo-400">
                80% Completed
              </span>
            </div>

            {/* Simple Horizontal Progress Bar */}
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#4F46E5] via-[#0EA5E9] to-[#10B981] transition-all duration-500"
                style={{ width: '80%' }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <span>৮/১০ টি শব্দ সম্পন্ন</span>
              <span>৪/৫ টি বাক্য প্র্যাকটিস</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
