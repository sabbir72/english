import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  SpellCheck,
  GraduationCap,
  Layers,
  Headphones,
  Dumbbell,
  BarChart3,
  Bookmark,
  BookMarked,
  Settings2,
  ShieldCheck,
  Sparkles,
  Globe2,
  X,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Compass,
  Zap,
  Mic,
  Languages,
  History,
} from 'lucide-react';
import { NavigationTab, LanguageMode, AppLanguage } from '../types';

export interface SidebarProps {
  activeTab: NavigationTab | string;
  onSelectTab: (tab: NavigationTab | string) => void;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  languageMode?: LanguageMode;
  onToggleLanguage?: (lang?: LanguageMode) => void;
  selectedLanguage: AppLanguage;
  onSelectLanguage: (lang: AppLanguage) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItemConfig {
  id: string;
  label: string;
  labelBn: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  subLabel?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  mobileMenuOpen,
  onCloseMobileMenu,
  languageMode = 'bn',
  onToggleLanguage,
  selectedLanguage = 'english',
  onSelectLanguage,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const handleNav = (tabId: string) => {
    onSelectTab(tabId);
    onCloseMobileMenu();
  };

  // 1. Language-Specific Curated Nav Items
  const englishNavItems: NavItemConfig[] = [
    {
      id: 'home',
      label: 'Dashboard',
      labelBn: 'ড্যাশবোর্ড',
      icon: <LayoutDashboard className="h-4 w-4" />,
      badge: 'Main',
    },
    {
      id: 'learn',
      label: 'Methodology & Lessons',
      labelBn: 'পদ্ধতি ও মূল পাঠ',
      icon: <BookOpen className="h-4 w-4 text-emerald-500" />,
      badge: 'Core',
    },
    {
      id: 'vocabulary',
      label: 'Vocabulary Book',
      labelBn: 'শব্দভাণ্ডার বই',
      icon: <SpellCheck className="h-4 w-4 text-blue-500" />,
      badge: 'বইয়ের পাতা',
    },
    {
      id: 'oxford-3000',
      label: '3000 Special Vocab',
      labelBn: '৩০০০ স্পেশাল শব্দ',
      icon: <Sparkles className="h-4 w-4 text-amber-500" />,
      badge: 'Oxford 3000',
    },
    {
      id: 'builder',
      label: 'Sentence Builder',
      labelBn: 'বাক্য নির্মাতা',
      icon: <Layers className="h-4 w-4 text-violet-500" />,
      badge: 'ব্লক পদ্ধতি',
    },
    {
      id: 'smart-book',
      label: '100-Page Smart Book',
      labelBn: '১০০ পাতার স্মার্ট বই',
      icon: <BookOpen className="h-4 w-4 text-indigo-500" />,
      badge: '১০০ পৃষ্ঠা',
    },
    {
      id: 'book',
      label: 'Spoken English Book',
      labelBn: 'স্পোকেন বই (৫০ অধ্যায়)',
      icon: <BookMarked className="h-4 w-4 text-rose-500" />,
      badge: '৫০ অধ্যায়',
    },
    {
      id: 'reading',
      label: 'Reading & Shadowing',
      labelBn: 'রিডিং ও শ্যাডোয়িং স্টুডিও',
      icon: <Headphones className="h-4 w-4 text-teal-500" />,
      badge: '৪৮+ পাঠ',
    },
    {
      id: 'grammar',
      label: 'Grammar Guide',
      labelBn: 'সহজ ব্যাকরণ ও রুলস',
      icon: <GraduationCap className="h-4 w-4 text-cyan-500" />,
    },
    {
      id: 'practice',
      label: 'Quiz Practice',
      labelBn: 'কুইজ চর্চা ও টেস্ট',
      icon: <Dumbbell className="h-4 w-4 text-orange-500" />,
    },
    {
      id: 'saved',
      label: 'Saved Word Bank',
      labelBn: 'সংরক্ষিত শব্দভাণ্ডার',
      icon: <Bookmark className="h-4 w-4 text-pink-500" />,
    },
    {
      id: 'progress',
      label: 'Progress Tracker',
      labelBn: 'অগ্রগতি ট্র্যাকার',
      icon: <BarChart3 className="h-4 w-4 text-emerald-500" />,
    },
    {
      id: 'backtrack',
      label: 'Study Backtrack & Queue',
      labelBn: 'পড়ার ব্যাকট্র্যাক ও কিউ',
      icon: <History className="h-4 w-4 text-amber-500" />,
      badge: 'নতুন',
    },
    {
      id: 'habit',
      label: 'Daily Habit & Goals',
      labelBn: 'দৈনিক অভ্যাস ও লক্ষ্য',
      icon: <Settings2 className="h-4 w-4 text-slate-500" />,
    },
  ];

  const arabicNavItems: NavItemConfig[] = [
    {
      id: 'home',
      label: 'Arabic Dashboard',
      labelBn: 'আরবি ড্যাশবোর্ড (মূল পাতা)',
      icon: <LayoutDashboard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
      badge: '🇸🇦 আরবি',
    },
    {
      id: 'arabic-starter',
      label: 'Starter Roadmap',
      labelBn: 'শুরুর সহজ রুটম্যাপ',
      icon: <Compass className="h-4 w-4 text-teal-500" />,
      badge: 'সহজ শুরু',
    },
    {
      id: 'arabic-alphabet',
      label: 'Alphabet & Sounds',
      labelBn: '২৮ হরফ ও মাখরাজ',
      icon: <Sparkles className="h-4 w-4 text-amber-500" />,
      badge: '২৮ হরফ',
    },
    {
      id: 'arabic-vocab',
      label: 'Essential Vocab',
      labelBn: 'প্রয়োজনীয় শব্দভাণ্ডার',
      icon: <SpellCheck className="h-4 w-4 text-blue-500" />,
      badge: '১৫০+ শব্দ',
    },
    {
      id: 'arabic-dialogue',
      label: 'Daily & Expat Dialogue',
      labelBn: 'প্রবাস ও দৈনন্দিন সংলাপ',
      icon: <MessageSquare className="h-4 w-4 text-indigo-500" />,
      badge: 'কথোপকথন',
    },
    {
      id: 'arabic-quranic',
      label: 'Quranic Arabic',
      labelBn: 'কুরআনিক আরবি বাক্য',
      icon: <BookOpen className="h-4 w-4 text-emerald-500" />,
      badge: 'কুরআন',
    },
    {
      id: 'arabic-shadowing',
      label: 'Shadowing Studio',
      labelBn: 'শ্যাডোয়িং ও স্পিকিং ল্যাব',
      icon: <Mic className="h-4 w-4 text-rose-500" />,
      badge: 'রেকর্ডিং',
    },
    {
      id: 'arabic-situational',
      label: 'Situational Arabic',
      labelBn: 'জরুরি পরিস্থিতির বাক্য',
      icon: <Layers className="h-4 w-4 text-cyan-500" />,
      badge: 'পরিস্থিতি',
    },
    {
      id: 'arabic-grammar',
      label: 'Arabic Grammar',
      labelBn: 'সহজ ব্যাকরণ ও নাহু-সরফ',
      icon: <GraduationCap className="h-4 w-4 text-violet-500" />,
    },
    {
      id: 'arabic-numbers',
      label: 'Numbers 1-100',
      labelBn: 'আরবি সংখ্যা ১-১০০',
      icon: <Zap className="h-4 w-4 text-amber-500" />,
      badge: 'সংখ্যা',
    },
    {
      id: 'arabic',
      label: 'Full Arabic Studio',
      labelBn: 'আরবি পূর্ণাঙ্গ স্টুডিও',
      icon: <Globe2 className="h-4 w-4 text-teal-600" />,
      badge: 'ল্যাব',
    },
    {
      id: 'saved',
      label: 'Saved Words',
      labelBn: 'সংরক্ষিত শব্দভাণ্ডার',
      icon: <Bookmark className="h-4 w-4 text-pink-500" />,
    },
    {
      id: 'progress',
      label: 'Progress Tracker',
      labelBn: 'অগ্রগতি ট্র্যাকার',
      icon: <BarChart3 className="h-4 w-4 text-emerald-500" />,
    },
  ];

  const japaneseNavItems: NavItemConfig[] = [
    {
      id: 'home',
      label: 'Japanese Dashboard',
      labelBn: 'জাপানি ড্যাশবোর্ড (মূল পাতা)',
      icon: <LayoutDashboard className="h-4 w-4 text-rose-600 dark:text-rose-400" />,
      badge: '🇯🇵 নিহঙ্গো',
    },
    {
      id: 'japanese-starter',
      label: 'Starter Roadmap',
      labelBn: 'শুরুর সহজ গাইডলাইন',
      icon: <Compass className="h-4 w-4 text-amber-500" />,
      badge: 'রুটম্যাপ',
    },
    {
      id: 'japanese-kana',
      label: 'Hiragana & Katakana',
      labelBn: 'হিরাগানা ও কাতাকানা চার্ট',
      icon: <Sparkles className="h-4 w-4 text-rose-500" />,
      badge: '৯২ বর্ণ',
    },
    {
      id: 'japanese-vocab',
      label: 'JLPT N5/N4 Vocab',
      labelBn: 'দরকারি শব্দভাণ্ডার (N5)',
      icon: <SpellCheck className="h-4 w-4 text-blue-500" />,
      badge: 'JLPT N5',
    },
    {
      id: 'japanese-kanji',
      label: 'Kanji Basics',
      labelBn: 'কাঞ্জি শিক্ষা ও অর্থ',
      icon: <BookOpen className="h-4 w-4 text-indigo-500" />,
      badge: 'কাঞ্জি',
    },
    {
      id: 'japanese-anime',
      label: 'Anime & Pop Phrases',
      labelBn: 'অ্যানিমে ও জনপ্রিয় ডায়লগ',
      icon: <Sparkles className="h-4 w-4 text-amber-500" />,
      badge: 'অ্যানিমে',
    },
    {
      id: 'japanese-conversations',
      label: 'Daily Conversation',
      labelBn: 'দৈনন্দিন কথপোকথন',
      icon: <MessageSquare className="h-4 w-4 text-teal-500" />,
      badge: 'ডায়লগ',
    },
    {
      id: 'japanese-listening',
      label: 'Listening Trainer',
      labelBn: 'লিসেনিং ট্রেইনার',
      icon: <Headphones className="h-4 w-4 text-cyan-500" />,
      badge: 'অডিও ল্যাব',
    },
    {
      id: 'japanese-reading',
      label: 'Reading Stories',
      labelBn: 'রিডিং গল্প ও শ্যাডোয়িং',
      icon: <BookMarked className="h-4 w-4 text-violet-500" />,
      badge: 'গল্প',
    },
    {
      id: 'japanese-shadowing',
      label: 'Shadowing Studio',
      labelBn: 'শ্যাডোয়িং ও স্পিকিং ল্যাব',
      icon: <Mic className="h-4 w-4 text-rose-500" />,
      badge: 'রেকর্ডিং',
    },
    {
      id: 'japanese-grammar',
      label: 'Japanese Grammar',
      labelBn: 'ব্যাকরণ ও বাক্য প্যাটার্ন',
      icon: <GraduationCap className="h-4 w-4 text-emerald-500" />,
    },
    {
      id: 'japanese-numbers',
      label: 'Numbers & Counters',
      labelBn: 'জাপানি সংখ্যা ও গণনা',
      icon: <Zap className="h-4 w-4 text-amber-500" />,
      badge: 'গণনা',
    },
    {
      id: 'japanese-jlpt-quiz',
      label: 'JLPT Speed Quiz',
      labelBn: 'JLPT স্পিড কুইজ পরীক্ষা',
      icon: <Dumbbell className="h-4 w-4 text-orange-500" />,
      badge: 'কুইজ',
    },
    {
      id: 'saved',
      label: 'Saved Words',
      labelBn: 'সংরক্ষিত শব্দভাণ্ডার',
      icon: <Bookmark className="h-4 w-4 text-pink-500" />,
    },
    {
      id: 'progress',
      label: 'Progress Tracker',
      labelBn: 'অগ্রগতি ট্র্যাকার',
      icon: <BarChart3 className="h-4 w-4 text-emerald-500" />,
    },
  ];

  // Pick nav items based on user's active learning language
  const activeNavItems =
    selectedLanguage === 'arabic'
      ? arabicNavItems
      : selectedLanguage === 'japanese'
      ? japaneseNavItems
      : englishNavItems;

  const getLanguageHeaderInfo = () => {
    switch (selectedLanguage) {
      case 'arabic':
        return {
          title: 'আরবি শিক্ষা (العربية)',
          flag: '🇸🇦',
          accentColor: 'text-emerald-600 dark:text-emerald-400',
          badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      case 'japanese':
        return {
          title: 'জাপানি শিক্ষা (日本語)',
          flag: '🇯🇵',
          accentColor: 'text-rose-600 dark:text-rose-400',
          badgeBg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        };
      default:
        return {
          title: 'ইংরেজি স্পোকেন (English)',
          flag: '🇬🇧',
          accentColor: 'text-indigo-600 dark:text-indigo-400',
          badgeBg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
        };
    }
  };

  const currentLangInfo = getLanguageHeaderInfo();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity md:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Sidebar Container with Collapsible Desktop Width */}
      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 transform border-r border-slate-200/80 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out dark:border-slate-800/80 dark:bg-slate-900/95 md:static ${
          isCollapsed ? 'md:w-20' : 'md:w-72'
        } ${
          mobileMenuOpen ? 'w-72 max-w-[85vw] translate-x-0' : '-translate-x-full md:translate-x-0'
        } flex flex-col justify-between shadow-xl md:shadow-xs overflow-y-auto overflow-x-hidden`}
      >
        <div className="p-3 space-y-3.5">
          {/* Brand Identity / Header & Collapse Toggle */}
          <div className="flex items-center justify-between gap-1.5 px-1 py-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-cyan-500/40 bg-slate-950 shadow-md shadow-cyan-500/10 ring-2 ring-cyan-400/20 cursor-pointer"
                onClick={() => handleNav('home')}
                title="NextGen-LearnHub"
              >
                <img
                  src="/nextgen_logo.jpg"
                  alt="NextGen-LearnHub"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title only visible when NOT collapsed */}
              {!isCollapsed && (
                <div className="min-w-0">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight truncate">
                      NextGen<span className="text-cyan-600 dark:text-cyan-400">-LearnHub</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bangla mt-1 truncate">
                    স্মার্ট লার্নিং প্ল্যাটফর্ম
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Collapse / Expand Button */}
            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                className="hidden md:flex items-center justify-center h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer shrink-0"
                title={isCollapsed ? 'সাইডবার বড় করুন (Expand Sidebar)' : 'সাইডবার সংকুচিত করুন (Collapse Sidebar)'}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Close button on mobile */}
            {mobileMenuOpen && (
              <button
                type="button"
                onClick={onCloseMobileMenu}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-800 md:hidden cursor-pointer"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Interactive Language Selector Bar (English, Arabic, Japanese) */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-2 dark:border-slate-800 dark:bg-slate-800/40">
            {!isCollapsed ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1 font-bangla">
                    <Languages className="h-3 w-3 text-indigo-500" />
                    <span>শেখার ভাষা নির্বাচন:</span>
                  </span>
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border ${currentLangInfo.badgeBg}`}>
                    {currentLangInfo.flag} সক্রিয়
                  </span>
                </div>

                {/* 3 Language Switcher Pills */}
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => onSelectLanguage('english')}
                    className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                      selectedLanguage === 'english'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-black'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-800 font-bold'
                    }`}
                  >
                    <span className="text-base leading-none">🇬🇧</span>
                    <span className="text-[10px] mt-0.5 leading-tight">English</span>
                    <span className={`text-[8px] font-bangla ${selectedLanguage === 'english' ? 'text-indigo-200' : 'text-slate-400'}`}>ইংরেজি</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectLanguage('arabic')}
                    className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                      selectedLanguage === 'arabic'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-black'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-800 font-bold'
                    }`}
                  >
                    <span className="text-base leading-none">🇸🇦</span>
                    <span className="text-[10px] mt-0.5 leading-tight font-arabic">العربية</span>
                    <span className={`text-[8px] font-bangla ${selectedLanguage === 'arabic' ? 'text-emerald-200' : 'text-slate-400'}`}>আরবি</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectLanguage('japanese')}
                    className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                      selectedLanguage === 'japanese'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs font-black'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-slate-800 font-bold'
                    }`}
                  >
                    <span className="text-base leading-none">🇯🇵</span>
                    <span className="text-[10px] mt-0.5 leading-tight">日本語</span>
                    <span className={`text-[8px] font-bangla ${selectedLanguage === 'japanese' ? 'text-rose-200' : 'text-slate-400'}`}>জাপানি</span>
                  </button>
                </div>

                <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 font-bangla flex items-center gap-1 truncate">
                  <span>👉</span>
                  <span className="truncate">নিচের অপশনগুলো {currentLangInfo.title}-এর জন্য</span>
                </div>
              </div>
            ) : (
              /* Collapsed Mini Flag Bar */
              <div className="flex flex-col items-center gap-1.5 py-0.5">
                <button
                  type="button"
                  onClick={() => onSelectLanguage('english')}
                  className={`h-7 w-7 rounded-lg flex items-center justify-center text-sm transition-all cursor-pointer ${
                    selectedLanguage === 'english'
                      ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-400'
                      : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title="English (ইংরেজি)"
                >
                  🇬🇧
                </button>
                <button
                  type="button"
                  onClick={() => onSelectLanguage('arabic')}
                  className={`h-7 w-7 rounded-lg flex items-center justify-center text-sm transition-all cursor-pointer ${
                    selectedLanguage === 'arabic'
                      ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400'
                      : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title="العربية (Arabic - আরবি)"
                >
                  🇸🇦
                </button>
                <button
                  type="button"
                  onClick={() => onSelectLanguage('japanese')}
                  className={`h-7 w-7 rounded-lg flex items-center justify-center text-sm transition-all cursor-pointer ${
                    selectedLanguage === 'japanese'
                      ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-400'
                      : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title="日本語 (Japanese - জাপানি)"
                >
                  🇯🇵
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links (Specific to Selected Language) */}
          <nav className="space-y-1">
            {activeNavItems.map((item) => {
              const isActive =
                activeTab === item.id ||
                (item.id === 'builder' && activeTab === 'builder') ||
                (item.id === 'learn' && activeTab === 'learn');

              const isBn = languageMode === 'bn';
              const displayLabel = isBn ? item.labelBn : item.label;
              const subLabel = isBn ? item.label : item.labelBn;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  title={`${displayLabel} (${subLabel})`}
                  className={`relative flex w-full items-center rounded-xl transition-all cursor-pointer ${
                    isCollapsed
                      ? 'justify-center p-2.5'
                      : 'justify-between px-3 py-2 text-xs font-bold'
                  } ${
                    isActive
                      ? selectedLanguage === 'arabic'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300/80 shadow-2xs dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800/60 font-black'
                        : selectedLanguage === 'japanese'
                        ? 'bg-rose-50 text-rose-800 border border-rose-300/80 shadow-2xs dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-800/60 font-black'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60 font-black'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`shrink-0 ${
                        isActive
                          ? selectedLanguage === 'arabic'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : selectedLanguage === 'japanese'
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && <span className="truncate">{displayLabel}</span>}
                  </div>

                  {!isCollapsed && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.badge && (
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                            isActive
                              ? selectedLanguage === 'arabic'
                                ? 'bg-emerald-600 text-white'
                                : selectedLanguage === 'japanese'
                                ? 'bg-rose-600 text-white'
                                : 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-normal hidden lg:inline truncate max-w-[70px]">
                        {subLabel}
                      </span>
                    </div>
                  )}

                  {/* Dot indicator for badges when collapsed */}
                  {isCollapsed && item.badge && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900" />
                  )}
                </button>
              );
            })}

            {/* Quick Switch to Languages Hub */}
            <div className="pt-1 border-t border-slate-100 dark:border-slate-800/80">
              <button
                type="button"
                onClick={() => handleNav('languages')}
                title="আন্তর্জাতিক ভাষা হাব (All Languages Hub)"
                className={`flex w-full items-center rounded-xl transition-all cursor-pointer ${
                  isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2 text-xs font-bold'
                } ${
                  activeTab === 'languages'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Globe2 className="h-4 w-4 text-indigo-500 shrink-0" />
                  {!isCollapsed && (
                    <span className="truncate">আন্তর্জাতিক ভাষা হাব</span>
                  )}
                </div>
                {!isCollapsed && (
                  <span className="rounded-full px-1.5 py-0.2 text-[9px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    ৩টি ভাষা
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="border-t border-slate-100 p-3 dark:border-slate-800 space-y-2">
          {/* Quick UI Language Switcher widget */}
          {onToggleLanguage && !isCollapsed && (
            <div className="flex items-center justify-between px-2 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {languageMode === 'bn' ? 'ভাষা মোড:' : 'UI Mode:'}
              </span>
              <div className="flex items-center rounded-lg bg-white dark:bg-slate-900 p-0.5 border border-slate-200/80 dark:border-slate-700/80">
                <button
                  type="button"
                  onClick={() => onToggleLanguage('en')}
                  className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all cursor-pointer ${
                    languageMode === 'en'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  ENG
                </button>
                <button
                  type="button"
                  onClick={() => onToggleLanguage('bn')}
                  className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all cursor-pointer font-bangla ${
                    languageMode === 'bn'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  বাং
                </button>
              </div>
            </div>
          )}

          {!isCollapsed ? (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-2.5 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <div className="text-[11px]">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    {languageMode === 'bn' ? 'দৈনিক চর্চা' : 'Daily Fluency'}
                  </span>
                  <span className="text-slate-500 font-bangla">
                    {languageMode === 'bn' ? '১০ মিনিট বাকি' : '10 min left'}
                  </span>
                </div>
              </div>
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">75%</span>
            </div>
          ) : (
            <div className="flex justify-center" title="Daily Fluency: 75%">
              <div className="h-8 w-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-black border border-indigo-200/60 dark:border-indigo-800/60">
                75%
              </div>
            </div>
          )}

          {/* Admin Panel button */}
          <button
            onClick={() => handleNav('admin')}
            title="Admin Panel"
            className={`flex w-full items-center rounded-xl transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
            } text-[11px] font-semibold ${
              activeTab === 'admin'
                ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              {!isCollapsed && <span>Admin Panel</span>}
            </div>
          </button>

          {/* Bottom Collapse Toggle Button on desktop */}
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className={`hidden md:flex w-full items-center rounded-xl p-2 text-[11px] font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 transition-all cursor-pointer ${
                isCollapsed ? 'justify-center' : 'justify-between'
              }`}
              title={isCollapsed ? 'সাইডবার বড় করুন (Expand)' : 'সাইডবার সংকুচিত করুন (Collapse)'}
            >
              <div className="flex items-center gap-2">
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4 text-indigo-500" />
                ) : (
                  <>
                    <ChevronLeft className="h-4 w-4 text-indigo-500" />
                    <span>সাইডবার সংকুচিত করুন</span>
                  </>
                )}
              </div>
              {!isCollapsed && (
                <span className="text-[10px] text-slate-400 font-mono">Toggle</span>
              )}
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
