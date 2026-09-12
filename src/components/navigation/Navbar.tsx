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
    { id: 'patterns' as LearnSubTab, label: 'Sentence Patterns', labelBn: 'বাক্যের প্যাটার্ন লাইব্রেরি', icon: <Layers className="h-4 w-4 text-emerald-600" /> },
    { id: 'builder' as LearnSubTab, label: 'Sentence Builder', labelBn: 'ইন্টারঅ্যাক্টিভ বাক্য নির্মাতা', icon: <Layers className="h-4 w-4 text-teal-600" /> },
    { id: 'transformation' as LearnSubTab, label: 'Transformation (7 Forms)', labelBn: '৭ রূপে বাক্য রূপান্তর', icon: <Layers className="h-4 w-4 text-indigo-600" /> },
    { id: 'word-family' as LearnSubTab, label: 'Word Family & Network', labelBn: 'শব্দ পরিবার ও রিলেটেড ওয়ার্ডস', icon: <Layers className="h-4 w-4 text-cyan-600" /> },
    { id: 'context-vocab' as LearnSubTab, label: 'Situational Vocab', labelBn: 'বাস্তব পরিস্থিতিতে কথোপকথন', icon: <BookOpen className="h-4 w-4 text-blue-600" /> },
    { id: 'translation' as LearnSubTab, label: 'Translation Drill', labelBn: 'বাংলা ⇄ ইংরেজি চর্চা', icon: <BookOpen className="h-4 w-4 text-amber-600" /> },
    { id: 'mistakes' as LearnSubTab, label: 'Common Mistakes', labelBn: 'বাঙালিদের ভুল ও সমাধান', icon: <BookOpen className="h-4 w-4 text-rose-600" /> },
    { id: 'vocabulary' as LearnSubTab, label: 'Vocabulary Flashcards', labelBn: 'শব্দভাণ্ডার', icon: <BookOpen className="h-4 w-4 text-emerald-600" /> },
    { id: 'sentences' as LearnSubTab, label: 'Daily Sentences', labelBn: 'দৈনিক বাক্য', icon: <MessageSquareQuote className="h-4 w-4 text-blue-600" /> },
    { id: 'grammar' as LearnSubTab, label: 'Grammar Lessons', labelBn: 'সহজ ব্যাকরণ', icon: <GraduationCap className="h-4 w-4 text-purple-600" /> },
    { id: 'pronunciation' as LearnSubTab, label: 'Pronunciation Studio', labelBn: 'সঠিক উচ্চারণ', icon: <Mic className="h-4 w-4 text-rose-600" /> },
  ];

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/95 transition-colors"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 font-extrabold text-white shadow-xs group-hover:scale-105 transition-transform">
              <span className="text-base font-bold font-sans">ব</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  BoliEnglish
                </span>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 text-[9px] font-black text-emerald-800 dark:text-emerald-300 uppercase">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Learn English. Speak Confidently.
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links (Logo | Home | Learn | Practice | AI Tutor | Progress | Profile) */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Home */}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                activeTab === 'home'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </button>

            {/* Learn with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLearnDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                  isLearnActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
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
                <div className="absolute left-0 mt-2 w-56 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in-95 z-50">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    5 Learning Modules
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
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400 transition-colors"
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

            {/* Practice */}
            <button
              type="button"
              onClick={() => onNavigate('practice')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                activeTab === 'practice'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Dumbbell className="h-3.5 w-3.5" />
              <span>Practice</span>
            </button>

            {/* AI Tutor */}
            <button
              type="button"
              onClick={() => onNavigate('ai-tutor')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                ['ai-tutor', 'ai-conversation', 'ai-tools'].includes(activeTab)
                  ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <BotMessageSquare className="h-3.5 w-3.5" />
              <span>AI Tutor</span>
            </button>

            {/* Progress */}
            <button
              type="button"
              onClick={() => onNavigate('progress')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                activeTab === 'progress'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Progress</span>
            </button>

            {/* Profile */}
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>Profile</span>
            </button>
          </nav>
        </div>

        {/* Right Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
            title="Search vocabulary, sentences, grammar (Ctrl+K)"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden lg:inline text-[11px]">Search</span>
            <kbd className="hidden rounded bg-slate-200 px-1 py-0.2 text-[9px] font-mono text-slate-600 dark:bg-slate-700 dark:text-slate-300 sm:inline">
              ⌘K
            </kbd>
          </button>

          {/* Learning Streak Pill */}
          <div
            className="flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300"
            title={`${streak} day streak`}
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
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 font-extrabold text-emerald-800 text-xs hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 transition-colors cursor-pointer"
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
