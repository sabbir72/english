import React from 'react';
import {
  Home,
  BookOpen,
  BookMarked,
  Headphones,
  Layers,
  Dumbbell,
} from 'lucide-react';
import { NavigationTab, LanguageMode } from '../../types';

export interface MobileBottomNavProps {
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenLearnDrawer: () => void;
  languageMode?: LanguageMode;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onNavigate,
  onOpenLearnDrawer,
  languageMode = 'bn',
}) => {
  const isBn = languageMode === 'bn';
  const isLearnActive = [
    'learn',
    'vocabulary',
    'sentences',
    'sentence-structure',
    'grammar',
    'pronunciation',
    'patterns',
    'transformation',
    'word-family',
    'context-vocab',
    'translation',
    'mistakes',
  ].includes(activeTab);

  return (
    <div
      id="mobile-bottom-nav"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-slate-200/90 bg-white/95 backdrop-blur-lg dark:border-slate-800/90 dark:bg-slate-900/95 pb-safe shadow-lg"
    >
      <nav className="flex items-center justify-around px-1 py-1">
        {/* 1. Home / Dashboard */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 min-w-[48px] min-h-[46px] rounded-xl transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-black'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] mt-0.5 tracking-tight font-sans">
            {isBn ? 'হোম' : 'Home'}
          </span>
        </button>

        {/* 2. Learn (Opens sub-modules drawer) */}
        <button
          type="button"
          onClick={() => {
            if (isLearnActive) {
              onOpenLearnDrawer();
            } else {
              onNavigate('learn');
            }
          }}
          className={`relative flex flex-col items-center justify-center py-1 px-1.5 min-w-[48px] min-h-[46px] rounded-xl transition-all cursor-pointer ${
            isLearnActive
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-black'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-[10px] mt-0.5 tracking-tight font-sans">
            {isBn ? 'পদ্ধতি' : 'Learn'}
          </span>
        </button>

        {/* 3. 100-Page Smart Book */}
        <button
          type="button"
          onClick={() => onNavigate('smart-book')}
          className={`relative flex flex-col items-center justify-center py-1 px-1.5 min-w-[48px] min-h-[46px] rounded-xl transition-all cursor-pointer ${
            activeTab === 'smart-book' || activeTab === 'book'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-black'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <div className="relative">
            <BookMarked className="h-5 w-5" />
            <span className="absolute -top-1.5 -right-2 rounded-full bg-indigo-600 px-1 py-0.2 text-[8px] font-black text-white leading-none">
              100
            </span>
          </div>
          <span className="text-[10px] mt-0.5 font-sans">
            {isBn ? 'স্মার্ট বই' : 'Book'}
          </span>
        </button>

        {/* 4. Reading & Audio Stories */}
        <button
          type="button"
          onClick={() => onNavigate('reading')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 min-w-[48px] min-h-[46px] rounded-xl transition-all cursor-pointer ${
            activeTab === 'reading'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-black'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <Headphones className="h-5 w-5" />
          <span className="text-[10px] mt-0.5 font-sans">
            {isBn ? 'রিডিং' : 'Reading'}
          </span>
        </button>

        {/* 5. Sentence Builder */}
        <button
          type="button"
          onClick={() => onNavigate('builder')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 min-w-[48px] min-h-[46px] rounded-xl transition-all cursor-pointer ${
            activeTab === 'builder'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-black'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <Layers className="h-5 w-5" />
          <span className="text-[10px] mt-0.5 tracking-tight font-sans">
            {isBn ? 'বিল্ডার' : 'Builder'}
          </span>
        </button>

        {/* 6. Practice & Quizzes */}
        <button
          type="button"
          onClick={() => onNavigate('practice')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 min-w-[48px] min-h-[46px] rounded-xl transition-all cursor-pointer ${
            activeTab === 'practice'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-black'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <Dumbbell className="h-5 w-5" />
          <span className="text-[10px] mt-0.5 tracking-tight font-sans">
            {isBn ? 'কুইজ' : 'Quiz'}
          </span>
        </button>
      </nav>
    </div>
  );
};
