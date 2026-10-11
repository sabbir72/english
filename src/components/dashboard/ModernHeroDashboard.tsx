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
  activeLanguage?: 'english' | 'arabic' | 'japanese';
  onSelectLanguage?: (lang: 'english' | 'arabic' | 'japanese') => void;
}

export const ModernHeroDashboard: React.FC<ModernHeroDashboardProps> = ({
  profile,
  progress,
  onNavigate,
  onOpenRoutine,
  languageMode = 'bn',
  streakCount = 7,
  activeLanguage = 'english',
  onSelectLanguage,
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

  // Dynamic curated daily word & sentence based on activeLanguage
  const languageContent = {
    english: {
      langName: 'English (ইংরেজি)',
      badge: 'Boli Spoken English',
      flag: '🇬🇧',
      accentColor: 'indigo',
      gradient: 'from-indigo-600 to-indigo-700',
      borderAccent: 'border-indigo-200/90 dark:border-indigo-800/80',
      bgGlow: 'bg-indigo-500/10',
      pitchTitle: isBn ? 'ইংরেজি ফ্লুয়েন্সি অর্জন করুন' : 'Master Real-World English',
      pitchDesc: isBn
        ? 'প্রতিদিন মাত্র ১৫ মিনিটে বাস্তব জীবনের ইংরেজি বাক্য, সঠিক উচ্চারণ ও ৩০০০ প্রয়োজনীয় শব্দে আত্মবিশ্বাসী হয়ে উঠুন।'
        : 'Build effortless English fluency with practical sentence patterns, native pronunciation, and essential vocabulary in just 15 minutes a day.',
      featuredWord: 'Consistent',
      featuredWordIpa: '/kənˈsɪstənt/',
      featuredWordBnPronunciation: 'কনসিসটেন্ট',
      featuredMeaning: 'ধারাবাহিক / অবিচল',
      featuredSentence: 'Consistent structured practice empowers professionals to communicate with clarity and confidence.',
      featuredSentencePronunciationBn: 'কনসিসটেন্ট স্ট্রাকচার্ড প্র্যাকটিস এমপাওয়ার্স প্রফেশনালস টু কমিউনিকেট উইথ ক্ল্যারিটি অ্যান্ড কনফিডেন্স।',
      featuredSentenceBn: 'ধারাবাহিক ও সুনির্দিষ্ট অনুশীলন পেশাজীবীদের আত্মবিশ্বাস ও স্পষ্টতার সাথে কথা বলতে সক্ষম করে।',
      speakLocale: 'en-US',
      audioRate: 0.95,
      interestTips: [
        { title: '১ কাঠামোর ম্যাজিক', desc: 'একটি বাক্য কাঠামো শিখে প্রতিদিন ৫০+ নতুন বাস্তব বাক্য সাজান।' },
        { title: 'প্রতিটি শব্দের উচ্চারণ', desc: 'ইংরেজি অক্ষরের সাথে সুস্পষ্ট বাংলা উচ্চারণ ও ক্লিক-টু-লিসেন অডিও।' },
        { title: 'দৈনন্দিন লাইফ হ্যাক', desc: 'অফিস, ট্রাভেল ও আড্ডার প্রয়োজনীয় সব বাস্তব বাক্য।' },
      ],
      primaryCta: {
        label: isBn ? '১০০ পাতার বই পড়ুন' : 'Open 100-Page Book',
        target: 'smart-book',
        icon: 'book',
      },
      secondaryCta: {
        label: isBn ? '৩০০০ স্পেশাল শব্দ' : 'Oxford 3000 Words',
        target: 'oxford-3000',
      },
    },
    arabic: {
      langName: 'العربية (আরবি)',
      badge: 'Boli Arabic Studio',
      flag: '🇸🇦',
      accentColor: 'emerald',
      gradient: 'from-emerald-600 to-teal-700',
      borderAccent: 'border-emerald-200/90 dark:border-emerald-800/80',
      bgGlow: 'bg-emerald-500/10',
      pitchTitle: isBn ? 'সহজ নিয়মে আরবি শিখুন' : 'Learn Arabic with Ease',
      pitchDesc: isBn
        ? 'কোরআনিক অর্থবোধ এবং মধ্যপ্রাচ্যে কথা বলার জন্য বিশুদ্ধ উচ্চারণ (মাখরাজ), নিত্যদিনের ডায়লগ ও ২৮টি হরফের চমৎকার সহজ গাইড।'
        : 'Master Arabic alphabet with authentic pronunciation, practical expat dialogues, and Quranic root vocabulary made super friendly.',
      featuredWord: 'شُكْرًا جَزِيلًا',
      featuredWordIpa: 'Shukran Jazeelan',
      featuredWordBnPronunciation: 'শুকরান জাযিলান',
      featuredMeaning: 'আপনাকে অনেক ধন্যবাদ (Thank you very much)',
      featuredSentence: 'كَيْفَ حَالُكَ الْيَوْمَ؟ أَنَا بِخَيْرٍ، وَالْحَمْدُ لِلَّهِ.',
      featuredSentencePronunciationBn: 'কাইফা হালুকা আল-ইয়াওম? আনা বিখাইরিন, ওয়ালহামদুলিল্লাহ।',
      featuredSentenceBn: 'আজ আপনি কেমন আছেন? আলহামদুলিল্লাহ, আমি ভালো আছি।',
      speakLocale: 'ar-SA',
      audioRate: 0.85,
      interestTips: [
        { title: '২৮টি হরফের সঠিক মাখরাজ', desc: 'হরকতের নিয়ম ও বাংলা ধ্বনি নির্দেশিকা দিয়ে সহজে হরফ চেনা।' },
        { title: 'প্রবাসীদের বাস্তব ডায়লগ', desc: 'বিমানবন্দর, বাজার, হাসপাতাল ও কর্মক্ষেত্রে দরকারি সব বাক্য।' },
        { title: 'বাংলা উচ্চারণ গ্যারান্টি', desc: 'প্রতিটি আরবি বাক্যের নিচে বড় অক্ষরে বাংলা উচ্চারণ যোগ করা।' },
      ],
      primaryCta: {
        label: isBn ? 'সম্পূর্ণ আরবি স্টুডিও' : 'Open Arabic Studio',
        target: 'arabic',
        icon: 'globe',
      },
      secondaryCta: {
        label: isBn ? '২৮ হরফ সাউন্ডবোর্ড' : '28 Alphabet Chart',
        target: 'arabic',
      },
    },
    japanese: {
      langName: '日本語 (জাপানি)',
      badge: 'Boli Japanese Studio',
      flag: '🇯🇵',
      accentColor: 'rose',
      gradient: 'from-rose-600 to-amber-700',
      borderAccent: 'border-rose-200/90 dark:border-rose-800/80',
      bgGlow: 'bg-rose-500/10',
      pitchTitle: isBn ? 'অ্যানিমে ও ক্যারিয়ার জাপানি' : 'Master Japanese & JLPT',
      pitchDesc: isBn
        ? 'হিরাগানা, কাতাকানা ও কাঞ্জি দিয়ে জাপানি ভাষা শুরু করুন সবচেয়ে সহজে। রোমাজি, বাংলা উচ্চারণ এবং শ্যাডোয়িং মাইক ল্যাব।'
        : 'Learn Japanese effortlessly through Hiragana, Katakana, JLPT N5 vocabulary, Romaji, and clear Bengali pronunciation.',
      featuredWord: 'ありがとうございます',
      featuredWordIpa: 'Arigatou gozaimasu',
      featuredWordBnPronunciation: 'আরিগাতো গোজাইমাস',
      featuredMeaning: 'আপনাকে অনেক ধন্যবাদ (Thank you very much)',
      featuredSentence: 'お元気ですか？ はい、元気です。',
      featuredSentencePronunciationBn: 'ওগেনকি দেস কা? হাই, গেনকি দেস।',
      featuredSentenceBn: 'আপনি কেমন আছেন? হ্যাঁ, আমি ভালো আছি।',
      speakLocale: 'ja-JP',
      audioRate: 0.9,
      interestTips: [
        { title: 'হিরাগানা ও কাতাকানা', desc: 'বর্ণমালার নিখুঁত ছক, বাংলা উচ্চারণ ও ক্লিক করলেই জাপানি অডিও।' },
        { title: 'শ্যাডোয়িং ও অ্যানিমে কথা', desc: 'শুনে মুখে রিপিট করার সহজ টেকনিকে কথা বলা আয়ত্ত করুন।' },
        { title: 'JLPT N5 বেসিক শব্দ', desc: 'প্রতিদিনের ব্যবহার্য ১০০+ শব্দ ও বাস্তব জীবনযাপনের বাক্য।' },
      ],
      primaryCta: {
        label: isBn ? 'সম্পূর্ণ জাপানি স্টুডিও' : 'Open Japanese Studio',
        target: 'japanese',
        icon: 'sparkles',
      },
      secondaryCta: {
        label: isBn ? 'হিরাগানা বর্ণমালা' : 'Kana Lab',
        target: 'japanese',
      },
    },
  };

  const currentLang = languageContent[activeLanguage] || languageContent.english;

  const handleSpeakWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlayingAudio(true);
    speakText(currentLang.featuredWord, currentLang.speakLocale, currentLang.audioRate);
    setTimeout(() => setIsPlayingAudio(false), 1400);
  };

  const handleSpeakSentence = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlayingAudio(true);
    speakText(currentLang.featuredSentence, currentLang.speakLocale, currentLang.audioRate);
    setTimeout(() => setIsPlayingAudio(false), 2600);
  };

  const targetDailyGoal = 10;
  const todayDone = 8;
  const progressPercent = Math.min(100, Math.round((todayDone / targetDailyGoal) * 100));

  return (
    <div className={`relative overflow-hidden rounded-3xl border ${currentLang.borderAccent} bg-gradient-to-br from-white via-slate-50/70 to-slate-100/50 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 lg:p-9 transition-all`}>
      {/* Background visual accents */}
      <div className={`pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full ${currentLang.bgGlow} blur-3xl`} />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/15" />
      <div className="pointer-events-none absolute right-1/3 bottom-0 h-48 w-48 rounded-full bg-sky-500/5 blur-2xl" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
        {/* Left Column: Greeting, Pitch, Main CTAs, Quick Badges */}
        <div className="lg:col-span-7 space-y-5">
          {/* Top Pill with Level & Daily Habit badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r ${currentLang.gradient} text-white shadow-xs`}>
              <span className="text-sm">{currentLang.flag}</span>
              <span>{currentLang.badge}</span>
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
            <h2 className="mt-1 text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
              {currentLang.pitchTitle}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-sans">
              {currentLang.pitchDesc}
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onNavigate(currentLang.primaryCta.target)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r ${currentLang.gradient} text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer`}
            >
              <BookOpen className="h-4 w-4" />
              <span>{currentLang.primaryCta.label}</span>
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
              onClick={() => onNavigate(currentLang.secondaryCta.target)}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-bold text-sm hover:bg-emerald-100/80 transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>{currentLang.secondaryCta.label}</span>
            </button>
          </div>

          {/* 3 Interactive Learning Interest Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            {currentLang.interestTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs text-left"
              >
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{tip.title}</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-bangla leading-snug">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Interactive Spotlight Card (Smart Word + Mini Daily Goal) */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* 1. Daily Smart Word Spotlight */}
          <div className={`rounded-2xl border ${currentLang.borderAccent} bg-white/95 dark:bg-[#1E293B] p-4.5 shadow-sm transition-all`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 font-sans">
                    আজকের ফোকাস শব্দ ({currentLang.langName})
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">#DailyWord</span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
                    {currentLang.featuredWord}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{currentLang.featuredWordIpa}</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-bangla bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-800/60">
                    উচ্চারণ: {currentLang.featuredWordBnPronunciation}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-bangla">
                    অর্থ: {currentLang.featuredMeaning}
                  </span>
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
                <span className="italic font-medium text-slate-800 dark:text-slate-200">
                  &ldquo;{currentLang.featuredSentence}&rdquo;
                </span>
                <button
                  onClick={handleSpeakSentence}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold shrink-0 ml-2 text-[11px] cursor-pointer"
                >
                  শুনুন 🔊
                </button>
              </div>
              <p className="mt-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-bold font-bangla">
                বাংলা উচ্চারণ: {currentLang.featuredSentencePronunciationBn}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600 dark:text-slate-400 font-bangla">
                বাংলা অর্থ: {currentLang.featuredSentenceBn}
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
