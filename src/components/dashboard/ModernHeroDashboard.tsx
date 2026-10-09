import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Volume2,
  CheckCircle2,
  Dumbbell,
  Play,
  Flame,
  Zap,
  Target,
  Clock,
  Compass,
  Trophy,
} from 'lucide-react';
import { speakText, stopSpeaking } from '../../utils/speech';
import { UserProfile, UserProgress, NavigationTab, LanguageMode } from '../../types';

export interface ModernHeroDashboardProps {
  profile: UserProfile;
  progress: UserProgress;
  onNavigate: (tab: NavigationTab | string) => void;
  onOpenRoutine: () => void;
  languageMode?: LanguageMode;
  streakCount: number;
}

export const ModernHeroDashboard: React.FC<ModernHeroDashboardProps> = ({
  profile,
  progress,
  onNavigate,
  onOpenRoutine,
  languageMode = 'bn',
  streakCount = 7,
}) => {
  const isBn = languageMode === 'bn';

  // Greeting by hour
  const hour = new Date().getHours();
  let greetingEn = 'Good morning';
  let greetingBn = 'শুভ সকাল';
  if (hour >= 12 && hour < 17) {
    greetingEn = 'Good afternoon';
    greetingBn = 'শুভ দুপুর';
  } else if (hour >= 17) {
    greetingEn = 'Good evening';
    greetingBn = 'শুভ সন্ধ্যা';
  }

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const featuredWord = 'Consistent';
  const featuredMeaning = 'ধারাবাহিক / অবিচল';
  const featuredSentence = 'Consistent practice makes English natural.';
  const featuredSentenceBn = 'ধারাবাহিক অনুশীলনে ইংরেজি বলা সহজ ও স্বতঃস্ফূর্ত হয়।';

  const handleSpeakWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlayingAudio(true);
    speakText(featuredWord, 'en-US', 0.95);
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  const handleSpeakSentence = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlayingAudio(true);
    speakText(featuredSentence, 'en-US', 0.95);
    setTimeout(() => setIsPlayingAudio(false), 2400);
  };

  const wordsLearned = progress.vocabularyLearned || 128;
  const targetDailyGoal = 10;
  const todayDone = 8;
  const progressPercent = Math.min(100, Math.round((todayDone / targetDailyGoal) * 100));

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-gradient-to-br from-white via-indigo-50/20 to-emerald-50/25 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 lg:p-9 transition-all">
      {/* Background visual accents */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/15" />
      <div className="pointer-events-none absolute right-1/3 bottom-0 h-48 w-48 rounded-full bg-sky-500/5 blur-2xl" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
        {/* Left Column: Greeting, Big Pitch, Main CTAs, Quick Badges */}
        <div className="lg:col-span-7 space-y-5">
          {/* Top Pill with Level & Daily Habit badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Boli Spoken English</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 font-bangla">
              <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>{streakCount} দিন একটানা</span>
            </span>

            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans hidden sm:inline">
              Level: <strong className="text-slate-800 dark:text-slate-200 font-bold">{profile.level || 'Beginner'}</strong>
            </span>
          </div>

          {/* Dynamic User Welcome */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.2]">
              <span>{isBn ? greetingBn : greetingEn}</span>
              {profile.name ? (
                <span className="text-indigo-600 dark:text-indigo-400">, {profile.name}!</span>
              ) : (
                <span>!</span>
              )}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-sans">
              {isBn ? (
                <>
                  প্রতিদিন মাত্র <strong className="text-indigo-600 dark:text-indigo-400 font-bold">১৫ মিনিটে</strong> বাস্তব জীবনের ইংরেজি বাক্য, সঠিক উচ্চারণ ও ৩০০০ প্রয়োজনীয় শব্দে ফ্লুয়েন্সি অর্জন করুন।
                </>
              ) : (
                <>
                  Build real-world fluency with practical sentence patterns, native pronunciation, and essential vocabulary in just 15 minutes a day.
                </>
              )}
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onNavigate('smart-book')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold text-sm shadow-md hover:from-indigo-700 hover:to-indigo-800 hover:shadow-indigo-500/25 hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>{isBn ? '১০০ পাতার বই পড়ুন' : 'Open 100-Page Book'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenRoutine}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200/90 dark:border-indigo-800/80 font-bold text-sm shadow-xs hover:bg-indigo-50/70 dark:hover:bg-slate-700 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <Clock className="h-4 w-4 text-indigo-500" />
              <span>{isBn ? 'দৈনিক ১৫ মিনিট রুটিন' : '15-Min Daily Routine'}</span>
            </button>

            <button
              onClick={() => onNavigate('oxford-3000')}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-bold text-sm hover:bg-emerald-100/80 transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>{isBn ? '৩০০০ স্পেশাল শব্দ' : 'Oxford 3000 Words'}</span>
            </button>
          </div>

          {/* Quick Value Points */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>সহজ বাংলা উচ্চারণ ও ভাবার্থ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>১ কাঠামো দিয়ে ৫০+ বাক্য তৈরি</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>ক্লিক-টু-লিসেন অডিও উচ্চারণ</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Interactive Spotlight Card (Smart Word + Mini Daily Goal) */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* 1. Daily Smart Word Spotlight */}
          <div className="rounded-2xl border border-indigo-200/80 dark:border-slate-800 bg-white/95 dark:bg-[#1E293B] p-4.5 shadow-sm transition-all hover:border-indigo-300 dark:hover:border-indigo-600/50">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 font-sans">
                    আজকের ফোকাস শব্দ
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">#DailyWord</span>
                </div>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    {featuredWord}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">/kənˈsɪstənt/</span>
                </div>
                <div className="mt-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 font-bangla">
                  বাংলা অর্থ: {featuredMeaning}
                </div>
              </div>

              <button
                onClick={handleSpeakWord}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-indigo-600 text-white border-indigo-600 scale-105'
                    : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-100 hover:bg-indigo-100'
                }`}
                title="স্বাভাবিক উচ্চারণ শুনুন"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>

            {/* Sentence with audio */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="italic font-medium text-slate-700 dark:text-slate-300">
                  &ldquo;{featuredSentence}&rdquo;
                </span>
                <button
                  onClick={handleSpeakSentence}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold shrink-0 ml-2 text-[11px]"
                >
                  শুনুন
                </button>
              </div>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 font-bangla">
                {featuredSentenceBn}
              </p>
            </div>
          </div>

          {/* 2. Today's Progress Bar Mini Card */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#1E293B] p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Target className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  আজকের লক্ষ্য অগ্রগতি
                </span>
              </div>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                {progressPercent}% সম্পন্ন
              </span>
            </div>

            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>{todayDone} / {targetDailyGoal} টি শব্দ পড়া হয়েছে</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">+২০ XP অর্জন</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
