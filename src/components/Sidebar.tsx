import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  SpellCheck,
  GraduationCap,
  Layers,
  Headphones,
  BotMessageSquare,
  Dumbbell,
  BarChart3,
  Bookmark,
  BookMarked,
  Settings2,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  mobileMenuOpen,
  onCloseMobileMenu,
}) => {
  const handleNav = (tab: NavigationTab) => {
    onSelectTab(tab);
    onCloseMobileMenu();
  };

  const navItems = [
    {
      id: 'home' as NavigationTab,
      label: 'Dashboard',
      labelBn: 'ড্যাশবোর্ড',
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      id: 'learn' as NavigationTab,
      label: 'Learn',
      labelBn: 'পদ্ধতি ও পাঠ',
      icon: <BookOpen className="h-4 w-4" />,
      badge: 'Core',
    },
    {
      id: 'vocabulary' as NavigationTab,
      label: 'Vocabulary',
      labelBn: 'শব্দভাণ্ডার',
      icon: <SpellCheck className="h-4 w-4" />,
    },
    {
      id: 'grammar' as NavigationTab,
      label: 'Grammar',
      labelBn: 'সহজ ব্যাকরণ',
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      id: 'builder' as NavigationTab,
      label: 'Sentence Builder',
      labelBn: 'বাক্য নির্মাতা',
      icon: <Layers className="h-4 w-4" />,
      badge: 'Blocks',
    },
    {
      id: 'book' as NavigationTab,
      label: 'Spoken Book',
      labelBn: 'স্পোকেন বই',
      icon: <BookMarked className="h-4 w-4" />,
      badge: 'বই ফরম্যাট',
    },
    {
      id: 'reading' as NavigationTab,
      label: 'Reading',
      labelBn: 'রিডিং ও অর্থ',
      icon: <Headphones className="h-4 w-4" />,
      badge: 'Audio',
    },
    {
      id: 'ai-tutor' as NavigationTab,
      label: 'ChatGPT Tutor',
      labelBn: 'চ্যাটজিপিটি এআই',
      icon: <BotMessageSquare className="h-4 w-4" />,
      badge: 'GPT-4o',
    },
    {
      id: 'practice' as NavigationTab,
      label: 'Practice',
      labelBn: 'কুইজ চর্চা',
      icon: <Dumbbell className="h-4 w-4" />,
    },
    {
      id: 'progress' as NavigationTab,
      label: 'Progress',
      labelBn: 'অগ্রগতি ট্র্যাকার',
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      id: 'saved' as NavigationTab,
      label: 'Word Bank',
      labelBn: 'সংরক্ষিত শব্দ',
      icon: <Bookmark className="h-4 w-4" />,
    },
    {
      id: 'habit' as NavigationTab,
      label: 'Settings & Habit',
      labelBn: 'অভ্যাস ও লক্ষ্য',
      icon: <Settings2 className="h-4 w-4" />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity md:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform border-r border-slate-200/80 bg-white/95 backdrop-blur-md p-4 transition-transform duration-200 ease-in-out dark:border-slate-800/80 dark:bg-slate-900/95 md:static md:w-64 md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between shadow-xl md:shadow-xs overflow-y-auto`}
      >
        <div className="space-y-4">
          {/* Brand Identity / Logo Header */}
          <div className="flex items-center justify-between gap-2 px-1 py-1">
            <div className="flex items-center gap-2.5">
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl border border-cyan-500/40 bg-slate-950 shadow-md shadow-cyan-500/10 ring-2 ring-cyan-400/20">
                <img
                  src="/nextgen_logo.jpg"
                  alt="NextGen-LearnHub"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
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
            </div>

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

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                activeTab === item.id ||
                (item.id === 'ai-tutor' && ['ai-tutor', 'ai-conversation', 'ai-tools'].includes(activeTab)) ||
                (item.id === 'builder' && activeTab === 'builder');

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60 font-black'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 font-bangla font-normal hidden lg:inline">
                      {item.labelBn}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="border-t border-slate-100 pt-3 dark:border-slate-800 space-y-2">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-2.5 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <div className="text-[11px]">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">দৈনিক চর্চা</span>
                <span className="text-slate-500 font-bangla">১০ মিনিট বাকি</span>
              </div>
            </div>
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">75%</span>
          </div>

          <button
            onClick={() => handleNav('admin')}
            className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
              activeTab === 'admin'
                ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Panel</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};
