import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Flame,
  Search,
  Sun,
  Moon,
  ChevronDown,
  BookOpen,
  MessageSquareQuote,
  Layers,
  GraduationCap,
  Mic,
  BotMessageSquare,
  BarChart3,
  User,
  Home,
  Dumbbell,
  Menu,
  Headphones,
  Settings2,
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
  onSelectLearnSubTab,
  onOpenSearch,
  isDarkMode,
  onToggleTheme,
  streak = 3,
  profile,
  onOpenMobileMenu,
}) => {
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLearnDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const isLearnActive = [
    'learn',
    'patterns',
    'builder',
    'sentence-builder',
    'transformation',
    'word-family',
    'context-vocab',
    'translation',
    'mistakes',
    'vocabulary',
    'sentences',
    'sentence-structure',
    'grammar',
    'pronunciation',
  ].includes(activeTab);

  const learnItems = [
    { id: 'patterns' as LearnSubTab, label: 'Sentence Patterns', labelBn: 'প্যাটার্ন লাইব্রেরি', icon: <Layers className="h-4 w-4 text-indigo-600" /> },
    { id: 'builder' as LearnSubTab, label: 'Sentence Builder', labelBn: 'ব্লক দিয়ে বাক্য গঠন', icon: <Layers className="h-4 w-4 text-sky-600" /> },
    { id: 'vocabulary' as LearnSubTab, label: 'Vocabulary & Oxford 3000', labelBn: 'উচ্চারণসহ শব্দভাণ্ডার', icon: <BookOpen className="h-4 w-4 text-emerald-600" /> },
    { id: 'sentences' as LearnSubTab, label: 'Daily Sentences', labelBn: 'দৈনন্দিন বাক্য', icon: <MessageSquareQuote className="h-4 w-4 text-indigo-600" /> },
    { id: 'grammar' as LearnSubTab, label: 'Grammar Lessons', labelBn: 'সহজ ব্যাকরণ ও নিয়ম', icon: <GraduationCap className="h-4 w-4 text-sky-600" /> },
    { id: 'pronunciation' as LearnSubTab, label: 'Pronunciation Studio', labelBn: 'সঠিক উচ্চারণ ও ফোনেটিক্স', icon: <Mic className="h-4 w-4 text-rose-600" /> },
  ];

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/95 transition-colors shadow-2xs"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Hamburger (mobile) + Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-6">
          {onOpenMobileMenu && (
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-600 font-black text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform ring-2 ring-indigo-500/20">
              <span className="text-base font-bold font-sans">ব</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  BoliEnglish
                </span>
                <span className="rounded-full bg-indigo-100 dark:bg-indigo-950 px-1.5 py-0.5 text-[9px] font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wide border border-indigo-200/50">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bangla hidden sm:block">
                সহজে ইংরেজি শিখুন ও বলুন
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Dashboard */}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              <span>Dashboard</span>
            </button>

            {/* Learn with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLearnDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                  isLearnActive
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60'
                    : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Learn</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                    learnDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {learnDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900/95 animate-in fade-in zoom-in-95 z-50">
                  <div className="px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                    Modules / মডিউল
                  </div>
                  {learnItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (onSelectLearnSubTab) onSelectLearnSubTab(item.id);
                        onNavigate(item.id as NavigationTab);
                        setLearnDropdownOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/70 hover:text-indigo-800 dark:text-slate-300 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans font-medium">
                        {item.labelBn}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reading */}
            <button
              type="button"
              onClick={() => onNavigate('reading')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                activeTab === 'reading'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
              }`}
            >
              <Headphones className="h-3.5 w-3.5" />
              <span>Reading</span>
            </button>

            {/* Practice */}
            <button
              type="button"
              onClick={() => onNavigate('practice')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                activeTab === 'practice'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
              }`}
            >
              <Dumbbell className="h-3.5 w-3.5" />
              <span>Practice</span>
            </button>

            {/* AI Tutor */}
            <button
              type="button"
              onClick={() => onNavigate('ai-tutor')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                ['ai-tutor', 'ai-conversation', 'ai-tools'].includes(activeTab)
                  ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/30'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
              }`}
            >
              <BotMessageSquare className="h-3.5 w-3.5" />
              <span>AI Tutor</span>
            </button>

            {/* Habit & Goals */}
            <button
              type="button"
              onClick={() => onNavigate('habit')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                activeTab === 'habit'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
              }`}
            >
              <Settings2 className="h-3.5 w-3.5" />
              <span>Habit & Goals</span>
            </button>
          </nav>
        </div>

        {/* Right Utilities: Search, Streak, Theme, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
            title="Search vocabulary, sentences, grammar (Ctrl+K)"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline text-[11px]">Search</span>
            <kbd className="hidden rounded bg-slate-200 px-1 py-0.2 text-[9px] font-mono text-slate-600 dark:bg-slate-700 dark:text-slate-300 md:inline">
              ⌘K
            </kbd>
          </button>

          {/* Learning Streak Pill */}
          <div
            className="flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300 cursor-pointer"
            onClick={() => onNavigate('habit')}
            title={`${streak} day streak (অভ্যাস দেখতে ক্লিক করুন)`}
          >
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span>{streak}d</span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </button>

          {/* Profile Avatar */}
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 font-extrabold text-indigo-800 text-xs hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 transition-colors cursor-pointer ring-1 ring-indigo-300 dark:ring-indigo-800"
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
