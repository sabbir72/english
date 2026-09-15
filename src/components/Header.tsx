import React from 'react';
import {
  Flame,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Sparkles,
  Award,
  Zap,
  Bookmark,
  User,
} from 'lucide-react';
import { NavigationTab, UserLevel, UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
  streak: number;
  xp?: number;
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onLevelChange: (level: UserLevel) => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigateToProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  streak,
  xp = 140,
  activeTab,
  onNavigate,
  onLevelChange,
  onOpenSearch,
  isDarkMode,
  onToggleTheme,
  mobileMenuOpen,
  onToggleMobileMenu,
  onNavigateToProfile,
}) => {
  const levels: UserLevel[] = ['Beginner', 'A1', 'A2', 'B1', 'B2', 'C1'];

  const mainNavItems = [
    { id: 'home' as NavigationTab, label: 'Home', labelBn: 'হোম' },
    { id: 'learn' as NavigationTab, label: 'Learn', labelBn: 'শিখুন' },
    { id: 'practice' as NavigationTab, label: 'Practice', labelBn: 'অনুশীলন' },
    { id: 'ai-tutor' as NavigationTab, label: 'AI Tutor', labelBn: 'এআই টিউটর', highlight: true },
    { id: 'progress' as NavigationTab, label: 'Progress', labelBn: 'অগ্রগতি' },
  ];

  const isNavActive = (id: NavigationTab) => {
    if (activeTab === id) return true;
    if (
      id === 'learn' &&
      ['learn', 'vocabulary', 'sentences', 'sentence-structure', 'grammar', 'pronunciation'].includes(
        activeTab
      )
    ) {
      return true;
    }
    if (id === 'ai-tutor' && ['ai-tutor', 'ai-conversation', 'ai-tools'].includes(activeTab)) {
      return true;
    }
    return false;
  };

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-slate-900/95 sm:px-6"
    >
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          id="btn-toggle-mobile-menu"
          onClick={onToggleMobileMenu}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-xl border border-cyan-500/40 bg-slate-950 shadow-sm shadow-cyan-500/15 group-hover:scale-105 transition-transform ring-1 ring-cyan-400/20">
            <img
              src="/nextgen_logo.jpg"
              alt="NextGen-LearnHub"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                NextGen<span className="text-cyan-600 dark:text-cyan-400">-LearnHub</span>
              </span>
            </div>
            <span className="hidden text-[10px] font-medium text-slate-500 dark:text-slate-400 sm:inline-block mt-0.5">
              Smart Learning. Practice Daily. Speak Confidently.
            </span>
          </div>
        </button>
      </div>

      {/* Desktop Main Navigation (Strictly 5 items: Home, Learn, Practice, AI Tutor, Progress) */}
      <nav className="hidden md:flex items-center gap-1">
        {mainNavItems.map((item) => {
          const active = isNavActive(item.id);
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                active
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{item.label}</span>
              {item.highlight && (
                <span className="rounded-full bg-emerald-600 px-1.5 py-0.2 text-[9px] font-black text-white uppercase tracking-wider">
                  AI
                </span>
              )}
              {active && (
                <span className="absolute -bottom-2 left-3 right-3 h-0.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Global Search Button */}
        <button
          id="btn-header-global-search"
          onClick={onOpenSearch}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
          title="Search vocabulary, sentences, grammar (Ctrl+K)"
        >
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="hidden lg:inline text-[11px]">Search...</span>
          <span className="hidden rounded bg-slate-200 px-1 py-0.2 text-[9px] font-mono text-slate-600 dark:bg-slate-700 dark:text-slate-300 sm:inline">
            ⌘K
          </span>
        </button>

        {/* Streak Pill */}
        <div
          className="flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300"
          title={`${streak} days streak`}
        >
          <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          <span>{streak}d</span>
        </div>

        {/* XP Points Pill */}
        <div
          className="hidden sm:flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
          title={`${xp} total learning XP`}
        >
          <Zap className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
          <span>{xp} XP</span>
        </div>

        {/* User CEFR Level Selector */}
        <div className="relative hidden xl:block">
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-700 shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <Award className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <select
              value={profile.level}
              onChange={(e) => onLevelChange(e.target.value as UserLevel)}
              className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer text-slate-800 dark:text-slate-200"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl} className="dark:bg-slate-900">
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Profile Avatar Button */}
        <button
          onClick={onNavigateToProfile}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          title="View profile & settings"
        >
          {profile.name.charAt(0).toUpperCase()}
        </button>
      </div>
    </header>
  );
};
