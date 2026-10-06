import React from 'react';
import {
  Flame,
  Search,
  Sun,
  Moon,
  Menu,
  ChevronRight,
  Sparkles,
  LayoutDashboard,
  BookOpen,
  Headphones,
  Dumbbell,
  BarChart3,
  Bookmark,
  Settings2,
  User,
  Layers,
  GraduationCap,
  SpellCheck,
  BookMarked,
} from 'lucide-react';
import { NavigationTab, LearnSubTab, UserProfile } from '../../types';

export interface NavbarProps {
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onSelectLearnSubTab?: (subTab: LearnSubTab) => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  streak?: number;
  profile: UserProfile;
  onOpenMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  onOpenSearch,
  isDarkMode,
  onToggleTheme,
  streak = 3,
  profile,
  onOpenMobileMenu,
}) => {
  // Derive breadcrumb context for the top bar
  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'home':
        return {
          icon: <LayoutDashboard className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
          section: 'App',
          page: 'Dashboard',
          pageBn: 'সামগ্রিক অগ্রগতি ও দৈনিক লক্ষ্য',
        };
      case 'learn':
        return {
          icon: <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
          section: 'Core',
          page: 'Learn & Methodology',
          pageBn: 'পদ্ধতি ও বাক্য তৈরির কাঠামো',
        };
      case 'patterns':
        return {
          icon: <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
          section: 'Learn',
          page: 'Sentence Patterns',
          pageBn: 'প্যাটার্ন লাইব্রেরি',
        };
      case 'builder':
      case 'sentence-builder':
        return {
          icon: <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
          section: 'Learn',
          page: 'Sentence Builder',
          pageBn: 'ব্লক দিয়ে বাক্য গঠন',
        };
      case 'transformation':
        return {
          icon: <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
          section: 'Learn',
          page: 'Sentence Transformation',
          pageBn: 'বাক্য রূপান্তর ড্রিল',
        };
      case 'word-family':
        return {
          icon: <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
          section: 'Learn',
          page: 'Word Family Tree',
          pageBn: 'শব্দের পরিবার',
        };
      case 'context-vocab':
        return {
          icon: <SpellCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
          section: 'Learn',
          page: 'Situational Vocab',
          pageBn: 'পরিস্থিতিভিত্তিক শব্দ',
        };
      case 'translation':
        return {
          icon: <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
          section: 'Learn',
          page: 'Translation Drill',
          pageBn: 'বাংলা থেকে ইংরেজি ড্রিল',
        };
      case 'mistakes':
        return {
          icon: <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
          section: 'Learn',
          page: 'Common Mistakes',
          pageBn: 'সাধারণ ভুলের সমাধান',
        };
      case 'vocabulary':
        return {
          icon: <SpellCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
          section: 'Foundations',
          page: 'Oxford 3000 Vocabulary',
          pageBn: 'উচ্চারণসহ শব্দভাণ্ডার',
        };
      case 'sentences':
      case 'sentence-structure':
        return {
          icon: <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
          section: 'Foundations',
          page: 'Daily Sentences & Structure',
          pageBn: 'দৈনন্দিন বাক্য ও গঠন',
        };
      case 'grammar':
        return {
          icon: <GraduationCap className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
          section: 'Foundations',
          page: 'Grammar Lessons',
          pageBn: 'সহজ ব্যাকরণ ও নিয়ম',
        };
      case 'pronunciation':
        return {
          icon: <Headphones className="h-4 w-4 text-rose-600 dark:text-rose-400" />,
          section: 'Foundations',
          page: 'Pronunciation Studio',
          pageBn: 'উচ্চারণ ও ফোনেটিক্স',
        };
      case 'smart-book':
        return {
          icon: <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
          section: 'Book',
          page: '100-Page Smart Story Book',
          pageBn: '১০০ পৃষ্ঠার স্মার্ট গল্প ও শব্দ বই',
        };
      case 'book':
        return {
          icon: <BookMarked className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
          section: 'Book',
          page: 'Spoken English Book (আগের বই)',
          pageBn: 'স্পোকেন ইংলিশ এর সেরা বই (৫০ অধ্যায়)',
        };
      case 'reading':
        return {
          icon: <Headphones className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
          section: 'Practice',
          page: 'Reading & Audio Comprehension',
          pageBn: 'লিসেনিং ও সাবটাইটেল অর্থ',
        };
      case 'practice':
        return {
          icon: <Dumbbell className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
          section: 'Practice',
          page: 'Interactive Quiz Arena',
          pageBn: 'কুইজ ও চ্যালেঞ্জ',
        };
      case 'progress':
        return {
          icon: <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
          section: 'Analytics',
          page: 'Learning Progress',
          pageBn: 'অগ্রগতি ট্র্যাকার',
        };
      case 'saved':
        return {
          icon: <Bookmark className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
          section: 'Saved',
          page: 'Word Bank & Bookmarks',
          pageBn: 'সংরক্ষিত শব্দভাণ্ডার',
        };
      case 'habit':
        return {
          icon: <Settings2 className="h-4 w-4 text-slate-600 dark:text-slate-400" />,
          section: 'Settings',
          page: 'Habits & Goals',
          pageBn: 'দৈনিক লক্ষ্য ও অভ্যাস',
        };
      case 'profile':
        return {
          icon: <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
          section: 'User',
          page: 'Profile & Settings',
          pageBn: 'প্রোফাইল সেটিংস',
        };
      default:
        return {
          icon: <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />,
          section: 'NextGen-LearnHub',
          page: 'Learning Hub',
          pageBn: 'স্মার্ট লার্নিং প্ল্যাটফর্ম',
        };
    }
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/95 transition-colors shadow-2xs"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Left Side: Brand on mobile, Breadcrumb on desktop */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1 mr-2">
          {/* Mobile Hamburger & Logo (visible only on mobile where Sidebar is hidden) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:hidden min-w-0">
            {onOpenMobileMenu && (
              <button
                type="button"
                onClick={onOpenMobileMenu}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 cursor-pointer transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-left focus-visible:outline-none cursor-pointer min-w-0"
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-cyan-500/40 bg-slate-950 shadow-xs ring-1 ring-cyan-400/30">
                <img
                  src="/nextgen_logo.jpg"
                  alt="NextGen-LearnHub"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-white truncate">
                NextGen<span className="hidden sm:inline text-cyan-600 dark:text-cyan-400">-LearnHub</span>
              </span>
            </button>
          </div>

          {/* Desktop Breadcrumb Header (Eliminates duplicate nav buttons & duplicate logo) */}
          <div className="hidden md:flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shrink-0">
              {breadcrumb.icon}
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 transition-colors cursor-pointer"
              >
                {breadcrumb.section}
              </button>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
              <span className="font-bold text-slate-900 dark:text-white">
                {breadcrumb.page}
              </span>
              <span className="hidden xl:inline text-[11px] text-slate-400 dark:text-slate-500 font-bangla pl-1">
                ({breadcrumb.pageBn})
              </span>
            </div>
          </div>
        </div>

        {/* Right Utilities: Search, Streak, Theme, Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 cursor-pointer shrink-0"
            title="Search vocabulary, sentences, grammar (Ctrl+K)"
            aria-label="Search"
          >
            <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="hidden sm:inline text-[11px]">Search</span>
            <kbd className="hidden rounded bg-slate-200 px-1 py-0.2 text-[9px] font-mono text-slate-600 dark:bg-slate-700 dark:text-slate-300 md:inline">
              ⌘K
            </kbd>
          </button>

          {/* Learning Streak Pill */}
          <div
            className="flex h-9 items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-2 sm:px-2.5 text-xs font-bold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300 cursor-pointer hover:bg-amber-100/80 transition-colors shrink-0"
            onClick={() => onNavigate('habit')}
            title={`${streak} day streak (অভ্যাস দেখতে ক্লিক করুন)`}
          >
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500 shrink-0" />
            <span>{streak}d</span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-400 shrink-0" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600 shrink-0" />
            )}
          </button>

          {/* Profile Avatar */}
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 font-extrabold text-indigo-800 text-xs hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 transition-colors cursor-pointer ring-1 ring-indigo-300 dark:ring-indigo-800 shrink-0"
            title="User Profile"
            aria-label="User Profile"
          >
            {profile.name.charAt(0).toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
};
