import React from 'react';
import {
  Home,
  BookOpen,
  Dumbbell,
  BotMessageSquare,
  BarChart3,
  Bookmark,
  ShieldCheck,
  ChevronRight,
  Layers,
  GraduationCap,
  Mic,
  MessageSquareQuote,
  Sparkles,
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
  const isLearnActive = [
    'learn',
    'vocabulary',
    'sentences',
    'sentence-structure',
    'grammar',
    'pronunciation',
  ].includes(activeTab);

  const isAITutorActive = ['ai-tutor', 'ai-conversation', 'ai-tools'].includes(activeTab);

  const handleNav = (tab: NavigationTab) => {
    onSelectTab(tab);
    onCloseMobileMenu();
  };

  const learnSubItems = [
    { id: 'vocabulary' as NavigationTab, label: 'Vocabulary', labelBn: 'শব্দভাণ্ডার', icon: <BookOpen className="h-3.5 w-3.5" /> },
    { id: 'sentences' as NavigationTab, label: 'Sentences', labelBn: 'বাক্য ও প্রয়োগ', icon: <MessageSquareQuote className="h-3.5 w-3.5" /> },
    { id: 'sentence-structure' as NavigationTab, label: 'Structures', labelBn: 'বাক্যের গঠন ও সূত্র', icon: <Layers className="h-3.5 w-3.5" /> },
    { id: 'grammar' as NavigationTab, label: 'Grammar', labelBn: 'সহজ ব্যাকরণ', icon: <GraduationCap className="h-3.5 w-3.5" /> },
    { id: 'pronunciation' as NavigationTab, label: 'Pronunciation', labelBn: 'সঠিক উচ্চারণ', icon: <Mic className="h-3.5 w-3.5" /> },
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
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200/80 bg-white p-4 transition-transform duration-200 ease-in-out dark:border-slate-800/80 dark:bg-slate-900 md:static md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div className="space-y-6">
          {/* Mobile Logo Title */}
          <div className="flex items-center gap-2 pb-2 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 font-bold text-white">
              ব
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white">BoliEnglish</span>
              <p className="text-[10px] text-slate-500">Practice English Daily</p>
            </div>
          </div>

          {/* Primary Navigation */}
          <nav className="space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-emerald-50 text-emerald-700 shadow-xs dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Home className="h-4 w-4 text-emerald-600" />
                <span>Home / ড্যাশবোর্ড</span>
              </div>
            </button>

            {/* Learn Section with Nested Sub-items */}
            <div>
              <button
                onClick={() => handleNav('learn')}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                  isLearnActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-black'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span>Learn / শিখুন</span>
                </div>
                <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  5 modules
                </span>
              </button>

              {/* Sub items */}
              <div className="ml-4 mt-1 border-l-2 border-slate-100 pl-2 space-y-1 dark:border-slate-800">
                {learnSubItems.map((sub) => {
                  const isSubActive = activeTab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleNav(sub.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                        isSubActive
                          ? 'bg-emerald-100/60 font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {sub.icon}
                        <span>{sub.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans">{sub.labelBn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Practice */}
            <button
              onClick={() => handleNav('practice')}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                activeTab === 'practice'
                  ? 'bg-emerald-50 text-emerald-700 shadow-xs dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Dumbbell className="h-4 w-4 text-amber-500" />
                <span>Practice / কুইজ</span>
              </div>
              <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                Fast
              </span>
            </button>

            {/* AI Tutor */}
            <button
              onClick={() => handleNav('ai-tutor')}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                isAITutorActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BotMessageSquare className="h-4 w-4" />
                <span>AI Tutor / এআই সঙ্গী</span>
              </div>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-black uppercase ${
                  isAITutorActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                }`}
              >
                Live
              </span>
            </button>

            {/* Progress */}
            <button
              onClick={() => handleNav('progress')}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                activeTab === 'progress'
                  ? 'bg-emerald-50 text-emerald-700 shadow-xs dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                <span>Progress / অগ্রগতি</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Bottom Section: My Saved & Admin */}
        <div className="border-t border-slate-100 pt-3 dark:border-slate-800 space-y-1">
          <button
            onClick={() => handleNav('saved')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
              activeTab === 'saved'
                ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bookmark className="h-3.5 w-3.5 text-amber-500" />
              <span>My Saved / সংরক্ষিত</span>
            </div>
            <ChevronRight className="h-3 w-3 text-slate-400" />
          </button>

          <button
            onClick={() => handleNav('admin')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
              activeTab === 'admin'
                ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
              <span>Admin Panel</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};
